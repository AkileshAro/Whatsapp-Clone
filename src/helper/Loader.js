import React from 'react'
import './Loader.scss';

function Loader() {
    return (
        <div className='loader'>
            <h1 className='croom'>Croom</h1>
            <h1 className='dots' id='uno'>.</h1>
            <h1 className='dots' id='dos'>.</h1>
            <h1 className='dots' id='tres'>.</h1>
        </div>
    )
}

export default Loader
