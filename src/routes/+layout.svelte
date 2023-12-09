<script lang="ts">
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppBar, AppShell, storePopup } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import './roboto.pcss';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<img src="/ccb_logo.svg" class="h-24" alt="C.C.Buchner Logo" />
			</svelte:fragment>
			<h1 class="text-4xl font-thin">Preisrechner</h1>
		</AppBar>
	</svelte:fragment>
	<div class="container mx-auto p-2 space-y-4">
		<slot />
	</div>
</AppShell>
