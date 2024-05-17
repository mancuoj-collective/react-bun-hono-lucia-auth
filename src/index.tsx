import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import { z } from 'zod'

const app = new Hono()

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}

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

export default app
