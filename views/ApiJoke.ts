import { getRandomInt } from "./utils"
import type { JokeBaseType, JokeType} from "./utils"
import type { VoteInfnormation } from "./utils"

// @ts-ignore
let prevJoke = -1
// @ts-ignore
const getRandomJokeUI = async (): Promise<JokeType> => {
   let i = prevJoke
    while ((i = getRandomInt(0, jokesStubs.length) || 1) && i == prevJoke) {}
    prevJoke = i

    const joke = jokesStubs[i]

    // DEBUG
    /*setTimeout(() => {
      joke.votes[0].updateVote(100)  
    }, 2000)*/

    return new Promise<JokeType>((resolve) => setTimeout(() => resolve(joke), 500))  
}
const getRandomJoke = async (): Promise<JokeType> => {
  const response = await fetch("/api/joke")
  const json = jokeFromDTO((await response.json()) as JokeType)

  const iJoke = jokesStubs.findIndex((joke) => joke.id === json.id)

  if (iJoke !== -1) {
    return jokesStubs[iJoke] = json
  }
  return json
}

const apiJoke = {
  getRandomJoke,
  postVote: async (jokeId: string, votes: VoteInfnormation[]) => {
    let result: VoteInfnormation[] = []

    jokesStubs.find(joke => joke.id === jokeId)?.votes.forEach(vote => {
      const changedVote = votes.find(voteI => vote.label === voteI.label)
      if (changedVote) {
        vote.value += changedVote.value || 1;        
        result.push(vote)
      }
    }) 
    return result   
  },
}

export default apiJoke

class Vote {
  jokeId: string
  #value: number
  label: string
  fireVote?: (vote: number) => void

  constructor(value: number, label: string, jokeId: string) {
    this.#value = value
    this.label = label
    this.jokeId = jokeId
  }

  set value(value: number) {
    this.#value = value
    this.fireVote?.(value)
  }

  get value() {
    return this.#value
  }

  async updateVote(value: number) {
    return apiJoke.postVote(this.jokeId, [{label: this.label, value}])
  }
}

function jokeFromDTO(joke: JokeType) : JokeType{
  return Object.assign({}, joke, {
    votes: joke.votes.map((vote) => new Vote(vote.value, vote.label, joke.id)),
  })
}

// * * * DEBUG ui * * *

function createJoke(jokeBase: JokeBaseType): JokeType {
  return Object.assign({}, jokeBase, {
    votes: [
      new Vote(getRandomInt(0, 10), "😂", jokeBase.id),
      new Vote(getRandomInt(0, 10), "👍", jokeBase.id),
      new Vote(getRandomInt(0, 10), "❤️", jokeBase.id),
    ],
    availableVotes: ["😂", "👍", "❤️"],
  })
}

const jokesStubs = [
  createJoke({
    id: "unique_joke_id",
    question: "Why did the developer go broke?",
    answer: "Because he used up all his cache!",
  }),
  createJoke({
    id: "turkey-road",
    question: "Why did the turkey cross the road?",
    answer: "To get to the chicken.",
  }),

  createJoke({
    id: "pilot-food",
    question: "What's a pilots favorite bagel?",
    answer: "Plain.",
  }),

  createJoke({
    id: "guitar",
    question:
      "Why does the man wish he could be a guitar player in a room full of beautiful girls?",
    answer: "Because if he was a guitar player, he would have his pick!",
  }),

  createJoke({
    id: "pig-karate",
    question: "What do you call a pig that does karate?",
    answer: "A pork chop.",
  }),

  createJoke({
    id: "fake-horror",
    question: "What is a vampire's favorite dessert?",
    answer: "Vampires aren't real.",
  }),
]
