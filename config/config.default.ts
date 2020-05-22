import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1555572354067_1620';

    // add your egg config in here
    config.middleware = [];

    // add your special config in here
    const bizConfig = {
        es: {
            docUrl: "http://esv5.yc.besth5.com/dev/docs",
        },
    };

    // the return config will combines to EggAppConfig
    return {
        ...config as {},
        ...bizConfig,
    };
};
