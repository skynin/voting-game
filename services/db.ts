import path from "node:path"
import fs from 'node:fs'
import type { JokeType } from "../models/index"

const dbPath = path.join(__dirname, '..', 'db')

function createFullName(jokeId: string) {
  return dbPath + '/' + jokeId + '.json'
}

const jokeDB = {
  findJoke: async (id: string) : Promise<JokeType|undefined> => {
    return undefined
  },
  saveJoke: async (joke: JokeType) => {
    fs.writeFileSync(createFullName(joke.id), JSON.stringify(joke), { encoding: 'utf-8' })
  }
}

export default jokeDB