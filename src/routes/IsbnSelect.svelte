<script lang="ts">
	import {
		popup,
		type AutocompleteOption,
		type PopupSettings,
		Autocomplete
	} from '@skeletonlabs/skeleton';
	import { parse } from 'csv-parse/browser/esm/sync';
	import { onMount } from 'svelte';

	export let digitalPrice: number | undefined;
	$: digitalPrice = isbnOptions.filter((o) => o.value === isbn)[0]?.meta?.price;

	const currency = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

	let isbn: string = '';

	const isbnPopupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'isbnPopup',
		placement: 'bottom-start'
	};
	const onIsbnSelection = function (
		e: CustomEvent<AutocompleteOption<string, { price: number }>>
	): void {
		isbn = e.detail.label;
		digitalPrice = e.detail.meta?.price;
	};

	let isbnOptions: AutocompleteOption<string, { price: number }>[] = [];
	onMount(async () => {
		const csv = await fetch('/data/prices.csv');
		const parsed: { ISBN: string; Preis: string }[] = parse(await csv.text(), {
			columns: true,
			skip_empty_lines: true
		});
		isbnOptions = parsed
			.sort(({ ISBN: a }, { ISBN: b }) => a.localeCompare(b))
			.map(({ ISBN, Preis }) => ({
				label: ISBN,
				value: ISBN,
				meta: { price: Number(Preis) }
			}));
	});
</script>

<div class="root">
	<label class="label">
		<span>Print-Lehrwerk</span>
		<div
			class="input-group input-group-divider grid-cols-[1fr_auto]"
			class:not-found={isbn !== '' && isbnOptions.filter((o) => o.value === isbn)[0] === undefined}
		>
			<input type="text" name="isbn" bind:value={isbn} use:popup={isbnPopupSettings} />
			{#if digitalPrice}
				<div class="input-group-shim">Digitalpreis: {currency.format(digitalPrice)}</div>
			{/if}
		</div>
	</label>
	<div
		class="card z-10 p-2 shadow-xl overflow-y-auto max-h-96"
		data-popup="isbnPopup"
		tabindex="-1"
	>
		<Autocomplete bind:input={isbn} options={isbnOptions} on:selection={onIsbnSelection} />
	</div>
</div>

<style lang="postcss">
	.root:not(:focus-within) .not-found {
		@apply input-error;
	}
</style>
