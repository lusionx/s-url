import 'egg';

declare module 'egg' {
    interface Context {
        runInBackground(f: () => Promise<void>): void
    }
}
