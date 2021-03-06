import { Controller } from 'egg'
import moment from 'moment'

interface DocUrl {
    url: string
    ctime: string
}

interface Row<T> {
    _id: string
    _index: string
    _type: string
    _source: T
}

export default class HomeController extends Controller {
    public async index() {
        let mid = this.app.mid // 3 bit
        let incr = this.app.incr // 13 bit
        this.ctx.body = { mid, incr, host: process.env['HOSTNAME'] }
    }

    public async save() {
        const { url } = this.ctx.request.body as { url: string }
        if (!/^https?:\/\/.+/.test(url)) {
            return this.ctx.bizError(400, {}, 'url')
        }
        let r = /^[a-zA-Z0-9]+$/
        let { app, ctx } = this
        const { config, axios } = this.app
        let sid = ''
        let i = 0
        do {
            const time = moment().subtract(i, 's').unix().toString(16) // 4byte 32bit hex
            let end = app.mid + app.incr // 3 + 13 bit
            end = parseInt(end, 2).toString(16) // 2byte hex
            let bid = Buffer.from(time + end, 'hex').toString('base64')
            if (r.test(bid)) {
                sid = bid
            } if (i >= 15) { // 多次丢弃后还不行, 则使用替换的方式
                sid = bid.replace(/\//g, '1').replace(/\+/g, '0')
            }
            i++
        } while (!sid)
        let doc: DocUrl = { url, ctime: moment().utcOffset(8).format() }
        let resp = await axios.post(config.es.docUrl + '/' + sid + '/_update', { doc, doc_as_upsert: true })
        ctx.status = resp.status
        ctx.body = { sid, status: resp.status, t: config.web.host + '/' + sid }
    }

    public async get() {
        const { ctx, app } = this
        let id: string = ctx.params.id
        const { config, axios } = app
        const resp = await axios.get<Row<DocUrl>>(config.es.docUrl + '/' + id, { validateStatus: (i) => i < 500 })
        let rw = resp.data
        if (!rw._source) {
            return ctx.bizError(404, {}, id)
        }
        ctx.redirect(rw._source.url)
    }
}
