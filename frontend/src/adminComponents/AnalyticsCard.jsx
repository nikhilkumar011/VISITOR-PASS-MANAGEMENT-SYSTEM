import React from 'react'

const colorMap = {
  green: 'from-emerald-600 to-teal-700',
  blue: 'from-blue-600 to-indigo-700',
  yellow: 'from-amber-500 to-orange-600',
  red: 'from-rose-600 to-pink-700',
}

const AnalyticsCard = ({ title, value, color }) => {
  return (
    <div
      className={`
        bg-gradient-to-br ${colorMap[color]}
        rounded-2xl border border-white/15 p-7 text-left text-white shadow-lg shadow-slate-900/10 transition duration-200 hover:-translate-y-1 hover:shadow-xl
        w-full
      `}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
        {title}
      </p>

      <p className="mt-4 text-5xl font-extrabold tracking-tight">
        {value}
      </p>

      <div className="mt-6 h-1 w-16 bg-white/40 rounded-full" />
    </div>
  )
}

export default AnalyticsCard
