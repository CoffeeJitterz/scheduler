export function getAppointmentsForDay(state, day) {
  const result = [];
  if(state.days){
    for(let y = 0; y < state.days.length; y++){
      if(state.days[y].name === day){
        for (let i = 0; i < state.days[y].appointments.length; i++){
            result.push(state.appointments[state.days[y].appointments[i]])
        }
      }
    }
  } else {
    return [];
  }
  return result;
}

export function getInterview(state, interview) {
  let result;
  if(!interview) {

   result = null;
  } else {
    const interviewObj = {};
    interviewObj.student = interview.student;
    const interviewers = state.interviewers;
    interviewObj.interviewer = interviewers[`${interview.interviewer}`]
    
    result = interviewObj; 
  }
  return result;
  }

  export function getInterviewersForDay(state, day) {
    const result = [];
    state.days.forEach(item => {
      if(item.name === day){
        item.interviewers.forEach(interviewerId => {
          result.push(state.interviewers[`${interviewerId}`])
        })
      }
    })
    return result;
  }