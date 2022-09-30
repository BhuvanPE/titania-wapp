import React, { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3BottomLeftIcon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { getLogin } from '../../utils/apiUtil'
import { useLogin } from '../../hooks/useLogin'
import { Breadcrumb } from '../../components/Panel/Breadcrumb'
import { privatePages } from '../../routes/PrivateRouter'
import { assetsImg } from '../../utils/imgUtil'
import { setLastAccess } from '../../utils/lstorageUtil'

const imgPath_app = assetsImg('./app300.svg')

const userNavigation = [
  { name: 'Tu perfil', id: 1 },
  { name: 'Configuración', id: 2 },
  { name: 'Cerrar sesión', id: 3 },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getLetterName = (name) => {
  let letter = ''
  const words = name.split(' ');
  if (words.length === 2)
    letter = words[0].charAt(0) + words[1].charAt(0)
  else if (words.length === 1)
    letter = words[0].charAt(0)
  return letter.toUpperCase()
}

export const Panel = (props) => {
  const { children, pageName } = props

  const navigate = useNavigate()
  const { login, setLogin } = useLogin()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  let curret_nav = null
  const navigation = privatePages
    .filter(page => page.order && (!page.code || (login.ropag && login.ropag.some(rp => rp === page.code))))
    .sort((a, b) => a.order - b.order)
    .map(page => {
      const nav = {
        name: page.pageName,
        href: '/panel' + page.path,
        icon: page.icon,
        current: page.pageName === pageName
      }
      if (nav.current)
        curret_nav = nav
      return nav
    })

  const handleProfile = (id) => {
    if (id === 3) {
      setLogin(getLogin())
      navigate('/login', { replace: true })
    }
  }

  const handleNavigate = (nav) => {
    setLastAccess()
    navigate(nav.href)
  }

  return (
    <>
      <div className='min-h-screen bg-gray-200'>

        {/* INI MENU LATERAL OCULTO */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src={imgPath_app}
                      alt="Titania"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          className={classNames(
                            item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                            'w-full group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                          onClick={() => handleNavigate(item)}
                        >
                          <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                          {item.name}
                        </button>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* FIN MENU LATERAL OCULTO */}

        {/* INI MENU LATERAL */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src={imgPath_app}
                alt="Titania"
              />
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    className={classNames(
                      item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                      'w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    onClick={() => handleNavigate(item)}
                  >
                    <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {/* FIN MENU LATERAL */}

        {/* INI DIV BANNER & CONTENT */}
        <div className="flex flex-1 flex-col md:pl-64">

          {/* INI DIV BANNER */}
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            {/* BOTON OCULTO - Panel lateral oculto */}
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* BANNER - Buscar, notificación y usuario */}
            <div className="flex flex-1 justify-between px-4">
              {/* Buscar */}
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Buscar"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              {/* Notificación y usuario */}
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700">
                        <span className="font-medium leading-none text-white">{getLetterName(login.userName)}</span>
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <button
                              id={item.id}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'w-full text-left block px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => handleProfile(item.id)}
                            >
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/* FIN DIV BANNER */}

          {/* COMPONENTE */}
          <Breadcrumb pageName={curret_nav.name} href={curret_nav.href} />
          <main>
            <div className="py-3 px-4">
              {children}
            </div>
          </main>

        </div>
        {/* FIN DIV BANNER & CONTENT */}

      </div>
    </>
  )
}
