/// <reference lib="WebWorker" />

import { CacheDatabase, IWikiEntry, ISafetyNetItem } from "./db.ts";

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

interface SyncManager {
	getTags(): Promise<string[]>;
	register(tag: string): Promise<void>;
  }
  
  declare global {
	interface ServiceWorkerRegistration {
	  readonly sync: SyncManager;
	}
  
	interface SyncEvent extends ExtendableEvent {
	  readonly lastChance: boolean;
	  readonly tag: string;
	}
  
	interface ServiceWorkerGlobalScopeEventMap {
	  sync: SyncEvent;
	}
  }

declare var self: ServiceWorkerGlobalScope;

var db = new CacheDatabase();

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

precacheAndRoute([
	{ url: "Herz.png", revision: null },
	{ url: "Oberarm.png", revision: null },
	{ url: "Platzhalter-1.png", revision: null },
	{ url: "abc-modell.png", revision: null },
	{ url: "account.png", revision: null },
	{ url: "alpen-methode.png", revision: null },
	{ url: "alpenMethode.png", revision: null },
	{ url: "atemuebung.png", revision: null },
	{ url: "background.png", revision: null },
	{ url: "buecher.png", revision: null },
	{ url: "compassion-Meditation.mp3", revision: null },
	{ url: "emoji-negative.png", revision: null },
	{ url: "emoji-neutral.png", revision: null },
	{ url: "emoji-positive.png", revision: null },
	{ url: "emotion.png", revision: null },
	{ url: "emotionsregulation.png", revision: null },
	{ url: "entstigmatisierung.png", revision: null },
	{ url: "faehigkeitenvermittlung.png", revision: null },
	{ url: "fassmodell.png", revision: null },
	{ url: "favicon-transparent.png", revision: null },
	{ url: "favicon.png", revision: null },
	{ url: "frauLangeHaare.png", revision: null },
	{ url: "kreativ.png", revision: null },
	{ url: "logo.png", revision: null },
	{ url: "logoBig.png", revision: null },
	{ url: "logoSquare192.png", revision: null },
	{ url: "logoSquare96.png", revision: null },
	{ url: "meditation.webp", revision: null },
	{ url: "mentale-gesundheit.png", revision: null },
	{ url: "notfall.svg", revision: null },
	{ url: "optimismus.png", revision: null },
	{ url: "personen.png", revision: null },
	{ url: "problembewusstsein.png", revision: null },
	{ url: "psyche.png", revision: null },
	{ url: "psychologie.png", revision: null },
	{ url: "psychotherapie.png", revision: null },
	{ url: "reframing.png", revision: null },
	{ url: "selbstwirksamkeit.png", revision: null },
	{ url: "selfcare.png", revision: null },
	{ url: "sicherheitsnetz.png", revision: null },
	{ url: "situationskontrolle.png", revision: null },
	{ url: "sonstiges.png", revision: null },
	{ url: "sozialeUnterstuetzung.png", revision: null },
	{ url: "sozialeUnterstuetzungLvl1.png", revision: null },
	{ url: "sozialeUnterstuetzungLvl2.png", revision: null },
	{ url: "sozialeUnterstuetzungLvl3.png", revision: null },
	{ url: "starkmacher.png", revision: null },
	{ url: "stress.png", revision: null },
	{ url: "tagebuch.jpg", revision: null },
	{ url: "tagebuch.svg", revision: null },
	{ url: "testbild.jpg", revision: null },
	{ url: "tier.png", revision: null },
	{ url: "video.png", revision: null },
	{ url: "wiki.png", revision: null },
	{ url: "wut.png", revision: null },
	{ url: "manifest.json", revision: null },
]);

const re_ext = new RegExp("/[^/?]+\\.[^/]+$");

// Handle requests using index.html by default due to SPA routing
registerRoute(({ request, url }: { request: Request; url: URL }) => {
	if (request.mode !== "navigate") {
		return false;
	}
	if (url.pathname.startsWith("/_") || url.pathname.startsWith("/api")) {
		return false;
	}
	// If path has an extension, handle seperately
	if (url.pathname.match(re_ext)) {
		return false;
	}
	// Handle other paths using index.html
	return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

// Wiki

registerRoute(
	({ url }) =>
		url.origin === self.location.origin &&
		url.pathname.startsWith("/api/wiki"),
	async ({ url, request, event, params }) => {
		if ((await db.updated.get("wiki")) !== undefined) {
			let count = await db.wiki.count();
			let entries = await db.wiki.toArray();
			return new Response(
				JSON.stringify({
					entry_count: count,
					entries: entries,
				})
			);
		} else {
			return await fetch(request);
		}
	}
);

// Safety Net

registerRoute(
	({url}) => 
		url.origin === self.location.origin &&
		url.pathname.startsWith("/api/safetyNet"),
	async ({ url, request, event, params }) => {
		let res: Response = await fetch(request.clone());
		if (res.status >= 200 && res.status < 300) {
			return res;
		}
		let items = await db.safetyNet.toArray();
		return new Response(JSON.stringify(items));
	},
	"GET"
)

registerRoute(
	({url}) => 
		url.origin === self.location.origin &&
		url.pathname.startsWith("/api/safetyNet"),
	async ({ url, request, event, params }) => {
		let res: Response = await fetch(request.clone());
		if (res.status >= 200 && res.status < 300) {
			return res;
		}
		let id = Date.now();
		let data = await request.clone().json() as ISafetyNetItem;
		data._pending = 1;
		data._previous = null;
		data._delete = false;
		data.id = id;
		await db.safetyNet.add(data, id);
		await self.registration.sync.register('safetynet');
		return new Response(JSON.stringify(data), {status: 201});
	},
	"POST"
)

registerRoute(
	({url}) => 
		url.origin === self.location.origin &&
		url.pathname.startsWith("/api/safetyNet"),
	async ({ url, request, event, params }) => {
		let res: Response = await fetch(request.clone());
		if (res.status >= 200 && res.status < 300) {
			return res;
		}
		let data = await request.clone().json() as ISafetyNetItem;
		data._pending = 1;
		let prev = await db.safetyNet.get(data.id);
		if (prev === undefined) {
			return new Response(null, {status: 400});
		}
		data._previous = prev;
		data._delete = false;
		await db.safetyNet.put(data, data.id);
		await self.registration.sync.register('safetynet');
		return new Response(JSON.stringify(data), {status: 200});
	},
	"PUT"
)

registerRoute(
	({url}) => 
		url.origin === self.location.origin &&
		url.pathname.startsWith("/api/safetyNet"),
	async ({ url, request, event, params }) => {
		let res: Response = await fetch(request.clone());
		if (res.status >= 200 && res.status < 300) {
			return res;
		}
		let id = Number(request.url.substring(request.url.lastIndexOf('/')))
		let prev = await db.safetyNet.get(id);
		if (prev === undefined) {
			return new Response(null);
		}
		let data = prev;
		data._pending = 1;
		data._previous = prev;
		data._delete = true;
		await db.safetyNet.put(data, data.id);
		await self.registration.sync.register('safetynet');
		return new Response(null, {status: 204});
	},
	"DELETE"
)

// User

registerRoute(
	({ url }) =>
		url.origin === self.location.origin &&
		(url.pathname.startsWith("/api/sessions/whoami") ||
			url.pathname.startsWith("/api/user")),
	new NetworkFirst({
		cacheName: "user",
	})
);

/*self.addEventListener("activate", async e => {
	const status = await navigator.permissions.query({
		name: 'periodic-background-sync' as any,
	});
	if (status.state === 'granted') {
		// Periodic background sync can be used.
	} else {
		// Periodic background sync cannot be used.
	}

	const registration = await navigator.serviceWorker.ready;
	if ('periodicSync' in registration) {
		try {
			await registration.periodicSync.register('content-sync', {
				minInterval: 24 * 60 * 60 * 1000,
			});
		} catch (error) {
			// Periodic background sync cannot be used.
		}
	}
});

self.addEventListener('periodicsync', (event) => {
	if (event.tag === 'content-sync') {
		event.waitUntil(syncWiki());
	}
});*/

self.addEventListener("activate", (e) => {
	e.waitUntil(syncWiki());
});

self.addEventListener("fetch", (e) => {
	e.waitUntil(syncWiki());
});

async function syncWiki() {
	let upd = await db.updated.get("wiki");
	if (
		upd === undefined ||
		(upd !== undefined &&
			upd.time.valueOf() - Date.now() > 1000 * 60 * 60 * 24)
	) {
		let res = await fetch("/api/wiki");
		if (res.status == 200) {
			let data = await res.json();
			let entries: IWikiEntry[] = data.entries;
			await db.wiki.clear();
			for (const entry of entries) {
				await db.wiki.add(entry, entry.id);
				await db.updated.put(
					{ name: "wiki", time: new Date() },
					"wiki"
				);
			}
		}
	}
}

// Retry change requests when reconnected
self.addEventListener("sync", (e) => {
	e.waitUntil(
		(async () => {
			switch (e.tag) {
				case "safetynet":
					let pending = await db.safetyNet.where("_pending").equals(1).toArray();
					for (let item of pending) {
						if (item._delete) {
							if (await checkSafetyNetForUpdates(item.id) === null) {
								let res = await fetch("/api/safetyNet/" + item.id, {method: "DELETE"});
								if (res.status == 204) {
									await db.safetyNet.delete(item.id);
								}
							}
						} else if (item._previous === null) {
							let res = await fetch("/api/safetyNet", {method: "POST", body: JSON.stringify(item)});
							if (res.status == 201) {
								await db.safetyNet.delete(item.id);
								let newItem = await res.json() as ISafetyNetItem;
								await db.safetyNet.add(newItem, newItem.id);
							}
						} else {
							let res = await fetch("/api/safetyNet", {method: "PUT", body: JSON.stringify(item)});
							if (res.status == 200) {
								item._pending = 0;
								await db.safetyNet.put(item, item.id);
							}
						}
					}
					break;
				default:
					break;
			}
		})()
	);
});

async function checkSafetyNetForUpdates(id: number): Promise<ISafetyNetItem | null> {
	let res = await fetch("/api/safetyNet");
	if (res.status != 200) {
		return Promise.reject();
	}
	let data = await res.json() as ISafetyNetItem[];
	for (const item of data) {
		if (item.id == id) {
			return Promise.resolve(item);
		}
	}
	return Promise.resolve(null);
}
