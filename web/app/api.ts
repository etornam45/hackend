import { treaty } from '@elysiajs/eden'
import type { App } from  "@hackend/server/src"

export const apiClient = treaty<App>('localhost:3000')


// const { data } = await client.auth.login.post({
//     email: 'navidben45@gmail.com',
//     password: 'password'
// })

// console.log(data)