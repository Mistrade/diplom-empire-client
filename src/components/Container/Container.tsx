import React from 'react'
import style from './style.module.sass'

interface ContainerProps {
  variant: 'div' | 'section' | 'article'
}

export const Container: React.FC<ContainerProps> = ( {
                                                       variant = 'div',
                                                       children
                                                     } ) => {
  return React.createElement( variant, { className: style.container }, children )
}