import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    static: {
        enable: false,
    },
    view: {
        enable: false,
    },
    i18n: {
        enable: false,
    },
    multipart: {
        enable: false,
    },
    security: {
        enable: false,
    },
    // nunjucks: {
    //   enable: true,
    //   package: 'egg-view-nunjucks',
    // },
};

export default plugin;
