"use client";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [num, setNum] = useState(0);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const updateNum = (newNum) => {
    if (newNum >= 0 && newNum <= 150) {
      setHistory([...history, num]);
      setNum(newNum);
      setFuture([]);
    }
  };

  const add = () => updateNum(num + 1);
  const subtract = () => updateNum(num - 1);

  const undo = () => {
    if (history.length > 0) {
      const lastNum = history.pop();
      setFuture([num, ...future]);
      setNum(lastNum);
      setHistory([...history]);
    }
  };

  const redo = () => {
    if (future.length > 0) {
      const nextNum = future.shift();
      setHistory([...history, num]);
      setNum(nextNum);
      setFuture([...future]);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Jarurat Care</h1>
        <h1>Counter: {num}</h1>
        <div className={styles.buttonContainer}>
          <button onClick={subtract} disabled={num <= 0}>
            -1
          </button>
          <button onClick={add} disabled={num >= 150}>
            +1
          </button>
        </div>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${(num / 150) * 100}%` }}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={undo} disabled={history.length === 0}>
            Undo
          </button>
          <button onClick={redo} disabled={future.length === 0}>
            Redo
          </button>
        </div>
      </div>
    </>
  );
}
