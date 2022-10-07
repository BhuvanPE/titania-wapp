import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Pagination, Switch, Table, Tooltip } from 'antd'
import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NotifyRed } from '../../../components/Msg/NotifyRed'
import { NotifyYellow } from '../../../components/Msg/NotifyYellow'
import { ListRcpCpe } from '../../../components/Panel/ListRcpCpe'
import { Loading } from '../../../components/Panel/Loading'
import { SelRcptEmsr } from '../../../components/Panel/SelRcptEmsr'
import { useAxiosLogin } from '../../../hooks/useAxiosLogin'
import { msgType } from '../../../types/msgType'
import { notifyType } from '../../../types/notifyType'
import { getError } from '../../../utils/apiUtil'

import './RegistrarCPE.css'

const ocColumns = [
  {
    title: 'Nº Documento',
    dataIndex: 'numOC',
  },
  {
    title: 'Fecha',
    dataIndex: 'fechaEmisionF',
    width: 120,
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    width: 140,
  },
  {
    title: 'Comprador',
    dataIndex: 'comprador',
    width: 160,
  },
  {
    title: 'Moneda',
    dataIndex: 'monedaISO',
    width: 90,
    align: 'center',
  },
  {
    title: 'Total',
    dataIndex: 'totalF',
    width: 130,
    align: 'right',
  },
];

export const RegistrarCPE = () => {
  const axiosPrivateAPI = useAxiosLogin()
  const notifyRedRef = useRef()
  const notifyYellowRef = useRef()
  const [loadPage, setLoadPage] = useState(true)
  const [loadBusqOC, setLoadBusqOC] = useState(false)
  const [rcpt, setRcpt] = useState([])
  const [emsr, setEmsr] = useState([])
  const [selectedRcpt, setSelectedRcpt] = useState(null)
  const [selectedEmsr, setSelectedEmsr] = useState(null)
  const [foFechaIni, setFoFechaIni] = useState(null)
  const [foFechaFin, setFoFechaFin] = useState(null)
  const [foPendiente, setFoPendiente] = useState(true)
  const [foSave, setFoSave] = useState(null)
  const [foNumOC, setFoNumOC] = useState(null)
  const [orders, setOrders] = useState([])
  const [ocTotalDocuments, setOcTotalDocuments] = useState(0)
  const [ocPageSize, setOcPageSize] = useState(10)
  const [ocCurrentPage, setOcCurrentPage] = useState(1)

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
    setFoSave(null)
    setOrders([])
    setOcTotalDocuments(0)
  }, [setSelectedRcpt])

  const handleSelectEmsr = useCallback((person) => {
    setSelectedEmsr(person)
    setFoSave(null)
    setOrders([])
    setOcTotalDocuments(0)
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

    setLoadBusqOC(true)

    const fechaIni = foFechaIni.toISOString().split('T')[0]
    const fechaFin = foFechaFin.toISOString().split('T')[0]

    const endpoint = 'lo/ocp'
    const url = `/${endpoint}?receptorID=${selectedRcpt.ruc}&emisorID=${selectedEmsr.ruc}&fechaIni=${fechaIni}T00:00:00&fechaFin=${fechaFin}T00:00:00&pendiente=${foPendiente.toString()}&page=1&pageSize=${ocPageSize}`
    try {
      const resp = await axiosPrivateAPI.get(url)
      data = resp?.data
    } catch (error) {
      err = getError(error)
    }

    if (data) {
      const options = { style: 'currency', currency: 'USD' };
      const numberFormat = new Intl.NumberFormat('en-US', options);
      setOrders(data.data.map(oc => {
        const totalFormat = numberFormat.format(oc.total)
        return {
          ...oc,
          key: oc.numOC,
          fechaEmisionF: moment(oc.fechaEmision).format('DD/MM/yyyy'),
          totalF: totalFormat.substring(1, totalFormat.length - 1)
        }
      }))
      setOcTotalDocuments(data.totalDocuments)
      setFoSave({
        svSelectedRcpt: selectedRcpt,
        svSelectedEmsr: selectedEmsr,
        svFoFechaIni: foFechaIni,
        svFoFechaFin: foFechaFin,
        svFoPendiente: foPendiente
      })
    }
    if (err)
      notifyRedRef.current.handleOpen(err, notifyType.error)

    setLoadBusqOC(false)
  }

  const handleBuscarOCNum = async () => {
    let err = null
    let data = null

    if (!foNumOC || foNumOC.trim().length === 0)
      err = {
        message: msgType.regCpeNoNumOC,
        oops: false
      }

    if (err) {
      notifyYellowRef.current.handleOpen(err, notifyType.warning)
      return
    }

    setLoadBusqOC(true)

    const endpoint = 'lo/ocp'
    const url = `/${endpoint}?receptorID=${selectedRcpt.ruc}&emisorID=${selectedEmsr.ruc}&numOC=${foNumOC}`
    try {
      const resp = await axiosPrivateAPI.get(url)
      data = resp?.data
    } catch (error) {
      err = getError(error)
    }

    if (data) {
      const { success, data: oc } = data
      if (success) {
        const options = { style: 'currency', currency: 'USD' };
        const numberFormat = new Intl.NumberFormat('en-US', options);
        const totalFormat = numberFormat.format(oc.total)
        setOrders([{
          ...oc,
          key: oc.numOC,
          fechaEmisionF: moment(oc.fechaEmision).format('DD/MM/yyyy'),
          totalF: totalFormat.substring(1, totalFormat.length - 1)
        }])
        setOcTotalDocuments(1)
      }
      else {
        setOrders([])
        setOcTotalDocuments(0)
      }
      setFoSave(null)
    }
    if (err)
      notifyRedRef.current.handleOpen(err, notifyType.error)

    setLoadBusqOC(false)
  }

  const handlePagOC = async (page, pageSize) => {
    if (!foSave)
      return

    const { svSelectedRcpt, svSelectedEmsr, svFoFechaIni, svFoFechaFin, svFoPendiente } = foSave

    let err = null
    let data = null

    setLoadBusqOC(true)

    const fechaIni = svFoFechaIni.toISOString().split('T')[0]
    const fechaFin = svFoFechaFin.toISOString().split('T')[0]

    const endpoint = 'lo/ocp'
    const url = `/${endpoint}?receptorID=${svSelectedRcpt.ruc}&emisorID=${svSelectedEmsr.ruc}&fechaIni=${fechaIni}T00:00:00&fechaFin=${fechaFin}T00:00:00&pendiente=${svFoPendiente.toString()}&page=${page}&pageSize=${pageSize}`
    try {
      const resp = await axiosPrivateAPI.get(url)
      data = resp?.data
    } catch (error) {
      err = getError(error)
    }

    if (data) {
      const options = { style: 'currency', currency: 'USD' };
      const numberFormat = new Intl.NumberFormat('en-US', options);
      setOrders(data.data.map(oc => {
        const totalFormat = numberFormat.format(oc.total)
        return {
          ...oc,
          key: oc.numOC,
          fechaEmisionF: moment(oc.fechaEmision).format('DD/MM/yyyy'),
          totalF: totalFormat.substring(1, totalFormat.length - 1)
        }
      }))
      setOcTotalDocuments(data.totalDocuments)
      setOcCurrentPage(page)
    }
    if (err)
      notifyRedRef.current.handleOpen(err, notifyType.error)

    setLoadBusqOC(false)
  }

  return (
    <>
      <NotifyRed ref={notifyRedRef} />
      <NotifyYellow ref={notifyYellowRef} />
      {
        loadPage &&
        <div className='my-5 flex justify-center'>
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
                <Input placeholder="Nº de documento" onChange={(e) => setFoNumOC(e.target.value)} />
                <Tooltip title="Buscar orden de compra">
                  <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={handleBuscarOCNum} />
                </Tooltip>
              </div>
            </div>
            <div className='lg:max-w-4xl'>
              {
                loadBusqOC &&
                <div className='my-5 flex justify-center'>
                  <Loading w='w-8' h='h-8' />
                </div>
              }
              {
                !loadBusqOC &&
                <>
                  <div className='wapp-tabla-oc mt-3'>
                    <Table
                      columns={ocColumns}
                      dataSource={orders}
                      pagination={false}
                      scroll={{ y: 350 }}
                      bordered
                      size='small'
                      expandable={{ expandedRowRender: (record) => (<ListRcpCpe record={record} selectedRcpt={selectedRcpt} selectedEmsr={selectedEmsr} />) }} />
                  </div>
                  <div className='wapp-pag-oc mt-2 flex justify-end'>
                    <Pagination
                      defaultCurrent={ocCurrentPage}
                      total={ocTotalDocuments}
                      showSizeChanger
                      showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} ordenes de compra`}
                      defaultPageSize={ocPageSize}
                      onChange={handlePagOC}
                      onShowSizeChange={(_, size) => setOcPageSize(size)} />
                  </div>
                </>
              }
            </div>
          </div>
        </>
      }
    </>
  )
}
