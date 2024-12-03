import Toggler from '@/src/widgets/toggler/toggler'
import React from 'react'

const SettingsBar = () => {

  
  return (
    <div className="border-gray-600 border-2 border-dashed p-4 rounded-lg bg-slate-300 bg-opacity-35">
      <h2 className='text-center'>Settings bar</h2>
      <div>
        <Toggler />
      </div>
    </div>
  )
}

export default SettingsBar
