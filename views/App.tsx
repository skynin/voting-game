import { useEffect, useRef, useState } from 'react'
import apiJoke from './ApiJoke'
import './App.css'
import JokeShow from './ui/JokeShow'
import NextJokeButton from './ui/NextJokeButton'
import { emptyJoke } from './utils'

function App() {
  const [joke, setJoke] = useState(emptyJoke)
  const [isLoading, setIsLoading] = useState(false)
  const initialLoadRef = useRef(false) // use a ref to prevent double-loading

  useEffect(() => {
    // Note: The double-invocation only happens in development mode. In production, your effect will only run once.
    // loadJoke()
    if (!initialLoadRef.current) {
      initialLoadRef.current = true
      loadJoke()
    }
  }, [])
    
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
