import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { Layout } from './layout'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{
  Bindings: Bindings
}>()

app.get('/', (c) => {
  return c.html(
    <Layout>
      <a href="/signup">signup</a>
      <br />
      <a href="/login">login</a>
    </Layout>,
  )
})

app.get('/signup', (c) => {
  return c.html(
    <Layout>
      <form method="post">
        <input name="email" type="email" />
        <input name="password" type="password" />
        <button type="submit">signup</button>
      </form>
    </Layout>,
  )
})

app.post(
  '/signup',
  zValidator(
    'form',
    z.object({
      email: z.string().email(),
      password: z.string().min(1),
    }),
  ),
  (c) => {
    const { email, password } = c.req.valid('form')
    console.log(email, password)
    return c.redirect('/')
  },
)

app.get('/login', (c) => {
  return c.html(
    <Layout>
      <form method="post">
        <input name="email" type="email" />
        <input name="password" type="password" />
        <button type="submit">login</button>
      </form>
    </Layout>,
  )
})

export default app
