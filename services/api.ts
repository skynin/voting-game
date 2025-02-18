import { Hono } from "hono"

const api = new Hono()
.get("/api/joke", c => c.json({ value: "Joke text" }))
.get("/api/moke", c => c.json({ value: "Moke text" }))

export default api