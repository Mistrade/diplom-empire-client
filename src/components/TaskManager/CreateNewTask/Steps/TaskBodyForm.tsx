import React from 'react'
import { CreateTaskSteps, CurrentStepCreateTask, FormState } from '../CreateNewTask'
import { Box, Button, ButtonGroup, FormControl, TextField, Typography } from '@mui/material'
import { Press } from '../../../Buttons/Press'
import { fileAccessListCategory } from '../../../../common/uploadFileHandler'
import { FileUploader } from '../../../FileUploader/FileUploader'

interface TaskBodyProps {
  formState: FormState,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  setCurrent: React.Dispatch<React.SetStateAction<CurrentStepCreateTask>>,
  getCurrentIndex: ( name: CreateTaskSteps ) => number
}

export const TaskBodyForm: React.FC<TaskBodyProps> = ( {
                                                         formState,
                                                         setFormState,
                                                         setCurrent,
                                                         getCurrentIndex
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
        <FileUploader
          fileList={formState.files || []}
          setFileList={( data ) => setFormState( prev => ( { ...prev, files: data } ) )}
          acceptFileExtensions={fileAccessListCategory}
          maxSizeOnFile={5000000}
          maxFileCount={8}
          minSizeOnFile={1000}
        />
        <FormControl sx={{ width: '100%' }}>
          <ButtonGroup fullWidth={true}>
            <Press color={'info'} type={'button'} onClick={() => setCurrent( {
              name: 'task-header',
              index: getCurrentIndex( 'task-header' )
            } )}>
              Назад
            </Press>
            <Press color={'primary'} type={'button'} variant={'contained'}
                   onClick={() => setCurrent( {
                     name: 'task-additional',
                     index: getCurrentIndex( 'task-additional' )
                   } )}>
              Продолжить
            </Press>
          </ButtonGroup>
        </FormControl>
      </Box>
    </form>
  )
}