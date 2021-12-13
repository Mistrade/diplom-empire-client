import React, { useEffect, useState } from 'react'
import { CreateTaskSteps, CurrentStepCreateTask, FormState } from '../CreateNewTask'
import { Box, ButtonGroup, FormControl, TextField, Typography } from '@mui/material'
import { FileUploader } from '../../../FileUploader/FileUploader'
import { fileAccessListCategory } from '../../../../common/uploadFileHandler'
import { Press } from '../../../Buttons/Press'
import { useGetWorkTypesQuery } from '../../../AdminCenter/ProjectSettings/TaskParameters/graphQL/graphqlTypes/getWorkTypes'
import { Autocomplete } from '@mui/lab'
import { useGetTaskDeliveryObjectsLazyQuery } from '../../../AdminCenter/ProjectSettings/TaskParameters/graphQL/graphqlTypes/getTaskDeliveryObjects'
import { theme } from '../../../../index'

interface TaskAdditionalInfoProps {
  state: FormState,
  setState: React.Dispatch<React.SetStateAction<FormState>>
  setCurrent: React.Dispatch<React.SetStateAction<CurrentStepCreateTask>>,
  getCurrentIndex: ( name: CreateTaskSteps ) => number,
}

export const TaskAdditionalInfo: React.FC<TaskAdditionalInfoProps> = ( {
                                                                         state,
                                                                         setState,
                                                                         getCurrentIndex,
                                                                         setCurrent
                                                                       } ) => {
  const workTypeObjectQuery = useGetWorkTypesQuery( {} )
  const [getTaskDelivery, taskDeliveryOptions] = useGetTaskDeliveryObjectsLazyQuery()
  const [workTypeList, setWorkTypeList] = useState<Array<{ id: string, title: string }>>( [] )
  useEffect( () => {
    if( state.taskType ) {
      getTaskDelivery(
        {
          variables: {
            parent: state.taskType.id
          }
        }
      ).then()
    }
  }, [state.taskType] )

  useEffect( () => {
    setWorkTypeList( workTypeObjectQuery.data?.workTypes.map( item => ( {
      id: item?.id || '',
      title: item?.name || ''
    } ) ) || [] )
  }, [workTypeObjectQuery.data?.workTypes] )

  return (
    <form style={{ width: '100%' }}>
      <Typography variant={'h3'} fontSize={18} textAlign={'center'}>
        Укажите дополнительную информацию по заданию
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
        <FormControl sx={{ width: '100%', mb: 2 }}>
          <Autocomplete
            defaultValue={state.taskType || null}
            fullWidth={true}
            renderInput={( params ) => (
              <TextField
                {...params}
                required={true}
                label={'Выберите тип работы'}
              />
            )}
            onChange={( e, value ) => {
              setState( ( prev ) => {
                return {
                  ...prev,
                  taskType: value ? {
                    id: value.id,
                    title: value.title
                  } : null
                }
              } )
            }}
            getOptionLabel={( option ) => option.title || ''}
            options={workTypeList}
          />
        </FormControl>

        {state.taskType && taskDeliveryOptions.data?.taskDeliveryObjects.length ? (
          <FormControl sx={{ width: '100%', mb: 2 }}>
            <Box
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 8,
                border: `1px solid ${theme.palette.divider}`,
                background: 'rgba(250, 250, 250, .95)'
              }}>

              <Typography variant={'h6'} sx={{ m: 0, mb: 1 }}>
                На заметку...
              </Typography>
              <Typography variant={'body2'}>
                <strong>Способ получения решенного задания</strong> - это формат сдачи работы, в
                котором исполнитель ОБЯЗАН предоставить вам решение задания.<br/>
                Это поле не обязательно для заполнения и по умолчанию будет установлено
                - фотография / скан / скриншот экрана.
              </Typography>
            </Box>
            <Autocomplete
              renderInput={( params ) => (
                <TextField
                  {...params}
                  label={'Выберите способ получения решенного задания'}
                  placeholder={'Выберите вариант из списка ниже'}
                />
              )}
              options={taskDeliveryOptions.data?.taskDeliveryObjects || []}
              getOptionLabel={( option ) => option?.name || ''}
              onChange={( event, value ) => {
                setState( ( prev ) => {
                  return {
                    ...prev,
                    taskDeliveryObject: value ? {
                      id: value.id,
                      title: value.name
                    } : null
                  }
                } )
              }}
            />
          </FormControl>
        ) : <></>}

        <FormControl sx={{ width: '100%' }}>
          <ButtonGroup fullWidth={true}>
            <Press color={'info'} type={'button'} onClick={() => setCurrent( {
              name: 'task-body',
              index: getCurrentIndex( 'task-body' )
            } )}>
              Назад
            </Press>
            <Press
              color={'primary'}
              type={'button'}
              variant={'contained'}
              onClick={() => setCurrent( {
                name: 'task-preview',
                index: getCurrentIndex( 'task-preview' )
              } )}
            >
              Продолжить
            </Press>
          </ButtonGroup>
        </FormControl>
      </Box>
    </form>
  )
}