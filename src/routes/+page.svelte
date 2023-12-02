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

<div class="space-y-2">
	<label class="label">
		<span>Preis Print-Lehrwerk</span>
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input type="number" name="price-print" min="0.00" step="0.01" bind:value={printPrice} />
			<div class="input-group-shim">€</div>
		</div>
	</label>
	<label class="label">
		<span>Menge</span>
		<input
			class="input"
			type="number"
			name="amount"
			min="0"
			max="10000"
			step="1"
			bind:value={amount}
		/>
	</label>
	<label class="label">
		<span>Laufzeit</span>
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input type="number" name="duration" min="1" step="1" max="6" bind:value={duration} />
			<div class="input-group-shim">Jahre</div>
		</div>
	</label>
	<SlideToggle name="has-account" bind:checked={hasAccount}>Bestellung via Schulkonto</SlideToggle>
</div>

{#if result}
	<div class="table-container">
		<table class="table table-comfortable">
			<tbody>
				<tr><td>pro Exemplar</td><td class="text-right">{currency.format(result.unit)}</td></tr>
				<tr><td>gesamt</td><td class="text-right">{currency.format(result.overall)}</td></tr>
				<tr>
					<td>inkl. Rabatt</td><td class="text-right">{percent.format(result.discount)}</td>
				</tr>
			</tbody>
		</table>
	</div>
{/if}
