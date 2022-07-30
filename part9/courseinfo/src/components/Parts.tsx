import React from "react";

import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
        switch(part.name) {
            case "Fundamentals":
              return (
                <p key={part.name}>
                  <b>{part.name}</b> {part.exerciseCount}<br />
                  <i>{part.description}</i>
                </p>
              );
            case "Advanced":
                return (
                    <p key={part.name}>
                  <b>{part.name}</b> {part.exerciseCount}<br />
                  <i>{part.description}</i>
                </p>
                );
            case "Using props to pass data":
              return (
                <p key={part.name}>
                  <b>{part.name}</b> {part.exerciseCount}<br /> 
                  project exercises {part.groupProjectCount}
                </p>
              );
            case "Deeper type usage":
              return (
                <p key={part.name}>
                  <b>{part.name}</b> {part.exerciseCount}<br />
                  <i>{part.description}</i><br />
                  <a href={part.exerciseSubmissionLink}>Submission Link</a>
                </p>
              );
            case "Backend development":
              return (
                <p key={part.name}>
                  <b>{part.name}</b> {part.exerciseCount}<br />
                  <i>{part.description}</i><br />
                  Requirements: {part.requirements[0]}, {part.requirements[1]}
                </p>
              );
            default:
              return assertNever(part);
          }
    //})
  
};

export default Part; 