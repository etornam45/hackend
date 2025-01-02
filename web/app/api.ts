import { treaty } from '@elysiajs/eden'
import { App } from '../../server/src/index';

const client = treaty<App>('localhost:3000')


const { data } = await client.auth.login.post({
    email: 'navidben45@gmail.com',
    password: 'password'
})

console.log(data)