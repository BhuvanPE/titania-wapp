import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react'
import { Breadcrumb } from '../../../components/Panel/Breadcrumb'
import { SelRcptEmsr } from '../../../components/Panel/SelRcptEmsr'

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
        </>
    )
}
