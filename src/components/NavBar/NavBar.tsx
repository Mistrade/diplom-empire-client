import React, { useState } from 'react'
import { NavItem } from './types'
import { navBarData } from './data'
import { NavLink } from 'react-router-dom'
import style from './style.module.sass'

export const NavBar: React.FC = () => {
  const [navPoints, setNavPoints] = useState<Array<NavItem>>( navBarData )
  const [state, setState] = useState<boolean>( false )


  return (
    <nav className={`${style.navbar} ${state ? style.open : ''}`}>
      <span onClick={() => setState( prev => !prev )}>{!state ? '->' : '<-'}</span>

      {navPoints.map( ( navSection ) => (
        <>
          <ul className={style.navList}>
            {navSection.items.map( ( item ) => (
                <li>
                  <NavLink
                    className={style.navItem}
                    to={item.href}
                  >
                    {'icon' in item ? (
                      <span style={{ flexShrink: 1 }}>
                        {item.icon}
                      </span>
                    ) : ''}
                    {state ? item.title : ''}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </>
      ) )}
    </nav>
  )
}