import { JokeType } from "../utils"
import ReactionShow from "./ReactionShow"

type JokeProps = {
  joke: JokeType
}

function JokeShow({joke} : JokeProps) {
  return (
    <div>
      <p>{joke.question}</p>
      <p>{joke.answer}</p>
      <ReactionShow votes={joke.votes} availableVotes={joke.availableVotes}/>
    </div>
  )
}

export default JokeShow