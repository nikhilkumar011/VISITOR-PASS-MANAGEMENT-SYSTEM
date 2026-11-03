import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faIdCard } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

const Navbar = ({ setSidebarVisible, sidebarVisible }) => {
  return (
    <>
      {sidebarVisible && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setSidebarVisible(false)}
          className="fixed inset-0 z-40 cursor-default bg-slate-950/45 backdrop-blur-[2px]"
        />
      )}
      <header className='sticky top-0 z-30 flex h-[4.5rem] w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 text-emerald-800 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:text-emerald-300 sm:px-6 md:px-8'>
        <h1 className='flex items-center gap-3 font-sans text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-xl'>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md shadow-emerald-900/15 sm:h-10 sm:w-10"><FontAwesomeIcon icon={faIdCard} /></span>
          <span>VPMS<span className="ml-1 text-emerald-700 dark:text-emerald-400">.</span></span>
        </h1>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle compact />
          <button
            type="button"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            aria-label={sidebarVisible ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={sidebarVisible}
            className='flex h-10 w-10 items-center justify-center rounded-xl text-lg text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 focus-visible:outline-emerald-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-emerald-300'
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>
    </>
  )
}

export default Navbar
