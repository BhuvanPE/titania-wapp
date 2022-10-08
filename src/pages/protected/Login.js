import React, { useRef, useState } from 'react'
import { ChangePwdForm } from '../../components/Login/ChangePwdForm'
import { SignInForm } from '../../components/Login/SignInForm'
import { SignUpForm } from '../../components/Login/SignUpForm'
import { NotifyGreen } from '../../components/Msg/NotifyGreen'
import { NotifyRed } from '../../components/Msg/NotifyRed'
import { notifyType } from '../../types/notifyType'
import { assetsImg } from '../../utils/imgUtil'

const imgPath = assetsImg('./pagelogin.jpg')

export const Login = () => {
  const notifyRedRef = useRef()
  const notifyGreenRef = useRef()
  const [showLogin, setShowLogin] = useState(1)

  const handleOpen = (err, type) => {
    if (type === notifyType.error)
      notifyRedRef.current.handleOpen(err, type)
    else if (type === notifyType.success)
      notifyGreenRef.current.handleOpen(err, type)
  }

  const handleShow = (comp) => setShowLogin(comp)
  //const handleShow = () => setShowLogin(1)

  return (
    <>
      <div className="flex min-h-full">
        <NotifyRed ref={notifyRedRef} />
        <NotifyGreen ref={notifyGreenRef} />
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

