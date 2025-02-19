import { useState } from "react";
import apiJoke from "../ApiJoke";

type VoteProps = {
  jokeId: string
  vote: {
    value: number
    label: string
  }
}

function VoteShow({jokeId, vote}: VoteProps) {
  
  const [isChecked, setIsChecked] = useState(false)

  function handleClick() {
    // "!isChecked" means we try to post the vote
    apiJoke.postVote(jokeId, [{label: vote.label, value: !isChecked ? 1 : -1}])
    .then(() => setIsChecked(!isChecked))
    .catch((error) => console.error('Failed to post the joke vote:', error))
  }

  return (
    <div>
      <p>{vote.value}<br/>
      {vote.label}</p>      
      <div>
      <input type="checkbox" onChange={handleClick} checked={isChecked} />
      </div>
    </div>
  )
}

export default VoteShow