import { Spin, Table } from 'antd'
import moment from 'moment'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useAxiosLogin } from '../../hooks/useAxiosLogin'
import { notifyType } from '../../types/notifyType'
import { getError } from '../../utils/apiUtil'
import { NotifyRed } from '../Msg/NotifyRed'

const rcColumns = [
    {
        title: 'Nº Ingreso',
        dataIndex: 'numRE',
    },
    {
        title: 'Fecha',
        dataIndex: 'fechaReciboF',
        width: 120,
    },
    {
        title: 'Doc. Proveedor',
        dataIndex: 'numDocProv',
        width: 160,
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        width: 140,
    },
    {
        title: 'Total',
        dataIndex: 'totalF',
        width: 130,
        align: 'right',
    },
]

export const ListRcpCpe = memo((props) => {
    const { record, selectedRcpt, selectedEmsr } = props
    const axiosPrivateAPI = useAxiosLogin()
    const notifyRedRef = useRef()
    const [loadPage, setLoadPage] = useState(true)
    const [receipts, setReceipts] = useState([])

    useEffect(() => {
        let isMounted = true

        const busqNumCpe = async () => {
            let err = null
            let data = null

            const endpoint = 'lo/rcp'
            const url = `/${endpoint}?receptorID=${selectedRcpt.ruc}&emisorID=${selectedEmsr.ruc}&numOC=${record.numOC}`
            try {
                const resp = await axiosPrivateAPI.get(url)
                data = resp?.data
            } catch (error) {
                err = getError(error)
            }
            if (data && isMounted) {
                const { success, data: rcs } = data
                if (success) {
                    const options = { style: 'currency', currency: 'USD' };
                    const numberFormat = new Intl.NumberFormat('en-US', options);
                    setReceipts(rcs.map(rc => {
                        const totalFormat = numberFormat.format(rc.total)
                        return {
                            ...rc,
                            key: rc.numRE,
                            fechaReciboF: moment(rc.fechaRecibo).format('DD/MM/yyyy'),
                            totalF: totalFormat.substring(1, totalFormat.length - 1)
                        }
                    }))
                }
                else
                    setReceipts([])
            }
            if (err)
                notifyRedRef.current.handleOpen(err, notifyType.error)
            setLoadPage(false)
        }

        busqNumCpe()

        return () => {
            isMounted = false
        }
    }, [axiosPrivateAPI, record, selectedRcpt, selectedEmsr])

    return (
        <>
            <NotifyRed ref={notifyRedRef} />
            {
                loadPage &&
                <div className='my-5 flex justify-center'>
                    <Spin tip='Loading....' />
                </div>
            }
            {
                !loadPage &&
                <div className='m-1'>
                    <p className='mb-2 text-xs text-gray-700'>
                        Seleccione una recepción y registre un comprobante de pago.
                    </p>
                    <Table columns={rcColumns} dataSource={receipts} pagination={false} bordered />
                </div>
            }
        </>
    )
})
