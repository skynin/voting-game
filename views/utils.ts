 // The maximum is exclusive and the minimum is inclusive
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

type VoteInfnormation = {
  label: string
  value?: number  
}

type JokeBaseType = {
  id: string
  question: string
  answer: string
}
type VoteType = {
  value: number
  label: string
  fireVote?: (vote: number) => void
  updateVote: (value: number) => Promise<VoteInfnormation[]>
}

type JokeVotesType = {
  votes: Array<VoteType>
  availableVotes: Array<string>
}

type JokeType = JokeBaseType & JokeVotesType

const emptyJoke: JokeType = {id: "0", question: "", answer: "", votes: [], availableVotes: [] }

export {
  emptyJoke,
  getRandomInt
}

export type {
  JokeBaseType,
  JokeVotesType,
  JokeType,
  VoteInfnormation,
  VoteType as VoteItemType
}