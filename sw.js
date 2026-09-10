const CACHE_NAME = "study-vision-v1";

const FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./notes.html",
    "./subjects.html",
    "./physics.html",
    "./focus.html",
    "./quiz.html",
    "./revision.html",
    "./progress.html",
    "./chapter.html"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});