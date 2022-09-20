import React from 'react'
import { Breadcrumb } from '../../components/Panel/Breadcrumb'

export const pageName = 'Dashboard'

export const Dashboard = () => {
  return (
    <>
      <Breadcrumb pageName={pageName} />
      <div className="py-4">
        <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
      </div>
    </>
  )
}
