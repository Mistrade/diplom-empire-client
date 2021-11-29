import React from 'react'
import { CreateTaskSteps, FormState } from '../CreateNewTask'
import { Box, Button, ButtonGroup, FormControl, TextField, Typography } from '@mui/material'

interface TaskBodyProps {
  formState: FormState,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  setCurrent: React.Dispatch<React.SetStateAction<CreateTaskSteps>>
}

export const TaskBodyForm: React.FC<TaskBodyProps> = ( {
                                                         formState,
                                                         setFormState,
                                                         setCurrent
                                                       } ) => {


  return (
    <form style={{ width: '100%' }}>
      <Typography variant={'h3'} fontSize={18} textAlign={'center'}>
        Укажите основную информацию по заданию
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
          mt: 3
        }}
      >
        <FormControl sx={{ mb: 2, width: '100%' }}>
          <TextField
            multiline={true}
            value={formState.details}
            onChange={( e ) => setFormState( prev => ( {
              ...prev,
              details: e.target.value
            } ) )}
            variant={'outlined'}
            label={'Детали задания'}
          />
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <ButtonGroup fullWidth={true}>
            <Button color={'info'} type={'button'} onClick={() => setCurrent('task-header')}>
              Назад
            </Button>
            <Button color={'primary'} type={'button'} variant={'contained'} onClick={() => setCurrent('task-additional')}>
              Продолжить
            </Button>
          </ButtonGroup>
        </FormControl>
      </Box>
    </form>
  )
}