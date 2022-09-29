import React, { useEffect, useRef, useState } from 'react'
import { Notificacion } from '../../../components/Msg/Notificacion'
import { Loading } from '../../../components/Panel/Loading'
import { SelRcptEmsr } from '../../../components/Panel/SelRcptEmsr'
import { useAxiosLogin } from '../../../hooks/useAxiosLogin'
import { notifyType } from '../../../types/notifyType'
import { getError } from '../../../utils/apiUtil'

const people = [
  { name: 'Leslie Alexander', ruc: '@lesliealexander1' },
  { name: 'Diana Alexander', ruc: '@lesliealexander2' },
  { name: 'Maria Alexander', ruc: '@lesliealexander3' },
]

export const RegistrarCPE = () => {
  const axiosPrivateAPI = useAxiosLogin()
  const notifyRef = useRef()
  const [loadPage, setLoadPage] = useState(true)
  const [rcptEmsr, setRcptEmsr] = useState([])

  useEffect(() => {
    console.log('useEffect')

    let isMounted = true
    const controller = new AbortController()

    const rcptEmsr = async () => {
      let err = null
      let data = null

      const endpoint = 'lo/lgn/rcptEmsr'
      const url = `/${endpoint}`
      try {
        const resp = await axiosPrivateAPI.get(url, { signal: controller.signal })
        data = resp?.data
      } catch (error) {
        err = getError(error)
      }
      if (data)
        isMounted && setRcptEmsr(data.rcpt)
      if (err)
        notifyRef.current.handleOpen(err, notifyType.error)
      setLoadPage(false)
    }

    rcptEmsr()

    return () => {
      isMounted = false
      controller.abort()

    }
  }, [axiosPrivateAPI])

  const getPeople1 = () => rcptEmsr
  const getPeople2 = () => people

  return (
    <>
      <Notificacion ref={notifyRef} />
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
            <SelRcptEmsr comboLabel="Receptor" getPeople={getPeople1} />
            <SelRcptEmsr comboLabel="Emisor" getPeople={getPeople2} />
          </div>
          <div className='bg-white mt-3 p-3 rounded-md'>
            RegistrarCPE
          </div>
        </>
      }
    </>
  )
}
