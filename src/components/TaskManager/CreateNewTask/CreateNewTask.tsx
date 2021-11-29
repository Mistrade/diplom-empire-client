import React, { useEffect, useState } from 'react'
import {
  AcademicSubjectsListQuery,
  useAcademicSubjectsListQuery
} from '../../AdminCenter/ProjectSettings/SubjectManagement/graphqlTypes/academicSubjects'
import style from './style.module.sass'
import {
  SubSubjectsQuery,
  useSubSubjectsLazyQuery,
  useSubSubjectsQuery
} from '../../AdminCenter/ProjectSettings/SubjectManagement/graphqlTypes/subsubject'
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup, Chip,
  FormControl, Grid,
  Input,
  InputLabel,
  MenuItem,
  Select, Step, StepContent, StepLabel, Stepper, TextField, Typography
} from '@mui/material'
import { Close, UploadFile } from '@mui/icons-material'
import SelectInput from '@mui/material/Select/SelectInput'
import { initialUser, TaskPage } from '../TaskPage/TaskPage'
import { TaskHeaderForm } from './Steps/TaskHeader'
import { Container } from '../../Container/Container'
import { TaskBodyForm } from './Steps/TaskBodyForm'

type UnboxedArray<T> = T extends Array<infer U> ? U : T

export interface FormState {
  taskName: string,
  academicSubject: null | UnboxedArray<AcademicSubjectsListQuery['academicSubjects']>,
  subSubjects: null | SubSubjectsQuery['subSubjects'],
  details: string | null,
  payAttention: string | null,
  resultFormat: null | string,
  taskType: null | string,
  toDate: {
    constructor: Date | null
    timestamp: any
    format: any
  },
  files: null | Array<string>,
}

export type CreateTaskSteps = 'task-header' | 'task-body' | 'task-additional'

function SendIcon() {
  return null
}

const CreateNewTask: React.FC = () => {
  const [current, setCurrent] = useState<CreateTaskSteps>( 'task-header' )
  const subjects = useAcademicSubjectsListQuery()
  const [getSubSubjects, subSubjects] = useSubSubjectsLazyQuery()
  const [formState, setFormState] = useState<FormState>( {
    taskName: '',
    academicSubject: null,
    subSubjects: [],
    resultFormat: null,
    details: `Описание задания можно указать в текстовом формате, сохраняя переносы строк например вот так:

А здесь уже будет располагаться следующий абзац.

Тут стоит указать комментарии к выполнению задания, например: каждая задача из файла "Скриншот экрана" должна быть решена с помощью логарифмов и никак иначе!`,
    payAttention: null,
    taskType: null,
    toDate: {
      constructor: new Date(),
      timestamp: 0,
      format: ''
    },
    files: null
  } )

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

  useEffect( () => {
    console.log( formState )
  }, [formState.toDate] )

  const steps: Array<CreateTaskSteps> = ['task-header', 'task-body', 'task-additional']

  const stepsContent: Array<{ title: string, description: string, current: CreateTaskSteps }> = [
    {
      title: 'Вводная информация по заданию',
      description: 'Содержит информацию о названии задания, предмете, тегах, сроке сдачи задания.',
      current: 'task-header'
    }, {
      title: 'Основная информация',
      description: 'Укажите детали задания, на которые эксперту стоит обратить внимание или соблюсти определенные правила. Прикрепите файлы (если необходимо)',
      current: 'task-body'
    }, {
      title: 'Дополнительная информация',
      description: 'Укажите дополнительную информацию: в каком виде вы хотите получить работу, в какой программе необходимо выполнить задание и др.',
      current: 'task-additional'
    }
  ]

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} mb={2}>
        <Box sx={{ pl: 10 }}>
          <Typography variant={'h2'} fontSize={30} textAlign={'left'} mb={1}>
            Приступим к публикации новой задачи?
          </Typography>
          <Typography variant={'subtitle1'} textAlign={'left'}>
            Это займет не более 2 минут и его сразу увидят более 10000 экспертов на портале.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stepper
          orientation={'horizontal'} alternativeLabel
          activeStep={steps.findIndex( ( item ) => item === current )}
        >
          {stepsContent.map( ( item, index ) => {
            return (
              <Step key={item.title}>
                <StepLabel>
                  <Typography variant={'subtitle1'}>
                    {item.title}
                  </Typography>
                  <Typography variant={'subtitle2'}>
                    {item.description}
                  </Typography>
                </StepLabel>
              </Step>
            )
          } )}
        </Stepper>
      </Grid>
      <Grid item xs={4}>
        <Container variant={'section'}>
          {current === 'task-header' ? (
            <TaskHeaderForm formState={formState} setFormState={setFormState}
                            setCurrent={setCurrent}/>
          ) : current === 'task-body' ? (
            <TaskBodyForm formState={formState} setFormState={setFormState}
                          setCurrent={setCurrent}/>
          ) : <></>}
        </Container>
      </Grid>
      <Grid item xs={8}>
        <TaskPage mode={'preview'} data={formState} userInfo={initialUser}
                  previewOptions={{ current, useHighlighter: true }}/>
      </Grid>
    </Grid>
  )
}

export default CreateNewTask