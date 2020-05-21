import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

    /**
     * sayHi to you
     * @param name - your name
     */
    public async sayHi(name: string) {
        this.ctx.logger.info(this.service.redis.get)
        return `hi, ${name}`;
    }
}
