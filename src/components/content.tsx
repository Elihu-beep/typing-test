import { useEffect, useState } from "react";

const words = [
    "apple",
    "banana",
    "chair",
    "dog",
    "elephant",
    "fish",
    "guitar",
    "hat",
    "jacket",
    "kite",
    "lamp",
    "monkey",
    "notebook",
    "orange",
    "piano",
    "queen"
  ];

const ResetButton = () => {
    return (
      <button className="resetButton">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"/></svg>
      </button>
    );
  };

export function Content() {
    const firstWords = words.slice(0,5)
    const [value, setValue] = useState('')
    const [currentIndex] = useState(0)
    const [typedWords, setTypedWords] = useState([])
    const [testWords, setTestWords]  = useState([])

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {

        setTestWords(firstWords)

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
                    <p>Time: 60</p>
                    <p>WPM: over 9000</p>
                </div>
                <div className="CurrentWords">
                    {testWords.map((word, index) => (
                        <text key={index} className={"words"}>
                            {word + "-"}
                        </text>
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