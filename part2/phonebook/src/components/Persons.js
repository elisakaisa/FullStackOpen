import React from 'react'


const Persons = ({numbers}) => {
    return (
        <div>
        {numbers.map((number) =>
            <div key={number.name}>{number.name} {number.number}</div>)}
        </div>
    )
}

export default Persons