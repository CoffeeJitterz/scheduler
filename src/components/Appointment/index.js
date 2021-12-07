import React, { useEffect } from "react";

import "components/Appointment/styles.scss";
import { useVisualMode } from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const { time, interview, id, interviewers} = props;

  

  const Delete = () => {
    transition(DELETING, true)
    props.deleteInterview(id, interview)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETING, true))
  };
  const save = (name, interviewer) => {

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVING, true))
  }
  const edit = (name, interviewer) => {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.editInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVING, true))
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_DELETING = "ERROR_DELETING";
  const ERROR_SAVING = "ERROR_SAVING";

  const { mode, transition, back, history } = useVisualMode(interview ? SHOW : EMPTY);
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === SHOW && interview && (
        <Show student={interview.student} interviewer={interview.interviewer} onEdit={() => {transition(EDIT)}} onDelete={() => transition(CONFIRMING)}/>
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={save} onCancel={() => transition(EMPTY)}/>
      )}
      {mode === EDIT && (
        <Form student={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onSave={edit} onCancel={() => transition(SHOW)}/>
      )}
      {mode === SAVING && (
        <Status message={"SAVING"}/>
      )}
      {mode === DELETING && (
        <Status message={"DELETING"}/>
      )}
       {mode === CONFIRMING && (
        <Confirm message="Delete the appointment?" onConfirm={Delete} onCancel={() => transition(SHOW)}/>
      )}
       {mode === ERROR_DELETING && (
        <Error message="Could not delete appointment" onClose={() => transition(SHOW)}/>
      )}
         {mode === ERROR_SAVING && (
        <Error message="Could not save appointment" onClose={back}/>
      )}
    </article>
  );
}

