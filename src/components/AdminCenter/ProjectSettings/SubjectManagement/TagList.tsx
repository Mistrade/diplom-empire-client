import React, { useEffect } from 'react'
import { useSubSubjectsQuery } from './graphqlTypes/subsubject'

export const TagList: React.FC<{ selected: string }> = ( { selected } ) => {

  const { data, loading, refetch } = useSubSubjectsQuery( {
    variables: {
      parentID: selected
    }
  } )

  useEffect( () => {
    console.log( 'Отправляю повторный refetch' )
    refetch( {
      parentID: selected
    } ).then( obj => console.log( obj.data ) )
  }, [selected] )

  useEffect( () => {
    console.log( 'loading from TagList: ', loading )
  }, [loading] )

  return (
    <>
      <p style={{display:'none'}}>{selected}</p>
    </>
  )
}