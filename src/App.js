import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const App = () => {
  const [text, setText] = useState("");
  const [preset, setPreset] = useState([]);
  const { speak, speaking, supported } = useSpeechSynthesis();
  const defaultPreset = ["hello", "good bye"]
  useEffect(() => {
    const localStoragePreset = JSON.parse(localStorage.getItem("presetChat"));
    if (localStoragePreset !== undefined) {
      const concatPreset = defaultPreset.concat(localStoragePreset)
      setPreset(concatPreset);
    } else {
      localStorage.setItem("presetChat", JSON.stringify(defaultPreset));
    }
  }, []);

  const handleSpeak = () => {
    if (supported) {
      speak({ text });
      const tempArr = preset;
      tempArr.push(text);
      localStorage.setItem("presetChat", JSON.stringify(tempArr));
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSpeak();
    }
  };

  const handleClearPreset = () => {
    setPreset([])
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "1em" }}>
        <h1>Text here</h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown} // Add the event listener here
          placeholder="Type your message..."
          rows={50}
          cols={100}
        />
        <button
          style={{ display: "block" }}
          onClick={handleSpeak}
          disabled={speaking || !supported}
        >
          Speak
        </button>
        {!supported && <p>Speech synthesis not supported on your browser.</p>}
      </div>
      <div style={{ margin: "1em" }}>
        <h1>Preset</h1>
        <div>

          {preset.map((list, i) => {
            return <li key={i}>{list}</li>;
          })}
        </div>
        <button
        
          style={{ display: "block", margin: "1em 0em" }}
          onClick={handleClearPreset}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default App;
