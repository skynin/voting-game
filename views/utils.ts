 // The maximum is exclusive and the minimum is inclusive
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

type JokeBaseType = {
  id: string
  question: string
  answer: string
}
type JokeVotesType = {
  votes: Array<{
    value: number
    label: string
  }>
  availableVotes: Array<string>
};

type JokeType = JokeBaseType & JokeVotesType

const emptyJoke: JokeType = {id: "0", question: "", answer: "", votes: [], availableVotes: []}

export {
  emptyJoke,
  getRandomInt
}

export type {
  JokeBaseType,
  JokeVotesType,
  JokeType
}