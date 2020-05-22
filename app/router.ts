import { Application } from 'egg'

export default (app: Application) => {
    const { controller: c, router: r } = app
    r.get('/dev', c.home.index)
    r.post('/s', c.home.save)
    r.get('/:id', c.home.get)
}
