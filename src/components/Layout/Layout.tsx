import React, { useEffect, useState } from 'react'
import style from './style.module.sass'

interface LayoutProps {
  navbar: () => React.ReactNode,
  content: () => React.ReactNode,
  header: () => React.ReactNode
}

export type Resolution = 'small' | 'middle' | 'large' | 'veryLarge'

export const Layout: React.FC<LayoutProps> = ( { navbar, header, content, children } ) => {
  const parseResolution = ( event: WindowEventMap['resize'] ): Resolution => {
    const target = event.target as unknown as Window
    const { innerWidth } = target

    return 'large'
  }

  useEffect( () => {
    window.addEventListener( 'resize', parseResolution )
    return () => window.removeEventListener( 'resize', parseResolution )
  }, [] )

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.prokladka}>

          {header()}
          <div className={style.mainSection}>
            <div className={style.navBarContainer}>
              {navbar()}
            </div>
            <main className={style.contentContainer}>
              {content()}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}