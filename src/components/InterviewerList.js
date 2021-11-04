import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList (props) {
  const {interviewers, value, onChange} = props;

  const output = interviewers.map(item => {
    return <InterviewerListItem 
            key={item.id} 
            name={item.name} 
            avatar={item.avatar}
            selected={item.id === value}
            setInterviewer={(onClick) => onChange(item.id)}
            />
  });
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list" >{output}</ul>
</section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};