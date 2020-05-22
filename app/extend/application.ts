import axios, { AxiosInstance } from 'axios'
import { Application } from 'egg'

let MAX = Math.pow(2, 13)
let INCR = Math.floor(Math.random() * MAX)
let HCODE = ''

export default {
    get axios(this: Application): AxiosInstance {
        return axios.create({ timeout: 6e4, })
    },
    get mid(this: Application): string {
        if (HCODE) return HCODE
        let hname = process.env['HOSTNAME'] || '-lxing'
        let code = hname.split('-').reverse()[0]
        this.logger.info('HCODE', code)
        let id = Buffer.from(code, 'base64').toString('hex').slice(0, 2)
        return HCODE = parseInt(id, 16).toString(2).slice(0, 3) // 取pod后缀的前3个bit
    },
    get incr(this: Application): string {
        let c = (INCR++) % MAX
        return c.toString(2).padStart(13, '0') // 13 bit
    }
}
