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
  FormControl, Grid, IconProps,
  Input,
  InputLabel,
  MenuItem,
  Select, Step, StepContent, StepIcon, StepLabel, Stepper, TextField, Typography
} from '@mui/material'
import { Add, AddCircle, CheckCircle, Close, UploadFile } from '@mui/icons-material'
import SelectInput from '@mui/material/Select/SelectInput'
import { initialUser, TaskPage } from '../TaskPage/TaskPage'
import { TaskHeaderForm } from './Steps/TaskHeader'
import { Container } from '../../Container/Container'
import { TaskBodyForm } from './Steps/TaskBodyForm'
import { MyStepper } from '../../Lists/MyStepper'

type UnboxedArray<T> = T extends Array<infer U> ? U : T

export interface CurrentStepCreateTask {
  name: CreateTaskSteps,
  index: number
}

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
  files: null | Array<File>,
}

export type CreateTaskSteps = 'task-header' | 'task-body' | 'task-additional'

function SendIcon() {
  return null
}

const CreateNewTask: React.FC = () => {
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
      constructor: new Date( Date.now() + ( 1000 * 60 * 60 * 24 ) ),
      timestamp: 0,
      format: ''
    },
    files: null
  } )
  const steps: Array<CreateTaskSteps> = ['task-header', 'task-body', 'task-additional']
  const getCurrentIndex = ( name: CreateTaskSteps ): number => {
    return steps.findIndex( ( item: CreateTaskSteps ) => item === name )
  }
  const [current, setCurrent] = useState<CurrentStepCreateTask>( {
    name: 'task-header',
    index: getCurrentIndex( 'task-header' )
  } )

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
        <Box sx={{ mt: 4 }}>
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
          sx={{ fontSize: 'white' }}
          className={style.stepper}
          orientation={'horizontal'} alternativeLabel
          activeStep={steps.findIndex( ( item ) => item === current.name )}
        >
          {stepsContent.map( ( item, index ) => {
            const ListCustomIcon: React.FC<{ size: IconProps['fontSize'] }> = ( { size } ) => {
              if( index === current.index ) {
                return <AddCircle color={'secondary'} fontSize={size}/>
              } else if( index < current.index ) {
                return <CheckCircle color={'success'} fontSize={size}/>
              } else {
                return <AddCircle color={'disabled'} fontSize={size}/>
              }
            }
            return (
              <Step key={item.title}>
                <StepLabel icon={<ListCustomIcon size={'large'}/>} sx={{ mt: -0.5 }}>
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
          {current.name === 'task-header' ? (
            <TaskHeaderForm
              formState={formState}
              setFormState={setFormState}
              setCurrent={setCurrent}
              getCurrentIndex={getCurrentIndex}
            />
          ) : current.name === 'task-body' ? (
            <TaskBodyForm
              formState={formState}
              setFormState={setFormState}
              setCurrent={setCurrent}
              getCurrentIndex={getCurrentIndex}
            />
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