import { HomeIcon } from '@heroicons/react/20/solid'
import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosAPI } from '../../api/axiosAPI'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from '../../hooks/useForm'
import { useLogin } from '../../hooks/useLogin'
import { msgType } from '../../types/msgType'
import { notifyType } from '../../types/notifyType'
import { getError } from '../../utils/apiUtil'
import { assetsImg } from '../../utils/imgUtil'
import { setLastAccess } from '../../utils/lstorageUtil'

const imgPath_app = assetsImg('./app600.svg')

export const SignInForm = ({ openNotify, showLogin }) => {
    const navigate = useNavigate()

    const { auth: { app, isDemo } } = useAuth()
    const { setLogin } = useLogin()

    const [remember, setRemember] = useState(false)
    const [showLoader, setShowLoader] = useState(false)

    const [{ email, password }, handleInputChange] = useForm({
        email: '',
        password: ''
    })

    const handleOnChange = e => setRemember(e.target.checked)

    const handleSignIn = async (e) => {
        e.preventDefault()

        setShowLoader(true)

        let err = null
        let data = null

        if (email === '')
            err = {
                message: msgType.loNoEmail,
                oops: false
            }
        else if (password === '')
            err = {
                message: msgType.loNoPwd,
                oops: false
            }
        else {
            const endpoint = 'login'
            const url = `/${endpoint}?app=${app}&email=${encodeURIComponent(email)}&password=${password}`
            try {
                const resp = await axiosAPI.get(url)
                data = resp?.data
            } catch (error) {
                err = getError(error)
            }
            if (data) {
                const { token, idleTime, ropag } = data
                const metaToken = jwtDecode(data.token)
                const { email, userName } = metaToken
                const loginItem = { app, isDemo, email, userName, remember, idleTime, logged: true, ropag }
                setLogin({ ...loginItem, token })
                setLastAccess()
                navigate('/panel')
            }
        }

        if (err)
            openNotify(err, notifyType.error)
        setShowLoader(false)
    }

    return (
        <>
            {/*INI DIV LOGIN */}
            <div className="relative flex min-h-screen flex-col py-12 sm:px-6 lg:px-8 bg-gray-200">

                {/*INI DIV LOGO */}
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src={imgPath_app}
                        alt="Titania"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Inicia sesión en tu cuenta</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <button
                            type='button'
                            className={"font-medium text-indigo-600 hover:text-indigo-500" + (showLoader ? " cursor-not-allowed" : "")}
                            disabled={showLoader}
                            onClick={() => showLogin(2)}
                        >
                            Regístrate aquí
                        </button>
                    </p>
                </div>
                {/*FIN DIV LOGO */}

                {/*INI DIV FORM */}
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">

                    {/*INI DIV BORDE */}
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo electónico
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        value={email}
                                        onChange={handleInputChange}
                                        disabled={showLoader}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        value={password}
                                        onChange={handleInputChange}
                                        disabled={showLoader}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked={remember}
                                        onChange={handleOnChange}
                                        disabled={showLoader}
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Recuérdame
                                    </label>
                                </div>

                                <div className="text-sm ml-3">
                                    <button
                                        type='button'
                                        className={"font-medium text-indigo-600 hover:text-indigo-500" + (showLoader ? " cursor-not-allowed" : "")}
                                        disabled={showLoader}
                                        onClick={() => showLogin(3)}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className={"flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" + (showLoader ? " cursor-not-allowed" : "")}
                                    disabled={showLoader}
                                    onClick={handleSignIn}
                                >
                                    {
                                        showLoader &&
                                        <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                    }
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>
                    </div>
                    {/*FIN DIV BORDE */}

                </div>
                {/*FIN DIV FORM */}

                {/*INI DIV HOME */}
                <div className='absolute right-3 bottom-3'>
                    <button
                        type="button"
                        className="rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => navigate('/')}
                    >
                        <HomeIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                {/*FIN DIV HOME */}

            </div>
            {/*FIN DIV LOGIN */}
        </>
    )
}
