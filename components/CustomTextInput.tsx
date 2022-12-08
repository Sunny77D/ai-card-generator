import React from 'react';

interface CustomTextInputProps {
    userInput: string
    onChange: (value: any) => void
}


const CustomTextInput: React.FunctionComponent<CustomTextInputProps> = ({userInput, onChange}) => {
    return (
        <div>
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white py-2">Experience to include</label>
            <textarea 
            rows={2} 
            className="resize-none block p-2.5 w-full lg:w-96 text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="late night zoom calls during covid"
            value={userInput}
            onChange={onChange}
            />   
        </div>
    )
};

export default CustomTextInput;