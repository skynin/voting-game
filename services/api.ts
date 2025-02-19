import { Hono } from "hono"
import { getRandomInt, jokesStubs } from "../models"

let prevJoke = -1

const api = new Hono()
.get("/api/joke", c => {
  let i = prevJoke
  while ((i = getRandomInt(0, jokesStubs.length) || 1) && i == prevJoke) {}
  prevJoke = i

  const joke = c.json(jokesStubs[i])
  return new Promise((resolve) => setTimeout(() => resolve(joke), 500))
  }
)

export default api