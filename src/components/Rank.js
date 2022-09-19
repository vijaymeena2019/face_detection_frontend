import React from 'react';



function Rank(props) {
    const { id, name, email, joined, entries } = props.user
    return (
        <div>
            <div className='white f3'>
                {`${name}, Your Searched Picture Count `}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank;