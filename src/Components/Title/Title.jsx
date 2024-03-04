import React from 'react'
import './Title.css'

const Title = (props) => {
    return (
        <div className='title'>
            <h2>{props.subTitle}</h2>
            <p>{props.title}</p>
        </div>
    )
}

export default Title