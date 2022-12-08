import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image'; 
import React from 'react';



const GeneratePage: NextPage = () => {
    const router = useRouter();

    const {
        query: {name, apiOutput},
    } = router;

    const props = {
        name, 
        apiOutput
    };

    return (
        <div>
            <Image 
            src="/images/v1062-103.jpg"
            alt="Christmas Background."
            fill={true}
            className="absolute -z-10"
            />
            <label className="font-lobster block mb-2 text-xl font-medium text-gray-900 dark:text-white py-2">Your Christmas Card</label>
            <textarea
            className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={props.apiOutput}
            rows={10}
            />
        </div>
    )
}

export default GeneratePage;
