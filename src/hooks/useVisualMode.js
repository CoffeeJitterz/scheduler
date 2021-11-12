import React, { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    if(replace) {
      const newHistory = [...history];
      newHistory.splice([newHistory.length-1], 1, newMode)
      setHistory(newHistory)
      setMode(newMode)
    } else {
      setHistory((prev) => [...prev, newMode])
      setMode(newMode)
    };
    
  }
  function back() { 
    console.log(history);
    if(history.length>1){
      const newHistory = [...history];
      newHistory.pop()
      setMode(newHistory[newHistory.length-1])
      setHistory(newHistory)
    }
   }

  return { mode, transition, back };
};

