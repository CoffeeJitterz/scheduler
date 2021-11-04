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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, { interview }).then(() => {
        axios.get(`/api/days`).then((res) => {
          console.log("days", res.data);
          setState({
            ...state,
            appointments,
            days: res.data,
          });
            resolve();
        });
      });
    });
  };

  const deleteInterview = (id) => {
    console.log("DELETE INTERVIEW", id, state);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`).then(() => {
        axios.get(`/api/days`).then((res) => {
          setState({
            ...state,
            appointments,
            days: res.data,
          });
            resolve();
        });
        console.log("APPOINTMENT", appointment, "DAY", state.days);
      });
    });
  };

  return { state, setDay, deleteInterview, bookInterview };
}
