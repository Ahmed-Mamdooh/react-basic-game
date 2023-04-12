import { useState, useEffect, useRef } from "react";
import "./App.css";
function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [text, setText] = useState(null);
  const [writtenWordsCount, setWrittenWordsCount] = useState(0);
  const textareaRef = useRef(null);
  function gameStarted(event) {
    event.preventDefault();
    setIsStarted(true);
    setTimeRemaining(5);
    setText(null);
    textareaRef.current.disabled = false;
    setWrittenWordsCount(0);
    textareaRef.current.focus();
  }
  function gameFinished() {
    setIsStarted(false);
    setText("");
  }
  function textCounter(event) {
    setText(event.target.value);
    text &&
      setWrittenWordsCount(
        text
          .trim()
          .split(" ")
          .filter((word) => word !== "").length
      );
  }
  useEffect(() => {
    if (timeRemaining > 0 && isStarted) {
      setTimeout(() => setTimeRemaining((prev) => prev - 1), 1000);
    } else if (timeRemaining <= 0) {
      gameFinished();
    }
  }, [isStarted, timeRemaining]);
  return (
    <div>
      <h1>How Fast Do You Type?</h1>
      <textarea
        ref={textareaRef}
        onChange={textCounter}
        disabled={isStarted ? false : true}
        value={text ? text : " "}
      />
      <form>
        <h4>time remaining: {timeRemaining} </h4>
        <button onClick={gameStarted} disabled={isStarted ? true : false}>
          start
        </button>
      </form>
      <h3>
        type speed: {timeRemaining ? "???" : `${writtenWordsCount / 5}`}{" "}
        word/second{" "}
      </h3>
    </div>
  );
}
export default App;
