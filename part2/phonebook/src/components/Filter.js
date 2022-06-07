import React from 'react'

const Filter = ({filter, handleFilterChange}) => {
    return (
        <p>
            Filter with
            <input 
            value={filter} 
            onChange={handleFilterChange}>
            </input>
        </p>
    )
}

export default Filter