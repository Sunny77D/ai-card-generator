import Image from 'next/image'
import CustomSelector from '../components/CustomSelector';
import Hero from '../components/Hero';
import React, { useEffect, useState } from 'react';
import CustomTextInput from '../components/CustomTextInput';

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
  { label: 'fiance', value:  'Fiancé'},
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
    <div>
        <Image 
        src="/images/v1062-103.jpg"
        alt="Christmas Background."
        fill={true}
        className="absolute -z-10"
        />
        <div className="w-full h-screen container mx-auto py-4 z-10">
        <Hero />
        <div className='flex gap-6 items-end justify-center py-4 px-4'>
          <CustomSelector curOption={gender} onChange={setGender} options={genderOptions} label="Select Recipient Gender"/>          
          <CustomSelector curOption={relation} onChange={setRelation} options={relationOptions} label="Relation to Recipient"/>          
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
        <div className="prompt-container py-4 px-2 gap-6 flex inline justify-center">
          <CustomTextInput userInput={experience1} onChange={onUserChangedExperience}/>
          <CustomTextInput userInput={experience2} onChange={onUserChangedExperience2}/>
        </div>
        <div className="flex items-center justify-center">
            <button type="button" className="bg-green-500 flex inline rounded-md p-2 items-center" onClick={callGenerateEndpoint}>
                  {
                  isGenerating ? 
                    <svg aria-hidden="true" className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg> 
                    : <></>
                  }
                  <p>Generate</p>
            </button>
          </div>
          {apiOutput && (
            <div className="w-full p-4 container mx-auto py-4">  
              <label className="font-lobster block mb-2 text-xl font-medium text-gray-900 dark:text-white py-2">Your Christmas Card</label>
                <textarea
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={apiOutput}
                onChange={onUserOutputChange}
                rows={10}
                />
            </div>
          )}  
      </div>
      <div>
        <a 
        className='text-xs absolute bottom-0 right-0'
        href="https://www.freepik.com/free-vector/green-christmas-background-aesthetic-pine-trees-doodle-vector_20171145.htm#query=christmas%20background&position=10&from_view=keyword">
          Image by rawpixel.com on Freepik
        </a> 
      </div>
      </div>
    </div>
  )
}

export default Home;
