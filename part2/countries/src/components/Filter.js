import React from 'react'

const Filter = ({filter, handleFilterChange}) => {
    return (
        <p>
            Find countries
            <input 
            value={filter} 
            onChange={handleFilterChange}>
            </input>
        </p>
    )
}

export default Filter