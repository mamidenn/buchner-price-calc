<script lang="ts">
	import '../app.pcss';
	import './roboto.pcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

	let currentTile: number = 0;
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/">(icon)</AppRailAnchor>
			</svelte:fragment>
			<!-- --- -->
			<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<span>Tile 1</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<span>Tile 2</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<span>Tile 3</span>
			</AppRailTile>
			<!-- --- -->
			<svelte:fragment slot="trail">
				<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<img src="/ccb_logo.svg" class="h-24" alt="C.C.Buchner Logo" />
			</svelte:fragment>
			<h1 class="text-4xl font-thin">Preisrechner</h1>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
