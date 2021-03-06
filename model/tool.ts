import { createInterface } from 'readline'
import { createReadStream, writeFile as _writeFile } from 'fs'
import { exec } from 'child_process'

export function range(start: number, end: number, step: number = 1) {
    const ls: number[] = []
    while (start < end) {
        ls.push(start)
        start += step
    }
    return ls
}

/** 不要滥用 */
export async function reawait<T>(j: number, msSleep: number = 0, p: () => Promise<T>): Promise<T> {
    let err: any
    for (const i of range(0, j)) {
        try {
            err = i
            return await p()
        } catch (error) {
            err = error
            // console.log('reawart', i)
            if (msSleep) {
                await sleep(msSleep)
            }
        }
    }
    throw err
}

export function doitnow<T>(p: () => Promise<T>) { return p() }
export function doscope<T>(f: () => T) { return f() }
export function done<T>(p: T) { return p }

export function doLimit<T>(limit: number, fs: Array<() => Promise<T>>) {
    const res: Array<Promise<T>> = new Array(fs.length)
    return new Promise<T[]>((a, b) => {
        function gogo(i: number) {
            const end = fs[i]()
            res[i] = end
            end.then(next(i)).catch(next(i))
        }
        function next(i: number) {
            return () => {
                const j = res.findIndex((r, j) => i < j && !r)
                if (j === -1) {
                    return Promise.all(res).then(a).catch(b)
                }
                gogo(j)
            }
        }
        range(0, Math.min(limit, fs.length)).forEach(gogo)
    })
}

export async function noError<T>(p: Promise<T>): Promise<T | undefined> {
    try {
        return await p
    } catch (error) { }
}

export function sleep(ms: number): Promise<void> {
    return new Promise<void>(res => {
        setTimeout(() => {
            res()
        }, ms)
    })
}
/** 简化axios的异常 */
export function axiosCatch(error: any): Error {
    const { response } = error
    if (!response) {
        return error
    }
    const { config, status, statusText } = response
    const { method, url, data } = config
    const err: any = new Error([method, url, 'with', status, statusText].join(' '))
    if (data) {
        err.data = data
    }
    err.body = response.data
    return err
}

function _readFile(filename: string, callback: (err?: any, lines?: string[]) => void) {
    const rl = createInterface({
        input: createReadStream(filename),
        terminal: false,
    })
    const ls: string[] = []
    rl.on('line', (e: string) => {
        return ls.push(e)
    })
    rl.on('close', () => {
        callback(undefined, ls)
    })
}

export async function readFile(filename: string): Promise<string[]> {
    return new Promise<string[]>((res, rej) => {
        _readFile(filename, (err, ls) => {
            err ? rej(err) : res(ls)
        })
    })
}

export function writeFile(path: string, data: any): Promise<void> {
    return new Promise<void>((res, rej) => {
        _writeFile(path, data, err => {
            err ? rej(err) : res()
        })
    })
}

export async function cmdExec(cmd: string): Promise<string> {
    return new Promise<string>((res, rej) => {
        exec(cmd, (error, stdout, stderr) => {
            error ? rej(stderr) : res(stdout)
        })
    })
}

export class Single<T> {
    instance!: T
    get(fn?: () => T): T {
        if (this.instance) {
            return this.instance
        }
        if (fn) {
            return this.instance = fn()
        }
        throw new Error('need creater')
    }
}
