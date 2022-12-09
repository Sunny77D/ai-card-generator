import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image'; 
import React, { useEffect, useState } from 'react';
import CustomTextInput from '../components/CustomTextInput';



const GeneratePage: NextPage = () => {
    const router = useRouter();

    const [userCard, setUserCard] = useState('');

    const {
        query: {name, apiOutput},
    } = router;

    const props = {
        name, 
        apiOutput
    };

    useEffect(() => {
        typeof apiOutput === "string" ? setUserCard(apiOutput) : setUserCard('');
    }, [apiOutput])

    const onUserCardChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserCard(event.target.value);
    };

    return (
        <div>
            <Image 
            src="/images/v1062-103.jpg"
            alt="Christmas Background."
            fill={true}
            className="absolute -z-10"
            />
            <div className="w-full h-screen container mx-auto py-4 z-10">
                <CustomTextInput
                rowNumber={10}
                label="Your Christmas Card"
                userInput={userCard}
                onChange={onUserCardChange}
                />
            </div>
        </div>
    )
}

export default GeneratePage;
