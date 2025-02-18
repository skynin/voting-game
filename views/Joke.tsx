import { useState } from 'react'

function randomEndpoint() : string {
	return Math.random() * 10 > 5 ? '/api/joke' : '/api/moke'
}

const LoadingStr = 'Loading...', DefaultButtonStr = 'Get text'

function getJoke(setJoke: React.Dispatch<React.SetStateAction<string>>) {

	setJoke(LoadingStr)

	setTimeout(() => {
		fetch(randomEndpoint())
			.then(response => {return response.json()})
			.then(data => {
				const jokeData = data as { value: string }
				setJoke(jokeData.value)
			})
	}, 1000)
}

type JokeProps = {
	countFunc: React.Dispatch<React.SetStateAction<void>>
}

function Joke({ countFunc } : JokeProps) {

	const [jokeStr, setJoke] = useState(DefaultButtonStr)

	function setDefaultStr() {
		setTimeout(() => {setJoke(DefaultButtonStr)}, 10000)
	}

	return (
		<div className="joke">
        <button onClick={() => {getJoke(setJoke), countFunc(), setDefaultStr()}} disabled={jokeStr === LoadingStr}>
          {jokeStr}
        </button>
		</div>
	)
}

export default Joke
