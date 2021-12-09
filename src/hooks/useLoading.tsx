import React, { useEffect, useState } from 'react'

export interface PreloaderProps {
  status: boolean,
  message: string
}

export type SetLoadingMessage = ( message: string ) => Promise<void>
export type WithLoadingType = ( callback: ( changeMessage: ( message: string ) => Promise<void> ) => any, message?: string ) => Promise<void>
export const useLoading = ( initialState?: boolean, initialMessage?: string ) => {
  const defaultMessage = initialMessage || 'Загрузка данных'
  const [loading, setLoading] = useState<PreloaderProps>( {
    status: initialState || false,
    message: defaultMessage
  } )

  const changeMessage: SetLoadingMessage = async ( message: string ) => {
    await setLoading( prev => ( {
      ...prev,
      message
    } ) )
  }

  useEffect( () => {
    console.log( loading )
  }, [loading] )


  const withLoading: WithLoadingType  = async ( callback, message ) => {
    try {
      await setLoading( {
        status: true,
        message: message || defaultMessage
      } )
      await callback( changeMessage )
    } catch (e) {
      console.log( e )
      return
    } finally {
      await setLoading( {
        status: false,
        message: ''
      } )
    }
  }

  return {
    isLoad: loading,
    withLoading,
    setLoading
  }
}