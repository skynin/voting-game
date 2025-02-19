import { JokeVotesType } from "../utils"
import VoteShow from "./VoteShow"

type ReactionProps = JokeVotesType & {jokeId: string}

function ReactionShow({ jokeId, votes, availableVotes }: ReactionProps) {
  return (
    <div>
      <ul className="votes">
        {votes
          .filter((vote) => availableVotes.includes(vote.label))
          .map((vote) => (
            <li key={`${jokeId}-${vote.label}`}>
              <VoteShow vote={vote} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ReactionShow
