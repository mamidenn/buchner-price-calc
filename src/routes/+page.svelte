<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';
	import { getPrices } from '$lib/priceCalculations';

	export let form: ActionData;

	const currency = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
	const percent = Intl.NumberFormat('de-DE', { style: 'percent', maximumFractionDigits: 2 });
</script>

<form
	method="post"
	use:enhance={({ formData }) => {
		return async ({ result }) => {
			if (result.type === 'error') {
				const offlineResult = getPrices(formData);
				applyAction({ type: 'success', status: 200, data: offlineResult });
				return;
			}
			await applyAction(result);
		};
	}}
	class="space-y-2"
>
	<label class="label">
		<span>Preis Print-Lehrwerk</span>
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input
				type="number"
				name="price-print"
				min="0.00"
				step="0.01"
				value={form?.['price-print'] ?? 27.5}
			/>
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
			value={form?.amount ?? 1}
		/>
	</label>
	<label class="label">
		<span>Laufzeit</span>
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input type="number" name="duration" min="1" step="1" max="6" value={form?.duration ?? 1} />
			<div class="input-group-shim">Jahre</div>
		</div>
	</label>
	<SlideToggle name="has-account" checked={form?.['has-account'] ?? false}>
		Bestellung via Schulkonto
	</SlideToggle>
	<button type="submit" class="btn variant-filled-primary block ml-auto">Berechnen</button>
</form>

{#if form?.result}
	<div class="table-container">
		<table class="table table-comfortable">
			<tr><td>pro Exemplar</td><td class="text-right">{currency.format(form.result.unit)}</td></tr>
			<tr><td>gesamt</td><td class="text-right">{currency.format(form.result.overall)}</td></tr>
			<tr>
				<td>inkl. Rabatt</td><td class="text-right">{percent.format(form.result.discount)}</td>
			</tr>
		</table>
	</div>
{/if}
