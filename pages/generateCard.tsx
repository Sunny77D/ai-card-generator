import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image'; 
import React, { useEffect, useState } from 'react';
import CustomTextInput from '../components/CustomTextInput';



const GeneratePage: NextPage = () => {
    const router = useRouter();

    const [userCard, setUserCard] = useState('');
    const [repName, setRepName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cardType, setCardType] = useState(0)

    const {
        query: {name, apiOutput},
    } = router;

    const props = {
        name, 
        apiOutput
    };

    useEffect(() => {
        typeof apiOutput === "string" ? setUserCard(apiOutput) : setUserCard('');
        typeof name === "string" ? setRepName(name) : setRepName('');

    }, [apiOutput, name])

    const onUserCardChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserCard(event.target.value);
    };

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepName(event.target.value)
    }

    const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStreetAddress(event.target.value)
    }

    const onCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value)
    }

    const onPostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostalCode(event.target.value)
    }

    return (
        <div>
            <Image 
            src="/images/v1062-103.jpg"
            alt="Christmas Background."
            fill
            className="bg-repeat-y absolute -z-10"
            />
            <div className="w-full h-screen container mx-auto py-4 z-10">
                <CustomTextInput
                rowNumber={10}
                label="Your Christmas Message"
                userInput={userCard}
                onChange={onUserCardChange}
                />
                <div className="text-center">
                    <h2 className="py-4 text-2xl font-lobster text-green-600">Select Your Card</h2>
                </div>
                <div className='grid w-full gap-3 place-items-center pb-8 md:grid-cols-1 lg:grid-cols-3 py-4'>
                    <Image 
                    alt="Card Option 1" 
                    src ="/images/card1.jpg" 
                    onClick={(e) => setCardType(1)}                  
                    width={400}
                    height={400}
                    className={cardType === 1 ? `border-blue-500 border-4` : `hover:border-green-500 hover:border-4`}
                    objectFit="cover"/>
                    <Image 
                    alt="Card Option 2" 
                    src ="/images/card1.jpg" 
                    onClick={(e) => setCardType(2)}                  
                    width={400}
                    height={400}
                    className={cardType === 2 ? `border-blue-500 border-4` : `hover:border-green-500 hover:border-4`}
                    objectFit="cover"/>
                    <Image 
                    alt="Card Option 3" 
                    src ="/images/card1.jpg" 
                    onClick={(e) => {setCardType(3); console.log(cardType); }}                  
                    width={400}
                    height={400}
                    className={cardType === 3 ? `border-blue-500 border-4` : `hover:border-green-500 hover:border-4`}
                    objectFit="cover"/>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-lobster text-green-600">Additional Recipient Information</h2>
                </div>
                <div className='flex gap-6 items-end justify-center py-4 px-4'>
                    <div>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Recipient's Name" 
                        value={repName}
                        onChange={onNameChange}
                        />
                    </div>
                    <div>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Street Address" 
                        value={streetAddress}
                        onChange={onAddressChange}
                        /> 
                    </div>
                    <div>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="City" 
                        value={city}
                        onChange={onCityChange}
                        /> 
                    </div>
                    <div>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Post Code" 
                        value={postalCode}
                        onChange={onPostalChange}
                        /> 
                    </div>
                    <div>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="United Kingdom" 
                        disabled={true}
                        /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneratePage;
