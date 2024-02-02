import { useEffect, useState } from "react";

const synth = window.speechSynthesis;
let voices: SpeechSynthesisVoice[] = [];
function loadVoices() {
    voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
        console.log(i, voices[i].name, voices[i].lang);
    }
}

if ("onvoiceschanged" in synth) {
    synth.onvoiceschanged = loadVoices;
} else {
    loadVoices();
}

export default function Study() {
    const [studyList, setStudyList] = useState(SPELLING_LIST);
    const [currentIndex, setCurrentIndex] = useState(0);

    const onSpellingAttempt = (correct: boolean) => {
        if (correct) {
            console.log("Correct!");
            currentIndex < studyList.length - 1 &&
                setCurrentIndex(currentIndex + 1);
        } else {
            console.log("Incorrect!");
        }
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "100vh",
                flexDirection: "column",
            }}
        >
            <SpellingCard
                word={studyList[currentIndex].word}
                example_sentence={studyList[currentIndex].example_sentence}
                onSpellingAttempt={onSpellingAttempt}
            />
        </div>
    );
}

interface SpellingCardProps {
    word: string;
    example_sentence: string;
    onSpellingAttempt: (correct: boolean) => void;
}
const SpellingCard = ({
    word,
    example_sentence,
    onSpellingAttempt,
}: SpellingCardProps) => {
    const wordSsu = (() => {
        const utterThis = new SpeechSynthesisUtterance(word);
        utterThis.voice = voices[0];
        return utterThis;
    })();

    const sentenceSsu = (() => {
        const utterThis = new SpeechSynthesisUtterance(example_sentence);
        utterThis.voice = voices[0];
        return utterThis;
    })();

    useEffect(() => {
        setTimeout(() => {
            synth.speak(wordSsu);
        }, 500);

        return () => {
            synth.cancel();
        };
    }, [word]);

    return (
        <div
            style={{
                width: "80%",
                maxWidth: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <button
                onClick={() => {
                    synth.speak(wordSsu);
                }}
            >
                word
            </button>
            <button
                onClick={() => {
                    synth.speak(sentenceSsu);
                }}
            >
                sentence
            </button>
            <input
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                type="text"
                onChange={(e) => {
                    if (e.target.value === word) {
                        onSpellingAttempt(true);
                        e.target.value = "";
                    }
                }}
                onKeyUp={(e) => {
                    if (e.key !== "Enter") return;
                    if (e.currentTarget.value === word) {
                        onSpellingAttempt(true);
                        e.currentTarget.value = "";
                    } else {
                        alert("Incorrect!");
                    }
                }}
            />
        </div>
    );
};

const SPELLING_LIST = [
    {
        id: 1,
        word: "apple",
        example_sentence: "I ate an apple for breakfast.",
    },
    {
        id: 2,
        word: "banana",
        example_sentence: "I ate a banana for breakfast.",
    },
    {
        id: 3,
        word: "cherry",
        example_sentence: "I ate a cherry for breakfast.",
    },
    {
        id: 4,
        word: "date",
        example_sentence: "I ate a date for breakfast.",
    },
    {
        id: 5,
        word: "elderberry",
        example_sentence: "I ate an elderberry for breakfast.",
    },
    {
        id: 6,
        word: "fig",
        example_sentence: "I ate a fig for breakfast.",
    },
    {
        id: 7,
        word: "grape",
        example_sentence: "I ate a grape for breakfast.",
    },
    {
        id: 8,
        word: "honeydew",
        example_sentence: "I ate a honeydew for breakfast.",
    },
    {
        id: 9,
        word: "kiwi",
        example_sentence: "I ate a kiwi for breakfast.",
    },
    {
        id: 10,
        word: "lemon",
        example_sentence: "I ate a lemon for breakfast.",
    },
    {
        id: 11,
        word: "mango",
        example_sentence: "I ate a mango for breakfast.",
    },
    {
        id: 12,
        word: "nectarine",
        example_sentence: "I ate a nectarine for breakfast.",
    },
    {
        id: 13,
        word: "orange",
        example_sentence: "I ate an orange for breakfast.",
    },
    {
        id: 14,
        word: "pear",
        example_sentence: "I ate a pear for breakfast.",
    },
    {
        id: 15,
        word: "quince",
        example_sentence: "I ate a quince for breakfast.",
    },
    {
        id: 16,
        word: "raspberry",
        example_sentence: "I ate a raspberry for breakfast.",
    },
    {
        id: 17,
        word: "strawberry",
        example_sentence: "I ate a strawberry for breakfast.",
    },
    {
        id: 18,
        word: "tangerine",
        example_sentence: "I ate a tangerine for breakfast",
    },
];
