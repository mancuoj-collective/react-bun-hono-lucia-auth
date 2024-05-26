import { Hono } from 'hono'
import { db } from './db'
import { movies } from './db/schema'

const app = new Hono()

app.get('/', async (c) => {
  const result = await db.select().from(movies)
  return c.json(result)
})

export default {
  port: 5555,
  fetch: app.fetch,
}
