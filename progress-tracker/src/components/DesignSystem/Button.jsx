import React from 'react'

function Button({text,bgColor}) {
    const colorClass = {
        red: bg-red-500,
        blue: bg-blue-500,
    }
  return (
    <div>
      <button className={`colorClass[${bgColor}] font-bold text-white`}>
        {text}
      </button>
    </div>
  )
}

export default Button
