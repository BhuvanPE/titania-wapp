import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assetsImg } from '../utils/imgUtil'

const imgPath = assetsImg('./pagenotfound.avif')
const pagePadding = 25

export const NotFound = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <>
      <div style={{
        padding: `${pagePadding}px`,
      }}>
        <main
          className="min-h-full bg-cover bg-top sm:bg-top"
          style={{
            backgroundImage: `url(${imgPath})`,
            minHeight: `calc(100vh - ${pagePadding * 2}px)`
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
            <p className="text-base font-semibold text-black text-opacity-50">404</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              ¡UH oh! Creo que estás perdido
            </h1>
            <p className="mt-2 text-lg font-medium text-black text-opacity-50">
              Parece que la página que estás buscando no existe.
            </p>
            <div className="mt-6">
              <button
                className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
                onClick={handleBackToHome}
              >
                Regresar a inicio
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
