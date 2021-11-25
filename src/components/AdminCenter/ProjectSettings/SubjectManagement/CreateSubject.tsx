import React, { useState } from 'react'
import { useAddNewSubjectMutation } from './graphqlTypes/addNewSubject'

interface Interface {
  onComplete?: () => any
}

export const CreateSubject: React.FC<Interface> = ({onComplete}) => {
  const [state, setState] = useState( {
    title: '',
    description: ''
  } )

  const [addNewSubjectMutation, { data, loading, error }] = useAddNewSubjectMutation()

  const onChangeHandler = ( key: keyof typeof state, value: string ) => {
    setState( prev => {
      return {
        ...prev,
        [ key ]: value
      }
    } )
  }

  const submitHandler = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    const { title, description } = state

    if( !title ) {
      return
    }

    try {

      await addNewSubjectMutation( {
        variables: {
          data: { title, description }
        }
      } )

      onComplete && onComplete()

    } catch (e) {
      console.log( e )
      return e
    }
  }
  return (
    <>
      <h3>Создать новый предмет</h3>
      <form onSubmit={submitHandler}>
        <label htmlFor={'title'}>
          Название предмета
        </label>
        <input id="title" value={state.title}
               onChange={( e ) => onChangeHandler( 'title', e.target.value )}/>
        <label htmlFor={'description'}>
          Описание предмета
        </label>
        <input id="description" value={state.description}
               onChange={( e ) => onChangeHandler( 'description', e.target.value )}/>
        <button type={'submit'}>Создать</button>
      </form>
    </>
  )
}