type ActionNextJokeButton = {act: () => void, disabled: boolean}

function NextJokeButton({act, disabled}: ActionNextJokeButton) {
  return (
    <div>
      <button disabled={disabled} onClick = {act}>{disabled ? 'Loading...' : 'Next Joke'}</button>
    </div>
  )
}

export default NextJokeButton