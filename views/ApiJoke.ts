import { getRandomInt } from "./utils"
import type { JokeBaseType, JokeType} from "./utils"

type VoteInfnormation = {
  label: string
  value?: number  
}

let prevJoke = -1

const apiJoke = {
  getRandomJoke: async () => {
    /*const response = await fetch("/api/joke");
    const json = await response.json();
    return json;*/

    let i = prevJoke
    while ((i = getRandomInt(0, jokesStubs.length) || 1) && i == prevJoke) {}
    prevJoke = i

    return new Promise<JokeType>((resolve) => setTimeout(() => resolve(jokesStubs[i]), 2000))
  },
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
  }
}

export default apiJoke

// * * * DEBUG ui * * *

function createJoke(jokeBase: JokeBaseType): JokeType {
  return Object.assign({}, jokeBase, {
    votes: [
      { value: getRandomInt(0, 10), label: "😂" },
      { value: getRandomInt(0, 10), label: "👍" },
      { value: getRandomInt(0, 10), label: "❤️" },
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
