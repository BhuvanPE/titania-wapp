import { HomeIcon } from '@heroicons/react/20/solid'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChangePwdForm } from '../../components/Login/ChangePwdForm'
import { Notificacion } from '../../components/Mensaje/Notificacion'
import { LoginForm } from '../../components/Login/LoginForm'
import { RegisterForm } from '../../components/Login/RegisterForm'
import { assetsImg } from '../../utils/imgUtil'

const imgPath = assetsImg('./pagelogin.jpg')

export const Login = () => {
  const notifyRef = useRef()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(1)

  const handleOpen = (err, type) => notifyRef.current.handleOpen(err, type)
  const handleHome = () => navigate('/')
  const handleShow = (comp) => setShowLogin(comp)

  return (
    <>
      <Notificacion ref={notifyRef} />
      <div className="flex" style={{
        minHeight: `calc(100vh)`
      }}>
        {
          showLogin === 1 &&
          <LoginForm openNotify={handleOpen} showLogin={handleShow} />
        }
        {
          showLogin === 2 &&
          <RegisterForm openNotify={handleOpen} showLogin={handleShow} />
        }
        {
          showLogin === 3 &&
          <ChangePwdForm openNotify={handleOpen} showLogin={handleShow} />
        }
        <div className="relative hidden w-0 flex-1 lg:block"
          style={{
            backgroundImage: `url(${imgPath})`
          }}
        >
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px'
          }}>
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleHome}
          >
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  )
}
