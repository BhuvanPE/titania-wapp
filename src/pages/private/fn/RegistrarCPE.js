import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Switch, Tooltip } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NotifyRed } from '../../../components/Msg/NotifyRed'
import { NotifyYellow } from '../../../components/Msg/NotifyYellow'
import { Loading } from '../../../components/Panel/Loading'
import { SelRcptEmsr } from '../../../components/Panel/SelRcptEmsr'
import { useAxiosLogin } from '../../../hooks/useAxiosLogin'
import { msgType } from '../../../types/msgType'
import { notifyType } from '../../../types/notifyType'
import { getError } from '../../../utils/apiUtil'

import './RegistrarCPE.css'

export const RegistrarCPE = () => {
  const axiosPrivateAPI = useAxiosLogin()
  const notifyRedRef = useRef()
  const notifyYellowRef = useRef()
  const [loadPage, setLoadPage] = useState(true)
  const [rcpt, setRcpt] = useState([])
  const [emsr, setEmsr] = useState([])
  const [selectedRcpt, setSelectedRcpt] = useState(null)
  const [selectedEmsr, setSelectedEmsr] = useState(null)
  const [foFechaIni, setFoFechaIni] = useState(null)
  const [foFechaFin, setFoFechaFin] = useState(null)
  const [foPendiente, setFoPendiente] = useState(true)
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
      }
      if (data)
        isMounted && setRcpt(data.rcptEmsr)
      if (err)
        notifyRedRef.current.handleOpen(err, notifyType.error)
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

  const handleBuscarOCFecha = async () => {
    let err = null
    let data = null

    if (!selectedRcpt)
      err = {
        message: msgType.regCpeNoRcpt,
        oops: false
      }
    else if (!selectedEmsr)
      err = {
        message: msgType.regCpeNoEmsr,
        oops: false
      }
    else if (!foFechaIni || !foFechaFin)
      err = {
        message: msgType.regCpeNoFecha,
        oops: false
      }

    if (err) {
      notifyYellowRef.current.handleOpen(err, notifyType.warning)
      return
    }

    const fechaIni = foFechaIni.toISOString().split('T')[0]
    const fechaFin = foFechaFin.toISOString().split('T')[0]

    const endpoint = 'lo/ocp'
    const url = `/${endpoint}?receptorID=${selectedRcpt.ruc}&emisorID=${selectedEmsr.ruc}&fechaIni=${fechaIni}T00:00:00&fechaFin=${fechaFin}T00:00:00&pendiente=${foPendiente.toString()}&page=1&pageSize=20`
    try {
      const resp = await axiosPrivateAPI.get(url)
      data = resp?.data
    } catch (error) {
      err = getError(error)
    }

    if (data)
      console.log(data)
    if (err)
      notifyRedRef.current.handleOpen(err, notifyType.error)
  }

  const handleBuscarOCNum = () => {
    const err = {
      message: 'Proximamente!',
      oops: false
    }
    notifyYellowRef.current.handleOpen(err, notifyType.warning)
  }

  return (
    <>
      <NotifyRed ref={notifyRedRef} />
      <NotifyYellow ref={notifyYellowRef} />
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
              Busca una orden de compra usando los filtros de fecha de emisión o número de documento.
            </p>
            <div className='wapp-filtro flex space-x-10'>
              <div className='flex items-center space-x-2'>
                <DatePicker placeholder='Fecha inicio' onChange={(d,) => setFoFechaIni(d?.toDate() ?? null)} />
                <DatePicker placeholder='Fecha fin' onChange={(d,) => setFoFechaFin(d?.toDate() ?? null)} />
                <Switch checkedChildren="CPE" unCheckedChildren="ALL" defaultChecked onChange={(e) => setFoPendiente(e)} />
                <Tooltip title="Buscar orden de compra">
                  <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={handleBuscarOCFecha} />
                </Tooltip>
              </div>
              <div className='flex items-center space-x-2'>
                <Input placeholder="Nº de documento" onChange={(e) => setFoNumDocumento(e.target.value)} />
                <Tooltip title="Buscar orden de compra">
                  <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={handleBuscarOCNum} />
                </Tooltip>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}
