import React, { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    if(replace) {
      console.log("History", history)
      let newHistory = [...history];
      console.log("New History", newHistory)
      newHistory.splice([newHistory.length], 1, newMode)
      console.log("Splice New History", newHistory)
      setHistory(newHistory)
      console.log("History", history)
      setMode(newMode)
    } else {
      console.log(history)
      setHistory((prev) => [...prev, newMode])
      console.log("New History", history)
      setMode(newMode)
      console.log("New Mode", mode)
    };
    
  }
  function back() { 
    if(history.length>1){
      console.log(history)
      const newHistory = [...history];
      newHistory.pop()
      console.log("New History", newHistory)
      setMode(newHistory[newHistory.length-1])
      console.log("New Mode", mode)
      setHistory(newHistory)
      console.log("History", history)
    }
   }

  return { mode, transition, back, history };
};

