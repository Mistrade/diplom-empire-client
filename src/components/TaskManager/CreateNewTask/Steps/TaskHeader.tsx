import React, { useEffect, useState } from 'react'
import { CreateTaskSteps, FormState } from '../CreateNewTask'
import { useAcademicSubjectsListQuery } from '../../../AdminCenter/ProjectSettings/SubjectManagement/graphqlTypes/academicSubjects'
import { useSubSubjectsLazyQuery } from '../../../AdminCenter/ProjectSettings/SubjectManagement/graphqlTypes/subsubject'
import style from '../style.module.sass'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import {
  Autocomplete,
  Box, Button, ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { Send } from '@mui/icons-material'
import { DatePicker, DateTimePicker, DesktopDatePicker } from '@mui/lab'
import moment from 'moment'

interface TaskHeaderProps {
  formState: FormState,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  setCurrent: React.Dispatch<React.SetStateAction<CreateTaskSteps>>
}

export const TaskHeaderForm: React.FC<TaskHeaderProps> = ( {
                                                             formState,
                                                             setFormState,
                                                             setCurrent
                                                           } ) => {

  const subjects = useAcademicSubjectsListQuery()
  const [getSubSubjects, subSubjects] = useSubSubjectsLazyQuery()
  const [subSubjectsList, setSubSubjectsList] = useState( subSubjects.data?.subSubjects )
  const [subjectsList, setSubjectsList] = useState( subjects.data?.academicSubjects )

  useEffect( () => {
    setSubSubjectsList( subSubjects.data?.subSubjects )
  }, [subSubjects.data?.subSubjects] )

  useEffect( () => {
    setSubjectsList( subjects.data?.academicSubjects )
  }, [subjects.data?.academicSubjects] )

  useEffect( () => {
    if( formState.academicSubject ) {
      console.log( 'academicSubjects' )
      getSubSubjects( {
        variables: {
          parentID: formState.academicSubject.id
        }
      } ).then()
    }

    setFormState( ( prev ) => ( {
      ...prev,
      subSubjects: []
    } ) )
  }, [formState.academicSubject] )

  return (
    <form style={{ width: '100%' }}>
      <Typography variant={'h3'} fontSize={18} textAlign={'center'}>
        Укажите вводную информацию для задания
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
        {/*<UploadFile />*/}
        <FormControl sx={{ mb: 2, width: '100%' }}>
          <TextField
            value={formState.taskName}
            onChange={( e ) => setFormState( prev => ( {
              ...prev,
              taskName: e.target.value
            } ) )}
            variant={'outlined'}
            label={'Название задания'}
          />
        </FormControl>
        <FormControl sx={{ mb: 2, width: '100%' }}>
          <InputLabel id={'set-subject'}>Выберите предмет</InputLabel>
          <Select
            labelId={'set-subject'}
            id={'subject'}
            value={formState.academicSubject?.title || ''}
            autoWidth={true}
            fullWidth={true}
            label={'Выберите предмет'}
          >
            {subjectsList?.map( ( item ) => {
              return (
                <MenuItem
                  value={item.title || ''}
                  onClick={() => {
                    setFormState( ( prev ) => {
                      return {
                        ...prev,
                        academicSubject: item || null
                      }
                    } )
                  }}>
                  {item.title}
                </MenuItem>
              )
            } )}
          </Select>
        </FormControl>

        {formState.academicSubject && subSubjects.data?.subSubjects && !!subSubjects.data.subSubjects.length ? (
          <FormControl sx={{ mb: 2, width: '100%' }} style={{ transition: 'all .3s ease-in' }}>
            <Typography variant={'subtitle2'} sx={{ mt: 2, mb: 3 }}>
              Выбор тегов - необязателен. Но благодаря правильному выбору тегов,
              ваше задание увидит большее количество экспертов в области вашего
              задания. Вы можете указать до 5 тегов к одному заданию.
            </Typography>
            <Autocomplete
              multiple
              autoComplete={true}
              loading={subSubjects.loading}
              loadingText={'Загрузка...'}
              disableCloseOnSelect={true}
              id="tags-outlined"
              options={formState.subSubjects ? formState.subSubjects.length >= 5 ? [] : subSubjectsList || [] : []}
              getOptionLabel={( option ) => '#' + option?.title || ''}
              defaultValue={formState.subSubjects || []}
              filterSelectedOptions={true}
              aria-required={true}
              noOptionsText={!subSubjectsList?.length ? 'Тегов по данному предмету не найдено' : 'Вы выбрали максимальное количество тегов'}
              onChange={( e, value ) => {
                setFormState( prev => ( { ...prev, subSubjects: value || null } ) )
              }}
              renderInput={( params ) => (
                <TextField
                  {...params}
                  required={true}
                  // helperText={'Это поле обязательно для заполнения'}
                  label="Выберите теги предмета"
                  placeholder="Начните ввод или выберите из списка"
                />
              )}
            />
          </FormControl>
        ) : <></>}
        <FormControl sx={{ mb: 2, width: '100%' }}>
          {window.innerWidth <= 576 ? (
            <MobileDatePicker
              label="Укажите срок сдачи работы"
              value={null}
              onChange={( newValue ) => {
                // setValue(newValue);
              }}
              renderInput={( params ) => <TextField {...params} />}
            />
          ) : (
            <DateTimePicker
              disablePast={true}
              label="Укажите срок сдачи работы"
              openTo="minutes"
              views={['year', 'month', 'day', 'hours', 'minutes']}
              mask={'__.__.____ __:__'}
              value={formState.toDate.constructor}
              onChange={( newValue ) => {
                setFormState( prev => {
                  return {
                    ...prev,
                    toDate: {
                      constructor: newValue,
                      timestamp: moment( newValue ).format( 'x' ),
                      format: moment( newValue ).format( 'DD.MM.YYYY HH:mm' )
                    }
                  }
                } )
              }}
              renderInput={( params ) => <TextField {...params} required={true} error={false}/>}
            />
          )}
        </FormControl>
        <ButtonGroup fullWidth={true} sx={{ width: '100%' }}>
          <Button variant="contained" type={'button'} endIcon={<Send/>}
                  onClick={() => setCurrent( 'task-body' )}>
            Продолжить
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  )
}