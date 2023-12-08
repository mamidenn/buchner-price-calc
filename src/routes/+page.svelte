<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { calculatePrice } from '$lib/priceCalculations';

	const currency = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
	const percent = Intl.NumberFormat('de-DE', { style: 'percent', maximumFractionDigits: 2 });

	let printPrice = 27.5;
	let amount = 1;
	let duration = 1;
	let hasAccount = false;
	$: result = calculatePrice(printPrice, amount, duration, hasAccount);
</script>

<div class="max-w-screen-sm space-y-6">
	<div class="space-y-4">
		<label class="label">
			<span>Preis Print-Lehrwerk</span>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					type="number"
					name="price-print"
					inputmode="numeric"
					min="0.00"
					step="0.01"
					bind:value={printPrice}
				/>
				<div class="input-group-shim">€</div>
			</div>
		</label>
		<div class="flex flex-col sm:flex-row gap-4">
			<label class="label basis-2/3">
				<span>Menge</span>
				<input
					class="input"
					type="number"
					inputmode="numeric"
					name="amount"
					min="1"
					max="10000"
					step="1"
					bind:value={amount}
				/>
			</label>
			<label class="label basis-1/3">
				<span>Laufzeit</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input
						type="number"
						inputmode="numeric"
						name="duration"
						min="1"
						step="1"
						max="6"
						bind:value={duration}
					/>
					<div class="input-group-shim">Jahre</div>
				</div>
			</label>
		</div>
		<SlideToggle name="has-account" active="bg-primary-500" bind:checked={hasAccount}>
			Bestellung via Schulkonto
		</SlideToggle>
	</div>

	{#if result}
		<h2 class="text-xl font-light">Preise</h2>
		<div class="table-container">
			<table class="table">
				<thead>
					<tr>
						<th class="text-end">Einzelpreis</th>
						<th class="text-end">Menge</th>
						<th class="text-end">inkl. Rabatt</th>
						<th class="text-end">gesamt</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="text-end">{currency.format(result.unit)}</td>
						<td class="text-end">{amount * duration}</td>
						<td class="text-end">
							<div
								class:highlight={result.discount > 0}
								style="--highlight-strength: {result.discount}"
							>
								{percent.format(result.discount)}
							</div>
						</td>
						<td class="text-end">{currency.format(result.overall)}</td>
					</tr>
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style lang="postcss">
	.highlight {
		font-size: calc((1 + var(--highlight-strength)) * 1rem);
		@apply font-semibold text-primary-500;
		line-height: inherit;
	}
</style>
