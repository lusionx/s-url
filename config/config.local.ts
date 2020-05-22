import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.logger = {
        level: 'DEBUG',
        consoleLevel: 'DEBUG',
    }
    return config
}
