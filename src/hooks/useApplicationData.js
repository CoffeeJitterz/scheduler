import React, { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const bookInterview = (id, interview) => {

      return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: {...interview},
        };
    
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
          const interviewDay = state.days.findIndex((day) => 
            day.appointments.includes(id)
          )
          console.log(interviewDay)
  
          const day = {...state.days[interviewDay], spots: state.days[interviewDay].spots-1}
          const days = [...state.days]
          days.splice(interviewDay, 1, day)
          setState({...state, appointments, days})     
          console.log(state)         
        })
      
    
  };

  const deleteInterview = (id) => {
    console.log("DELETE INTERVIEW", id, state);
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      console.log(state)
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      const interviewDay = state.days.findIndex((day) => 
      day.appointments.includes(id)
    )

        const day = {...state.days[interviewDay], spots: state.days[interviewDay].spots+1}
        const days = [...state.days]
        days.splice(interviewDay, 1, day)
        setState({...state, appointments, days})     
        console.log(state)         
      });
  };

  return { state, setDay, deleteInterview, bookInterview };
}
