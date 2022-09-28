import React, { useEffect, useState } from 'react'
import { CompLoading } from '../../../components/Load/CompLoading'
import { SelRcptEmsr } from '../../../components/Panel/SelRcptEmsr'
import { useAxiosLogin } from '../../../hooks/useAxiosLogin'
import { useLogin } from '../../../hooks/useLogin'
import { getError } from '../../../utils/apiUtil'

const people = [
  { name: 'Leslie Alexander', ruc: '@lesliealexander1' },
  { name: 'Diana Alexander', ruc: '@lesliealexander2' },
  { name: 'Maria Alexander', ruc: '@lesliealexander3' },
]

export const RegistrarCPE = () => {
  const axiosPrivateAPI = useAxiosLogin()
  const { login } = useLogin()
  const [loadRcptEmsr, setLoadRcptEmsr] = useState(true)

  useEffect(() => {
    let err = null
    let data = null

    const api = async () => {
      const endpoint = 'to/lgn/rcptEmsr'
      const url = `/${endpoint}?email=${encodeURIComponent(login.email)}`
      try {
        const resp = await axiosPrivateAPI.get(url)
        data = resp?.data

      } catch (error) {
        err = getError(error)
      }
    }

    api()
    setLoadRcptEmsr(false)

    console.log(err)
    console.log(data)
  }, [login, axiosPrivateAPI, setLoadRcptEmsr])


  const getPeople = () => people

  return (
    <>
      {
        loadRcptEmsr &&
        <div className='mt-5 flex justify-center'>
          <CompLoading />
        </div>
      }
      {
        !loadRcptEmsr &&
        <>
          <div className='flex justify-start space-x-4 px-3'>
            <SelRcptEmsr comboLabel="Receptor" getPeople={getPeople} />
            <SelRcptEmsr comboLabel="Emisor" getPeople={getPeople} />
          </div>
          <div className='bg-white mt-3 p-3 rounded-md'>
            RegistrarCPE
          </div>
        </>
      }
    </>
  )
}
