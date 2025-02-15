import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
    const { request, response } = event
    const body = await readBody(request)
    const { username, password } = JSON.parse(body)
    
    if (username === 'admin' && password === 'admin') {
        response.setHeader('Set-Cookie', 'token=123')
        response.status = 200
        response.body = 'Login success'
    } else {
        response.status = 401
        response.body = 'Login failed'
    }
})