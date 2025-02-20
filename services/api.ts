import { Hono } from "hono"
import { getRandomInt, jokesStubs, VoteInfnormation } from "../models"
import jokeDB from "./db"

let prevJoke = -1

const api = new Hono()
.get("/api/joke", async c => {
  let i = prevJoke
  while ((i = getRandomInt(0, jokesStubs.length) || 1) && i == prevJoke) {}
  prevJoke = i

  let jokeResult = await jokeDB.findJoke(jokesStubs[i].id)
  if (!jokeResult) {
    jokeResult = jokesStubs[i]
    jokeDB.saveJoke(jokeResult)
  }

  const jokeJSON = c.json(jokeResult)
  return new Promise((resolve) => setTimeout(() => resolve(jokeJSON), 500))
  }
)
.post("/api/joke/:id", async (c) => {
  const id = c.req.param('id')
  const votes = await c.req.json() as VoteInfnormation[]
  //console.log('.post',id, votes)  
  return c.json(await jokeDB.updateVote(id, votes))
})

export default api