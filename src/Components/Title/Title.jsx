import React from 'react'
import './Title.css'

const Title = (props) => {
    return (
        <div className='title'>
            <h1>{props.subTitle}</h1>
            <p>{props.title}</p>
        </div>
    )
}

export default Title