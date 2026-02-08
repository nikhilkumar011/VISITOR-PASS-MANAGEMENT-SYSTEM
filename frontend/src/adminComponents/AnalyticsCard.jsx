import React from 'react'

const colorMap = {
  green: 'from-emerald-400 to-emerald-600',
  blue: 'from-sky-400 to-sky-600',
  yellow: 'from-amber-400 to-amber-600',
  red: 'from-rose-400 to-rose-600',
}

const AnalyticsCard = ({ title, value, color }) => {
  return (
    <div
      className={`
        bg-gradient-to-br ${colorMap[color]}
        rounded-2xl p-8 text-white shadow-lg
         md:w-2xl
      `}
    >
      <p className="text-sm uppercase tracking-widest opacity-80">
        {title}
      </p>

      <p className="mt-4 text-5xl font-extrabold">
        {value}
      </p>

      <div className="mt-6 h-1 w-16 bg-white/40 rounded-full" />
    </div>
  )
}

export default AnalyticsCard
