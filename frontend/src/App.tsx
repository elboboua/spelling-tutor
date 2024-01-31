import { useEffect } from "react";
import "./App.css";

const synth = window.speechSynthesis;
let voices: SpeechSynthesisVoice[] = [];
function loadVoices() {
    voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
        console.log(i, voices[i].name, voices[i].lang);
    }
}

function App() {
    useEffect(() => {
        if ("onvoiceschanged" in synth) {
            synth.onvoiceschanged = loadVoices;
        } else {
            loadVoices();
        }
    }, []);

    return (
        <>
            <h1>Hello, world</h1>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    const utterThis = new SpeechSynthesisUtterance(
                        "Speak. I want to speak with you about your memory. Speak."
                    );
                    utterThis.voice = voices[0];
                    synth.speak(utterThis);
                }}
            >
                Speak, Memory!
            </button>
        </>
    );
}

export default App;
