import { JokeVotesType } from "../utils";
import VoteShow from "./VoteShow";

function ReactionShow({ votes, availableVotes }: JokeVotesType) {
  return (
    <div>
      <ul className="votes">
        {votes
          .filter((vote) => availableVotes.includes(vote.label))
          .map((vote) => (
            <li key={vote.label}>
              <VoteShow vote={vote} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ReactionShow;
