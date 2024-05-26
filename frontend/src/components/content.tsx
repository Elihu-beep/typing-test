import { useState } from "react"
import { WordList } from "./wordList"

const words = [{id: 1, name: "test1"}, {id: 2, name: "test2"}]

export function Content() {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return(
        <main>
            <div className="Layout">
                <div className="Stats">
                    <p>Time: 60</p>
                    <p>WPM: {value}</p>
                </div>
                <div className="CurrentWords">
                    <WordList words={words}/>
                </div>
                <div className="InputDiv">
                    <label>
                        <input type="text" value={value} onChange={handleChange} />
                    </label>
                </div>
            </div>
            <div className="spacer"></div>
        </main>
    )
}