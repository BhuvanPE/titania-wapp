import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react'
import { Breadcrumb } from '../../../components/Panel/Breadcrumb'
import { SelRcptEmsr } from '../../../components/Panel/SelRcptEmsr'

const people = [
    { name: 'OC202200000001', title: '01-09-2022', email: 'REGISTRADA', role: '20,000.00', moneda: 'USD' },
    { name: 'OC202200000002', title: '03-09-2022', email: 'REGISTRADA', role: '1,100.00', moneda: 'PEN' },
    { name: 'OC202200000003', title: '03-09-2022', email: 'REGISTRADA', role: '5,000.00', moneda: 'USD' },
]

export const pageName = 'Registrar CPE'

export const RegistrarCPE = () => {
    const [fechaIni, setFechaIni] = useState(null)
    const [fechaFin, setFechaFin] = useState(null)

    return (
        <>
            <Breadcrumb pageName={pageName} />
            <div className='mt-4'>
                <SelRcptEmsr />
            </div>
            <div className='mt-5'>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Busque la orden de compra vínculada a su comprobante de pago.
                </p>
            </div>
            <div className='mt-4'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className='flex flex-auto space-x-4'>
                        <DatePicker
                            label="Emitida desde"
                            value={fechaIni}
                            onChange={(newValue) => {
                                setFechaIni(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            ampm={undefined}
                        />
                        <DatePicker
                            label="Emitida hasta"
                            value={fechaFin}
                            onChange={(newValue) => {
                                setFechaFin(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            ampm={undefined}
                        />
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                Nº orden de compra
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                className='mt-1 p-1 border-solid border border-gray-400 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </LocalizationProvider>
            </div>

            <div className="-mx-4 mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Nº orden de compra
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Fecha de emisión
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Estado
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Moneda
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                Importe
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {people.map((person) => (
                            <tr key={person.name}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                    {person.name}
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">Title</dt>
                                        <dd className="mt-1 truncate text-gray-700">{person.title}</dd>
                                        <dt className="sr-only sm:hidden">Email</dt>
                                        <dd className="mt-1 truncate text-gray-500 sm:hidden">{person.email}</dd>
                                    </dl>
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{person.title}</td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.email}</td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.moneda}</td>
                                <td className="px-3 py-4 text-right text-sm text-gray-500">{person.role}</td>
                                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="/" className="text-indigo-600 hover:text-indigo-900">
                                        Ver<span className="sr-only">, {person.name}</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-1 flex items-center justify-between bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="/"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="/"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">1</span> a <span className="font-medium">10</span> de{' '}
                            <span className="font-medium">97</span> resultados
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                                href="/"
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                            <a
                                href="/"
                                aria-current="page"
                                className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                            >
                                1
                            </a>
                            <a
                                href="/"
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                2
                            </a>
                            <a
                                href="/"
                                className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                            >
                                3
                            </a>
                            <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                                ...
                            </span>
                            <a
                                href="/"
                                className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                            >
                                8
                            </a>
                            <a
                                href="/"
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                9
                            </a>
                            <a
                                href="/"
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                10
                            </a>
                            <a
                                href="/"
                                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
