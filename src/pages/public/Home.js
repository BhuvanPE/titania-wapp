import React, { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getAuth } from '../../utils/apiUtil'
import { assetsImg } from '../../utils/imgUtil'

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Security',
    description: "Your customers' data will be safe and secure.",
    href: '#',
    icon: ShieldCheckIcon
  },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: Squares2X2Icon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: ArrowPathIcon,
  },
  {
    name: 'Reports',
    description: 'Get detailed reports that will help you make more informed decisions ',
    href: '#',
    icon: DocumentChartBarIcon,
  },
]
const resources = [
  { name: 'Help Center', description: 'Get all of your questions answered in our forums or contact support.', href: '#', },
  { name: 'Guides', description: 'Learn how to maximize our platform to get the most out of it.', href: '#' },
  { name: 'Events', description: 'See what meet-ups and other events we might be planning near you.', href: '#' },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#' },
]
const imgPath_app = assetsImg('./app600.svg')

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Home = () => {
  const { setAuth } = useAuth()
  const [showBanner, setShowBanner] = useState(true)

  const navigate = useNavigate()

  const handleSignIn = (isDemo) => {
    const authItem = getAuth(isDemo)
    setAuth(prev => { return { ...prev, ...authItem } })
    navigate('/login')
  }

  return (
    <Popover className="relative bg-white">
      {/* INICIO DIV PRINCIPAL */}
      <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        {/* SUB DIV 1 - Logo */}
        <div>
          <a href="/" className="flex">
            <span className="sr-only">Titania</span>
            <img
              className="h-8 w-auto sm:h-10"
              src={imgPath_app}
              alt="Titania"
            />
          </a>
        </div>
        {/* SUB DIV 2 Boton oculto */}
        <div className="-my-2 -mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        {/* SUB DIV 3 Menu & Botones */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          {/* MENU */}
          <Popover.Group as="nav" className="flex space-x-10">
            {/* MENU DESPLEGABLE - Soluciones */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    )}
                  >
                    <span>Soluciones</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                            >
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="bg-gray-50 p-5 sm:p-8">
                          <a href="/" className="-m-3 flow-root rounded-md p-3 hover:bg-gray-100">
                            <div className="flex items-center">
                              <div className="text-base font-medium text-gray-900">Enterprise</div>
                              <span className="ml-3 inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium leading-5 text-indigo-800">
                                New
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Empower your entire team with even more advanced tools.
                            </p>
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            {/* MENU NORMAL */}
            <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Precio
            </a>
            <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Documentaci??n
            </a>
            {/* MENU DESPLEGABLE - Mas */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    )}
                  >
                    <span>M??s</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <a key={item.name} href={item.href} className="-m-3 block rounded-md p-3 hover:bg-gray-50">
                              <p className="text-base font-medium text-gray-900">{item.name}</p>
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          {/* BOTONES */}
          <div className="flex items-center md:ml-12">
            <button
              type='button'
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => handleSignIn(false)}
            >
              <UserIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              Iniciar sesi??n
            </button>
            <button
              type='button'
              className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setShowBanner(true)}
            >
              Probar gratis
            </button>
          </div>
        </div>
      </div>
      {/* FIN DIV PRINCIPAL */}

      {/* INI BANNER */}
      {
        showBanner &&
        <div className="relative bg-indigo-600">
          <div className="mx-auto max-w-7xl py-2 px-2">
            <div className="pr-16 sm:px-16 sm:text-center">
              <p className="font-light text-white text-sm">
                <span className="md:hidden">We announced a new product!</span>
                <span className="hidden md:inline">Big news! We're excited to announce a brand new product.</span>
                <span className="block sm:ml-2 sm:inline-block">
                  <a href="/" className="font-bold text-white underline">
                    Learn more
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </span>
              </p>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2">
              <button
                type="button"
                className="flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setShowBanner(false)}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-3 w-3 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      }
      {/* FIN BANNER */}

      {/* INICIO CONTENIDO */}
      <div className='bg-gray-200 min-h-screen'>

      </div>
      {/* FIN CONTENIDO */}

      {/* INICIO MENU OCULTO */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src={imgPath_app}
                    alt="Titania"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-6">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Pricing
                </a>

                <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Docs
                </a>

                <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Enterprise
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="/"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Registrarse
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Usuario existente?{' '}
                  <button
                    className="text-indigo-600 hover:text-indigo-500"
                    onClick={() => handleSignIn(false)}
                  >
                    Iniciar sesi??n
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
      {/* FIN MENU OCULTO */}
    </Popover>
  )
}
