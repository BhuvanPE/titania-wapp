import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

const receptor = [
    { name: 'NEOTEC CORPORATION S.A.C.', username: 'RUC:20562986651', ruc: '20562986651' },
    { name: 'INCIMMET S.A.', username: 'RUC:20147960612', ruc: '20147960612' },
]

const emisor = [
    { name: 'PALOMINO DIAZ NORKA SOLEDAD', username: 'RUC:10198488955', ruc: '10198488955' },
    { name: 'LUBRICACION Y TECNOLOGIA S.A.C.', username: 'RUC:20602951422', ruc: '20602951422' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const SelRcptEmsr = () => {
    const [queryRcpt, setQueryRcpt] = useState('')
    const [selectedRcpt, setSelectedRcpt] = useState()

    const [queryEmsr, setQueryEmsr] = useState('')
    const [selectedEmsr, setSelectedEmsr] = useState()

    const filteredReceptor =
        queryRcpt === ''
            ? receptor
            : receptor.filter((rcpt) => {
                return rcpt.name.toLowerCase().includes(queryRcpt.toLowerCase())
            })

    const filteredEmisor =
        queryEmsr === ''
            ? emisor
            : emisor.filter((emsr) => {
                return emsr.name.toLowerCase().includes(queryEmsr.toLowerCase())
            })

    const handleOnChangeRcpt = (rcpt) => {
        setSelectedRcpt(rcpt)
        setQueryRcpt('')
    }

    const handleOnChangeEmsr = (emsr) => {
        setSelectedEmsr(emsr)
        setQueryEmsr('')
    }

    return (
        <div className='flex flex-auto space-x-4'>
            <div className='w-1/2 max-w-md'>
                <Combobox as="div" value={selectedRcpt} onChange={handleOnChangeRcpt}>
                    <Combobox.Label className="block text-xs font-medium text-gray-700">Receptor</Combobox.Label>
                    <div className="relative mt-1">
                        <Combobox.Input
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => setQueryRcpt(event.target.value)}
                            displayValue={(rcpt) => rcpt?.name}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>

                        {filteredReceptor.length > 0 && (
                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredReceptor.map((rcpt) => (
                                    <Combobox.Option
                                        key={rcpt.username}
                                        value={rcpt}
                                        className={({ active }) =>
                                            classNames(
                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                            )
                                        }
                                    >
                                        {({ active, selected }) => (
                                            <>
                                                <div className="flex">
                                                    <span className={classNames('truncate', selected && 'font-semibold')}>{rcpt.name}</span>
                                                    <span
                                                        className={classNames(
                                                            'ml-2 truncate text-gray-500',
                                                            active ? 'text-indigo-200' : 'text-gray-500'
                                                        )}
                                                    >
                                                        {rcpt.username}
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
            <div className='w-1/2 max-w-md'>
                <Combobox as="div" value={selectedEmsr} onChange={handleOnChangeEmsr}>
                    <Combobox.Label className="block text-xs font-medium text-gray-700">Emisor</Combobox.Label>
                    <div className="relative mt-1">
                        <Combobox.Input
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => setQueryEmsr(event.target.value)}
                            displayValue={(emsr) => emsr?.name}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>

                        {filteredEmisor.length > 0 && (
                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredEmisor.map((emsr) => (
                                    <Combobox.Option
                                        key={emsr.username}
                                        value={emsr}
                                        className={({ active }) =>
                                            classNames(
                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                            )
                                        }
                                    >
                                        {({ active, selected }) => (
                                            <>
                                                <div className="flex">
                                                    <span className={classNames('truncate', selected && 'font-semibold')}>{emsr.name}</span>
                                                    <span
                                                        className={classNames(
                                                            'ml-2 truncate text-gray-500',
                                                            active ? 'text-indigo-200' : 'text-gray-500'
                                                        )}
                                                    >
                                                        {emsr.username}
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
}
