import { useEffect, useState } from "react";
import { words } from "../assets/words";
import { shuffle } from "../shuffle";
import { ResetButton } from "./resetButton";

shuffle(words)

export function Content() {
    const firstWords = words.slice(0,5)
    const [value, setValue] = useState('')
    const [currentIndex] = useState(0)
    const [typedWords, setTypedWords] = useState([])
    const [testWords, setTestWords]  = useState([])
    const [time, setTime] = useState(30)
    const [isActive, setIsActive] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0) 

    const handleChange = (e) => {
      if (time != 0){
        setValue(e.target.value)
      }
        
    }

    useEffect(() => {
      let interval = null;
      if (isActive && time > 0) {
          interval = setInterval(() => {
              setTime((prevTime) => prevTime - 1);
          }, 1000);
          setElapsedTime((elapsedTime) => elapsedTime + 1)
          console.log(elapsedTime)
      } else if (time <= 0) {
          setIsActive(false);
          clearInterval(interval);
      }
      return () => clearInterval(interval);
  }, [isActive, time]);

    useEffect(() => {
      setTestWords(firstWords)

      addEventListener("keypress", (e) => {setIsActive(true)})

        const handleKeyDown = (e) => {
            if (e.keyCode === 32) {
                console.log("spacebar is working")
                e.preventDefault()
                checkWord()
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        }
    }, [currentIndex, value])

    const checkWord = () => {
        const currentWord: string = words[currentIndex];
        const typedWord = value.trim();

        console.log("Current word: ", currentWord)
        console.log("Typed word: ", typedWord)
    
        if (typedWord === currentWord) {
          const newTypedWords = [...typedWords, typedWord];
          setTypedWords(newTypedWords);
          words.shift()
          console.log(typedWords)
          setValue('');
        }
        test()
      };

      const test = () => {
        const numOfNewTyped = typedWords.length + 1
        console.log(numOfNewTyped)

        if (numOfNewTyped === 5) {
            console.log("ok")
        }
      }
    

    return(
        <main>
            <div className="Layout">
                <div className="Stats">
                    <p>Time: {time}</p>
                    <p>WPM: {Math.round(typedWords.length / elapsedTime * 60)}</p>
                </div>
                <div className="CurrentWords">
                    {testWords.map((word, index) => (
                        <div key={index} className={"words"}>
                            <div className={index === 0 ? "currentWord" : ""}>{word}</div>
                        </div>
                ))}
                </div>
                <div className="inputContainer">
                    <label>
                        <input type="text" value={value} onChange={handleChange} />
                    </label>
                    <ResetButton />
                </div>

            </div>
        </main>
    )
}