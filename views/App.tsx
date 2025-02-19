import { useEffect, useState } from 'react'
import apiJoke from './ApiJoke'
import './App.css'
import JokeShow from './ui/JokeShow'
import NextJokeButton from './ui/NextJokeButton'
import { emptyJoke } from './utils'

function App() {
  const [joke, setJoke] = useState(emptyJoke)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(loadJoke,[emptyJoke])
    
  function loadJoke() {
    setIsLoading(true)
    apiJoke.getRandomJoke().then((newJoke) => {
      setJoke(newJoke)
      setIsLoading(false)
    }).catch((error) => {
      console.error('Failed to load joke:', error)
      setIsLoading(false) 
    })
  } 

  return (
    <>    
      <JokeShow joke={joke}/>
      <NextJokeButton act={loadJoke} disabled={isLoading}/>
    </>
  )
}

export default App
