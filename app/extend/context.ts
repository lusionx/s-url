import { Context } from 'egg'

export default {
    /** eggjs/router 让无意义set合法, get是从app上直接取的 */
    set router(this: Context, r: any) { Object.is(r, 0) },
    bizError(this: Context, code: number, body: any, _id?: string): void {
        this.status = code
        if (_id) {
            Object.assign(body, { found: false, _id })
        }
        this.body = body
    },
}
