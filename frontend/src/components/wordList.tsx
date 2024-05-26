
interface Word {
    name: string;
}

interface WordListProps {
    words: Word[];
}

export function WordList({words}: WordListProps) {
    return (
        <div>
            {words.map((word) => {
                return <p>{word.name}</p>
            })}
        </div>
    )
}