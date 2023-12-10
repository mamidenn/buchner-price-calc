<script lang="ts">
	import { calculatePrice } from '$lib/priceCalculations';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import IsbnSelect from '$lib/IsbnSelect.svelte';

	const currency = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
	const percent = Intl.NumberFormat('de-DE', { style: 'percent', maximumFractionDigits: 2 });

	let digitalPrice: number | undefined;
	let amount: number | undefined = 1;
	let duration: number | undefined = 1;
	let hasAccount = false;
	$: result =
		digitalPrice !== undefined && amount !== undefined && duration !== undefined
			? calculatePrice(digitalPrice, amount, duration, hasAccount)
			: undefined;
</script>

<div class="max-w-screen-sm space-y-6">
	<div class="flex flex-col gap-4">
		<IsbnSelect bind:digitalPrice />
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
					<td class="text-end">{currency.format(result ? result.unit : 0)}</td>
					<td class="text-end">{(amount ?? 0) * (duration ?? 0)}</td>
					<td class="text-end">
						<div
							class:highlight={result && result.discount > 0}
							style="--highlight-strength: {result?.discount ?? 0}"
						>
							{percent.format(result ? result.discount : 0)}
						</div>
					</td>
					<td class="text-end">{currency.format(result ? result.overall : 0)}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<style lang="postcss">
	.highlight {
		font-size: calc((1 + var(--highlight-strength)) * 1rem);
		@apply font-semibold text-primary-500;
		line-height: inherit;
	}
</style>
