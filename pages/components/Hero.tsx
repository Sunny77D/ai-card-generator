import React, { useState } from 'react';
import { render } from 'react-dom';

const Hero: React.FC = () => {
    return(
        <div>
            <div className="header-title text-center">
                <h1 className='text-7xl font-lobster bold'>Christmas Mircale</h1>
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-lobster">The perfect Christmas in minutes</h2>
                <h2 className="text-xl">Just fill out the form to get started and click generate! We&apos;ll handle the rest.</h2>
            </div>
        </div>
    )
}

export default Hero;