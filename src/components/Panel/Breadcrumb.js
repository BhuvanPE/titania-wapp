import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Breadcrumb = (props) => {
    const { pageName } = props

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleHome = () => navigate('/')
    const handlePanel = () => navigate('/panel')
    const handleComponent = () => navigate(pathname)

    return (
        <div>
            <nav className="sm:hidden" aria-label="Back">
                <button
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                    onClick={handlePanel}
                >
                    <ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    Back
                </button>
            </nav>
            <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li>
                        <div className="flex">
                            <button
                                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                onClick={handleHome}
                            >
                                Home
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <button
                                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                                onClick={handlePanel}
                            >
                                Panel
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <button
                                aria-current="page"
                                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                                onClick={handleComponent}
                            >
                                {pageName}
                            </button>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
    )
}
