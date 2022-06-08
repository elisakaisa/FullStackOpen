import React from 'react'


const Persons = ({numbers, deleteName}) => {
// TODO fix

    return (
        <div>
        {numbers.map((number) =>
            <div key={number.id}>
                {number.name} {number.number} <button onClick={() => deleteName(number.id)}>delete</button>
            </div>)}
        </div>
    )
}

export default Persons