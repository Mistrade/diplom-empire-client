import React, { useState } from 'react'
import { useAddNewSubjectMutation } from './graphqlTypes/addNewSubject'
import { Box, Button, FormControl, Input, TextField } from '@mui/material'

interface Interface {
  onComplete?: () => any
}

export const CreateSubject: React.FC<Interface> = ( { onComplete } ) => {
  const initialState = {
    title: '',
    description: ''
  }
  const [state, setState] = useState( initialState )

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

      setState(initialState)

    } catch (e) {
      console.log( e )
      return e
    }
  }
  return (
    <>
      <h3>Создать новый предмет</h3>
      <form onSubmit={submitHandler}>
        <Box sx={{ display: 'flex', alignItems: 'stretch' }}>

          <FormControl sx={{ m: 1, width: 400 }}>
            <TextField
              variant={'outlined'}
              label={'Укажите название предмета'}
              id="title"
              value={state.title}
              onChange={( e ) => onChangeHandler( 'title', e.target.value )}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 400 }}>
            <TextField
              variant={'outlined'}
              label={'Описание предмета'}
              id="description"
              value={state.description}
              onChange={( e ) => onChangeHandler( 'description', e.target.value )}
            />
          </FormControl>
          {/*<Box></Box>*/}
          <FormControl sx={{ m: 1 }}>
            <Button
              variant={'contained'}
              style={{ height: '100%' }}
              type={'submit'}
            >
              Добавить предмет
            </Button>
          </FormControl>
        </Box>
      </form>
    </>
  )
}