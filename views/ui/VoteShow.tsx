import { useEffect, useState } from "react"
import type { VoteType } from "../utils"

type VoteProps = {
  vote: VoteType
}

function VoteShow({vote}: VoteProps) {
  
  const [isChecked, setIsChecked] = useState(false)
  const [voteValue, setVoteValue] = useState(vote.value)

  useEffect(() => {   
    vote.fireVote = setVoteValue    
  }, [])

  function handleClick() {
    // "!isChecked" means we try to post the vote
    vote.updateVote(!isChecked ? 1 : -1)    
    .then(() => setIsChecked(!isChecked))
    .catch((error) => console.error('Failed to post the joke vote:', error))
  }

  return (
    <div>
      <p>{voteValue}<br/>
      {vote.label}</p>      
      <div>
      <input type="checkbox" onChange={handleClick} checked={isChecked} />
      </div>
    </div>
  )
}

export default VoteShow