import React from 'react';
import { CoursePart } from '../types';

const Total = ({courseParts}:{courseParts: CoursePart[]}) => {
    return (
        <div>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
}

export default Total;