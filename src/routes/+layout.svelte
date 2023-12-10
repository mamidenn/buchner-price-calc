<script lang="ts">
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppBar, AppShell, storePopup } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import './roboto.pcss';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:head>
	<title>C.C.Buchner Preisrechner</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar padding="p-0" background="bg-primary-500">
			<svelte:fragment slot="lead">
				<img src="/ccb_logo.svg" class="h-20" alt="C.C.Buchner Logo" />
			</svelte:fragment>
			<h1 class="text-xl text-white">click & study Preisrechner</h1>
		</AppBar>
	</svelte:fragment>
	<div class="container mx-auto my-2 px-1">
		<slot />
	</div>
</AppShell>
