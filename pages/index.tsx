import Head from 'next/head'
import Image from 'next/image'
import Hero from './components/Hero'

import React, { useState } from 'react';

const Home: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  
  return (
    <div className="bg-gray-500 w-full container mx-auto">
      <div className="header">
        <div className="header-title ">
            <h1>Card Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Create the Perfect Card</h2>
          </div>
          <div>
          <div className="prompt-container">
            <textarea
              className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="start typing here"
              value={userInput}
              onChange={onUserChangedText}
            />
            <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
                <div className="flex justify-center items-center">
                  {isGenerating ? <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-500" role="status"></div> : <p>Generate</p>}
                </div>
            </a>
            </div>
            {apiOutput && (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>Output</h3>
                  </div>
                </div>
                <div className="output-content">
                  <p>{apiOutput}</p>
                </div>
              </div>
            )}          
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
