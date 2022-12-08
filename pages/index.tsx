import Image from 'next/image'
import CustomSelector from './components/CustomSelector';
import Hero from './components/Hero';
import React, { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';

interface Gender {
  label: string
  value: string
}

interface Relation {
  label: string
  value: string
}

const genderOptions = [
  { label: 'female', value: 'Female' },
  { label: 'male', value:  'Male'},
  { label: 'Non-Binary', value:  'Non-Binary'},
]

const relationOptions = [
  { label: 'sister', value: 'Sister' },
  { label: 'brother', value:  'Brother'},
  { label: 'father', value:  'Father'},
  { label: 'mother', value:  'Mother'},
  { label: 'friend', value:  'Friend'},
  { label: 'partner', value:  'Partner'},
  { label: 'finance', value:  'Finance'},
  { label: 'wife', value:  'Wife'},
  { label: 'husband', value:  'Husband'},
  { label: 'neighbor', value:  'Neighbor'},
]

const Home: React.FC = () => {
  const [apiOutput, setApiOutput] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(genderOptions[0]);
  const [relation, setRelation] = useState<Relation>(relationOptions[0]);
  const [pronoun, setPronoun] = useState('');
  const [experience1, setExperience1] = useState('');
  const [experience2, setExperience2] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [res, setResponse] = useState<Record<string, unknown> | null>(
    null,
  );

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        gender: gender.value, 
        pronoun, 
        relation: relation.value,
        experience1,
        experience2,
        name,
      }),
    });

    if (response.ok) {
      setResponse({
        status: response.status,
        body: await response.json(),
        headers: {
          "X-Ratelimit-Limit": response.headers.get("X-Ratelimit-Limit"),
          "X-Ratelimit-Remaining": response.headers.get("X-Ratelimit-Remaining"),
          "X-Ratelimit-Reset": response.headers.get("X-Ratelimit-Reset"),
        },
      });
    } else {
      console.log(JSON.stringify(response.headers, null, 2));
      setResponse(null);

      alert(
        `Ratelimit reached, try again after ${
          new Date(
            parseInt(response.headers.get("X-RateLimit-Reset")!),
          ).toLocaleString()
        }`,
      );
    }

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedExperience = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setExperience1(event.target.value);
  };

  const onUserChangedExperience2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setExperience2(event.target.value);
  };

  const onUserOutputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApiOutput(event.target.value);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  useEffect(() => {
    switch(gender.value) {
      case "Male":
        setPronoun('his')
        break;
      case "Female":
        setPronoun('her')
        break;
      case "Non-binary":
        setPronoun("their")
        break;
      default:
        setPronoun("their")
    }
  }, [gender])

  return (
    <div className="bg-gray-500 w-full h-screen container mx-auto py-4">
        <Hero />
        <div className='flex gap-4 items-end justify-center py-4 px-4'>
          <CustomSelector gender={gender} onChange={setGender} options={genderOptions} label="Select Recipient Gender"/>          
          <CustomSelector gender={relation} onChange={setRelation} options={relationOptions} label="Relation to Recipient"/>          
          <div>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Recipient Name" 
            value={name}
            onChange={onNameChange}
            />
          </div>
        </div>
        <div>
        <div className="prompt-container py-4 px-2 gap-4 flex inline justify-center">
          <div>
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white py-2">Experience to include</label>
            <textarea 
            rows={2} 
            className="block p-2.5 w-full lg:w-96 text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="my trip to London, England"
            value={experience1}
            onChange={onUserChangedExperience}
            />
          </div>
          <div>
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white py-2">Experience to include</label>
            <textarea 
            rows={2} 
            className="block p-2.5 w-full lg:w-96 text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="late night zoom calls during covid"
            value={experience2}
            onChange={onUserChangedExperience2}
            />   
          </div>
        </div>
        <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
                <div className="flex justify-center items-center">
                  {isGenerating ? <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-500" role="status"></div> : <p>Generate</p>}
                </div>
            </a>
          </div>
          {apiOutput && (
            <div className="w-full container mx-auto py-4">
              <div className="output-content">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white py-2">Output</label>
                <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={apiOutput}
                onChange={onUserOutputChange}
                rows={10}
                />
              </div>
            </div>
          )}  
      </div>
    </div>
  )
}

export default Home;
