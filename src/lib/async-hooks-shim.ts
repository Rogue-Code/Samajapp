// Browser-safe stand-in for node:async_hooks, aliased in vite.capacitor.config.ts.
//
// The Capacitor build has no TanStack Start Vite plugin (unlike vite.config.ts,
// via @lovable.dev/vite-tanstack-config), so createServerFn's module graph pulls
// in @tanstack/start-storage-context's real Node import as plain code instead of
// getting swapped for a client-safe stub. That file only calls .run()/.getStore()
// to track server-request context — meaningless in a WebView with no server
// runtime of its own — so a minimal synchronous stand-in is enough to satisfy it.
export class AsyncLocalStorage<T> {
  private store: T | undefined;

  run<R>(store: T, fn: () => R): R {
    const previous = this.store;
    this.store = store;
    try {
      return fn();
    } finally {
      this.store = previous;
    }
  }

  getStore(): T | undefined {
    return this.store;
  }
}
