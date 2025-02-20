import path from "node:path"
import fs from 'node:fs'
import { fileURLToPath } from 'url'
import type { JokeType, VoteInfnormation } from "../models/index"

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const dbPath = path.join(__dirname, '..', 'db')

function createFullName(jokeId: string) {
  return dbPath + '/' + jokeId + '.json'
}

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath)
}

const jokeDB = {
  findJoke: async (jokeId: string) : Promise<JokeType|undefined> => {
    const jokeFile = createFullName(jokeId)
    if (fs.existsSync(jokeFile)) return JSON.parse(fs.readFileSync(jokeFile, { encoding: 'utf-8' }))
    return undefined
  },
  saveJoke: async (joke: JokeType, force: boolean = false) => {

    if (!force && fs.existsSync(createFullName(joke.id))) return

    fs.writeFileSync(createFullName(joke.id), JSON.stringify(joke), { encoding: 'utf-8' })
  },
  updateVote: async (jokeId: string, votes: VoteInfnormation[]) => {

    const jokeFile = createFullName(jokeId)

    if (!fs.existsSync(jokeFile)) throw `Joke ${jokeId} not found`

    const joke = JSON.parse(fs.readFileSync(jokeFile, { encoding: 'utf-8' })) as JokeType

    //console.log('updateVote', joke, votes)

    let result: VoteInfnormation[] = []
    joke.votes.forEach(vote => {
      const changedVote = votes.find(voteI => vote.label === voteI.label)
      if (changedVote) {
        vote.value! += changedVote.value || 1;        
        result.push(vote)
      }
    })

    fs.writeFileSync(jokeFile, JSON.stringify(joke), { encoding: 'utf-8' })

    return result
  }
}

export default jokeDB