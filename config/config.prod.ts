import { EggAppConfig, PowerPartial } from 'egg'

export default () => {
    const config: PowerPartial<EggAppConfig> = {}
    config.logger = {
        level: 'DEBUG',
        consoleLevel: 'DEBUG',
        dir: '/var/log',
    }
    config.es = {
        docUrl: process.env["ES_DOCURL"] || "http://esv5.yc.besth5.com/s-url/docs",
    }
    config.web = {
        host: 'http://t.n1q.cn'
    }
    return config
}
