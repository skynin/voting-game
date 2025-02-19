import type {JokeBaseType, VoteInfnormation} from "../models/index"
import { getRandomInt } from "../models/index"

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
  VoteType
}