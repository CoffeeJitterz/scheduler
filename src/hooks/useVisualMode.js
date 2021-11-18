import React, { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    if(replace) {
      let newHistory = [...history];
      newHistory.splice([newHistory.length-1], 1, newMode)
      setHistory(newHistory)
      setMode(newMode)
    } else {
      setHistory((prev) => [...prev, newMode])
      setMode(newMode)
    };
    
  }
  function back() { 
    if(history.length>1){
      const newHistory = [...history];
      newHistory.pop()
      setMode(newHistory[newHistory.length-1])
      setHistory(newHistory)
    }
   }

  return { mode, transition, back, history };
};

