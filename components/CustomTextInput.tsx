import React from 'react';

interface CustomTextInputProps {
    userInput: string | string[] | undefined
    label: string
    onChange: (value: any) => void
    rowNumber: number
}


const CustomTextInput: React.FunctionComponent<CustomTextInputProps> = ({userInput, onChange, rowNumber, label}) => {
    return (
        <div>
            <label className="block mb-2 font-lobster text-lg font-medium text-red-600 dark:text-red py-2">{label}</label>
            <textarea 
            rows={rowNumber} 
            className="resize-none block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="late night zoom calls during covid"
            value={userInput}
            onChange={onChange}
            />   
        </div>
    )
};

export default CustomTextInput;