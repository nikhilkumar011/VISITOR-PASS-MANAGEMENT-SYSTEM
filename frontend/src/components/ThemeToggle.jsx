import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const ThemeToggle = ({ compact = false }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const isDark = theme === 'dark'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [isDark, theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-slate-700 ${compact ? 'h-10 w-10' : 'px-4 py-2 text-sm font-semibold'}`}
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      {!compact && <span>{isDark ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  )
}

export default ThemeToggle
