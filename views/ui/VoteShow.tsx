type VoteProps = {
  vote: {
    value: number
    label: string
  }
}

function VoteShow({vote}: VoteProps) {
  return (
    <div>
      <p>{vote.label}</p>
      <p>{vote.value}</p>
      <p>button</p>
    </div>
  )
}

export default VoteShow