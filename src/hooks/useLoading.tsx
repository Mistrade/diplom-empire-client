import React, { useEffect, useState } from 'react'

export interface PreloaderProps {
  items: Array<string>,
  status: boolean,
  message: string
}

export type SetLoadingMessage = ( message: string ) => Promise<void>
export type WithLoadingType = ( callback: ( changeMessage: ( message: string ) => Promise<void> ) => any, message?: string, item?: string ) => Promise<void>
export const useLoading = ( initialState?: boolean, initialMessage?: string ) => {
  const defaultMessage = initialMessage || 'Загрузка данных'
  const [loading, setLoading] = useState<PreloaderProps>( {
    items: [],
    status: initialState || false,
    message: defaultMessage
  } )

  const changeMessage: SetLoadingMessage = async ( message: string ) => {
    await setLoading( prev => ( {
      ...prev,
      message
    } ) )
  }

  const withLoading: WithLoadingType = async ( callback, message, item ) => {
    try {
      await setLoading( prev => {
        const items = prev.items

        if( item ) {
          items.push( item )
        }
        return {
          status: true,
          message: message || defaultMessage,
          items
        }
      } )
      await callback( changeMessage )
    } catch (e) {
      console.log( e )
      return
    } finally {
      await setLoading( prev => {
        const items = prev.items.filter( existItem => existItem !== item )
        return {
          status: false,
          message: '',
          items
        }
      } )
    }
  }

  return {
    isLoad: loading,
    withLoading,
    setLoading
  }
}