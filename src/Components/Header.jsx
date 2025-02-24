import React from 'react'
import icon from '../../public/vite.svg'

export default function Header() {
  return (
    <>
      <header>
        <nav className="relative flex w-full flex-wrap items-center justify-between
         bg-zinc-50 py-2 shadow-dark-mild dark:bg-purple-800 lg:py-4">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div>
              <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="#">
                <img
                  className="me-2" 
                  src={icon}
                  style={{height: 20}} alt="Tipsy Logo" loading="lazy" />
                <span className="text-black dark:text-white text-xl">
                  Tipsy
                </span>
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}