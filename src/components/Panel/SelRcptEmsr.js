import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import React, { memo, useEffect, useState } from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const SelRcptEmsr = memo((props) => {
    const { comboLabel, people, setPerson } = props

    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)

    const filteredPeople = (people && people.length > 0) ? (
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })
    ) : []

    const handleOnChange = (person) => {
        setSelectedPerson(person)
        setQuery('')
        setPerson(person)
    }

    useEffect(() => {
        const person = (people && people.length > 0) ? people[0] : null
        setSelectedPerson(person)
        setQuery('')
        setPerson(person)
    }, [people, setPerson])

    return (
        <div className='flex basis-96 justify-start'>
            <div
                className='flex justify-center items-center px-3 mr-px bg-indigo-600 text-indigo-50 text-sm font-medium rounded-l-md'
            >
                {comboLabel}
            </div>
            <div className='w-full min-w-min max-w-md'>
                <Combobox as="div" value={selectedPerson} onChange={handleOnChange} by="ruc">
                    <div className="relative">
                        <Combobox.Input
                            className="w-full rounded-r-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={(person) => person?.name}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>

                        {filteredPeople.length > 0 && (
                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.ruc}
                                        value={person}
                                        className={({ active }) =>
                                            classNames(
                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                            )
                                        }
                                    >
                                        {({ active, selected }) => (
                                            <>
                                                <div className="flex text-xs">
                                                    <span className={classNames('truncate', selected && 'font-semibold')}>{person.name}</span>
                                                    <span
                                                        className={classNames(
                                                            'ml-2 truncate text-gray-500',
                                                            active ? 'text-indigo-200' : 'text-gray-500'
                                                        )}
                                                    >
                                                        {person.ruc}
                                                    </span>
                                                </div>

                                                {selected && (
                                                    <span
                                                        className={classNames(
                                                            'absolute inset-y-0 right-0 flex items-center pr-4',
                                                            active ? 'text-white' : 'text-indigo-600'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        )}
                    </div>
                </Combobox>
            </div>
        </div>
    )
})
