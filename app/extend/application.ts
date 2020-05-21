import axios, { AxiosInstance } from 'axios'
import { Application } from 'egg'

export default {
    get axios(this: Application): AxiosInstance {
        return axios.create({ timeout: 6e4, })
    }
}
