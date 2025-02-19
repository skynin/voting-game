type VoteInfnormation = {
  label: string
  value?: number  
}

type JokeBaseType = {
  id: string
  question: string
  answer: string
}

type JokeVotesType = {
  votes: Array<VoteInfnormation>
  availableVotes: Array<string>
}

type JokeType = JokeBaseType & JokeVotesType

export type {
  JokeType,
  JokeBaseType,
  VoteInfnormation
}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

class Vote {
  value: number
  label: string
  constructor(value: number, label: string) {
    this.value = value
    this.label = label
  }  
}

function createJoke(jokeBase: JokeBaseType): JokeType {
  return Object.assign({}, jokeBase, {
    votes: [
      new Vote(getRandomInt(0, 10), "😂"),
      new Vote(getRandomInt(0, 10), "👍"),
      new Vote(getRandomInt(0, 10), "❤️"),
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

export { getRandomInt, jokesStubs }