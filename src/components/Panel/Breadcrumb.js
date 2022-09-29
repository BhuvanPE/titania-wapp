import { HomeIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setLastAccess } from '../../utils/lstorageUtil'

const pages = [
    { name: 'Panel', href: '/panel', current: false },
    { name: 'Page', href: '#', current: true },
]

export const Breadcrumb = (props) => {
    const { pageName, href } = props

    const navigate = useNavigate()

    for (const pag of pages)
        if (pag.current) {
            pag.name = pageName
            pag.href = href
        }

    const handleNavigate = (nav) => {
        setLastAccess()
        navigate(nav.href)
    }

    return (
        <>
            <nav className="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
                <ol className="mx-auto flex w-full space-x-4 px-4 sm:px-6 lg:px-8">
                    <li className="flex">
                        <div className="flex items-center">
                            <button
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => navigate('/')}
                            >
                                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                <span className="sr-only">Home</span>
                            </button>
                        </div>
                    </li>
                    {pages.map((page) => (
                        <li key={page.name} className="flex">
                            <div className="flex items-center">
                                <svg
                                    className="h-full w-6 flex-shrink-0 text-gray-200"
                                    viewBox="0 0 24 44"
                                    preserveAspectRatio="none"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <button
                                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                    aria-current={page.current ? 'page' : undefined}
                                    onClick={() => handleNavigate(page)}
                                >
                                    {page.name}
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
}
