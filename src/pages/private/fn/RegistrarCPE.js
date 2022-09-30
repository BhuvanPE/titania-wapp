import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Tooltip } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NotifyYellow } from '../../../components/Msg/NotifyYellow'
import { Loading } from '../../../components/Panel/Loading'
import { SelRcptEmsr } from '../../../components/Panel/SelRcptEmsr'
import { useAxiosLogin } from '../../../hooks/useAxiosLogin'
import { notifyType } from '../../../types/notifyType'
import { getError } from '../../../utils/apiUtil'

import './RegistrarCPE.css'

export const RegistrarCPE = () => {
  const axiosPrivateAPI = useAxiosLogin()
  const notifyRef = useRef()
  const [loadPage, setLoadPage] = useState(true)
  const [rcpt, setRcpt] = useState([])
  const [emsr, setEmsr] = useState([])
  const [selectedRcpt, setSelectedRcpt] = useState(null)
  const [selectedEmsr, setSelectedEmsr] = useState(null)
  const [foFechaIni, setFoFechaIni] = useState(null)
  const [foFechaFin, setFoFechaFin] = useState(null)
  const [, setFoNumDocumento] = useState(null)

  useEffect(() => {
    let isMounted = true

    const rcptEmsr = async () => {
      let err = null
      let data = null

      const endpoint = 'lo/lgn/rcptEmsr'
      const url = `/${endpoint}`
      try {
        const resp = await axiosPrivateAPI.get(url)
        data = resp?.data
      } catch (error) {
        err = getError(error)
        console.log(error)
      }
      if (data)
        isMounted && setRcpt(data.rcptEmsr)
      if (err)
        notifyRef.current.handleOpen(err, notifyType.error)
      setLoadPage(false)
    }

    rcptEmsr()

    return () => {
      isMounted = false
    }
  }, [axiosPrivateAPI])

  const handleSelectRcpt = useCallback((person) => {
    setSelectedRcpt(person)
    setEmsr(person?.emsr ? person.emsr : [])
  }, [setSelectedRcpt])

  const handleSelectEmsr = useCallback((person) => {
    setSelectedEmsr(person)
  }, [setSelectedEmsr])

  const handleBuscarOC = () => {
    let err = null

    if (!selectedRcpt || !selectedEmsr || !foFechaIni || !foFechaFin || true)
      err = {
        message: 'Próximamente!',
        oops: false
      }

    if (err)
      notifyRef.current.handleOpen(err, notifyType.success)
  }

  return (
    <>
      <NotifyYellow ref={notifyRef} />
      {
        loadPage &&
        <div className='mt-5 flex justify-center'>
          <Loading w='w-8' h='h-8' />
        </div>
      }
      {
        !loadPage &&
        <>
          <div className='flex justify-start space-x-4 px-3'>
            <SelRcptEmsr comboLabel="Receptor" people={rcpt} setPerson={handleSelectRcpt} />
            <SelRcptEmsr comboLabel="Emisor" people={emsr} setPerson={handleSelectEmsr} />
          </div>
          <div className='bg-white mt-3 p-3 rounded-md'>
            <p className="text-xs text-gray-700 mb-2">
              Busca una orden de compra usando los filtros de fecha de emisión y número de documento.
            </p>
            <div className='wapp-filtro flex space-x-2'>
              <DatePicker placeholder='Fecha inicio' onChange={(d,) => setFoFechaIni(d?.toDate() ?? null)} />
              <DatePicker placeholder='Fecha fin' onChange={(d,) => setFoFechaFin(d?.toDate() ?? null)} />
              <Input placeholder="Nº de documento" onChange={(e) => setFoNumDocumento(e.target.value)} />
              <Tooltip title="Buscar orden de compra">
                <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={handleBuscarOC} />
              </Tooltip>
            </div>
          </div>
        </>
      }
    </>
  )
}
