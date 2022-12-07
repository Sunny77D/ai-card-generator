import React, { useState } from 'react';
import { Listbox } from '@headlessui/react'

interface CustomSelectorProps {
    gender: {value: string, label:string }
    onChange?: (value: any) => void
    options: {label: string, value: string}[]
    label: string
}

export const CustomSelector: React.FunctionComponent<CustomSelectorProps> = props => {
    return(
        <Listbox value={props.gender} onChange={props.onChange}>
        <Listbox.Button className="border-green">{props.gender.value}</Listbox.Button>
        <Listbox.Options>
            {props.options.filter(option => option.label !== 'default').map((option) => 
                <Listbox.Option
                    key={option.label}
                    value={option}
                >
                {option.value}
                </Listbox.Option>
            )}
        </Listbox.Options>
        </Listbox>
    );
};

