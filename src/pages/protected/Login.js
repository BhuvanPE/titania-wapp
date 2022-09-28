import React, { useRef, useState } from 'react'
import { ChangePwdForm } from '../../components/Login/ChangePwdForm'
import { SignInForm } from '../../components/Login/SignInForm'
import { SignUpForm } from '../../components/Login/SignUpForm'
import { Notificacion } from '../../components/Msg/Notificacion'
import { assetsImg } from '../../utils/imgUtil'

const imgPath = assetsImg('./pagelogin.jpg')

export const Login = () => {
  const notifyRef = useRef()
  const [showLogin, setShowLogin] = useState(1)

  const handleOpen = (err, type) => notifyRef.current.handleOpen(err, type)
  const handleShow = (comp) => setShowLogin(comp)

  return (
    <>
      <div className="flex min-h-full">
        <Notificacion ref={notifyRef} />
        {showLogin === 1 && <SignInForm openNotify={handleOpen} showLogin={handleShow} />}
        {showLogin === 2 && <SignUpForm openNotify={handleOpen} showLogin={handleShow} />}
        {showLogin === 3 && <ChangePwdForm openNotify={handleOpen} showLogin={handleShow} />}
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={imgPath}
            alt=""
          />
        </div>
      </div>
    </>
  )
}

