import type { ToastStore } from '@skeletonlabs/skeleton';

export const registerServiceWorker = async (toastStore: ToastStore) => {
	const notifyUpdateAvailable = (worker: ServiceWorker) => {
		toastStore.trigger({
			message: 'Eine neue Version des Preisrechners ist verfügbar.',
			action: {
				label: 'Jetzt updaten',
				response: () => {
					worker.postMessage({ action: 'skipWaiting' });
				}
			},
			autohide: false
		});
	};

	const monitorInstallation = (worker: ServiceWorker) => {
		worker.addEventListener('statechange', () => {
			if (worker.state === 'installed') {
				notifyUpdateAvailable(worker);
			}
		});
	};

	if (!('serviceWorker' in navigator)) return;
	const registration = await navigator.serviceWorker.register('/service-worker.js', {
		type: 'module'
	});
	if (!navigator.serviceWorker.controller) return;
	if (registration.waiting) {
		notifyUpdateAvailable(registration.waiting);
		return;
	}
	if (registration.installing) {
		monitorInstallation(registration.installing);
		return;
	}
	registration.addEventListener('updatefound', function () {
		if (this.installing) monitorInstallation(this.installing);
	});
	// eslint-disable-next-line no-var
	var reloading = false;
	navigator.serviceWorker.addEventListener('controllerchange', () => {
		if (!reloading) {
			reloading = true;
			window.location.reload();
		}
	});
};
