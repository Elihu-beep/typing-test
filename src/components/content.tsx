import { useEffect, useState } from "react";
import { words } from "../assets/words";
import { ResetButton } from "./resetButton";
import { shuffle } from "./shuffle";

shuffle(words as string[])

export function Content() {
    const firstWords = words.slice(0,5)
    const [value, setValue] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [typedWords, setTypedWords] = useState<string[]>([])
    const [wordsShown, setWordsShown]  = useState<string[]>([])
    const [time, setTime] = useState<number>(60)
    const [isActive, setIsActive] = useState(false)
    const [elapsedTime, setElapsedTime] = useState<number>(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (time !== undefined && time !== 0) {
          setValue(e.target.value);
        }
      }

    useEffect(() => {
      let interval = null;
      if (isActive && time > 0) {
          interval = setInterval(() => {
            setTime((prevTime) => (prevTime && prevTime > 0 ? prevTime - 1 : 0))
          }, 1000);
          setElapsedTime((elapsedTime) => elapsedTime + 1)
      } else if (time <= 0) {
          setIsActive(false);
          clearInterval(interval);
      }
      return () => clearInterval(interval);
  }, [isActive, time]);

    useEffect(() => {
      setWordsShown([...firstWords])

      addEventListener("keypress", () => {setIsActive(true)})

        const handleKeyDown = (e: any) => {
            if (e.keyCode === 32) {
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

        if (typedWord === currentWord) {
          const newTypedWords = [...typedWords, typedWord];
          setTypedWords(newTypedWords);
          words.shift()
          setValue('');
        } else {
            words.shift()
            setValue('');
        }
      };
    
      const reset = () => {
        shuffle(words)
        setValue('')
        setCurrentIndex(0)
        setTypedWords([])
        setTime(60)
        setElapsedTime(0)
        setIsActive(false);
        setWordsShown(words.slice(0, 5));
      }

    return(
        <main>
            <div>
                <div className="Stats">
                    <p>Time: {time}</p>
                    <p>WPM: {(elapsedTime === 0) ? 0 : (0 + Math.round(typedWords.length / elapsedTime * 60))}</p>
                </div>
                <div className="CurrentWords">
                    {wordsShown.map((word, index) => (
                        <div key={index} className={"words"}>
                            <div className={index === 0 ? "currentWord" : ""}>{word}</div>
                        </div>
                ))}
                </div>
                <div className="inputContainer">
                    <label>
                        <input type="text" value={value} onChange={handleChange} />
                    </label>
                    <ResetButton onPress={reset} />
                </div>

            </div>
        </main>
    )
}