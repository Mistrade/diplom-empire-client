import React, { useState } from 'react'

export const useLoading = ( initialState?: boolean, initialMessage?: string ) => {
  const defaultMessage = initialMessage || 'Загрузка данных'
  const [loading, setLoading] = useState<{ status: boolean, message: string }>( {
    status: initialState || false,
    message: defaultMessage
  } )

  const changeMessage = async ( message: string ) => {
    await setLoading( prev => ( {
      ...prev,
      message
    } ) )
  }

  const withLoading = async ( callback: (changeMessage: (message: string) => Promise<void>) => any, message?: string ) => {
    await setLoading( {
      status: true,
      message: message || defaultMessage
    } )
    await callback(changeMessage)
    await setLoading( {
      status: false,
      message: ''
    } )
  }

  return {
    isLoad: loading,
    withLoading
  }
}