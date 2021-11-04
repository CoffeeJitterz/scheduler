import React, { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);
  
  function transition(newMode, replace = false) {
    if(replace) {
      setMode(newMode)
    } else {
      setHistory([mode, ...history])
      setMode(newMode)
    };
    
  }
  function back() { 
    if(history.length>0){
      const [newMode, ...newHistory] = history; 
      setMode(newMode)
      setHistory([...newHistory])
    }
   }

  return { mode, transition, back };
};

