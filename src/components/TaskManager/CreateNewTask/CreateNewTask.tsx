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
  ButtonGroup, Card, Chip, Divider, Fade,
  FormControl, Grid, IconProps,
  Input,
  InputLabel,
  MenuItem, Modal,
  Select, Stack, Step, StepContent, StepIcon, StepLabel, Stepper, TextField, Tooltip, Typography
} from '@mui/material'
import {
  Add,
  AddCircle,
  CheckCircle,
  Close, DateRange,
  HelpOutline,
  HelpOutlineSharp, ListAltOutlined, Storage, TagSharp,
  UploadFile
} from '@mui/icons-material'
import SelectInput from '@mui/material/Select/SelectInput'
import { initialUser, TaskPage } from '../TaskPage/TaskPage'
import { TaskHeaderForm } from './Steps/TaskHeader'
import { Container } from '../../Container/Container'
import { TaskBodyForm } from './Steps/TaskBodyForm'
import { MyStepper } from '../../Lists/MyStepper'
import { FileMetaInformation } from '../../../common/uploadFileHandler'
import { TaskAdditionalInfo } from './Steps/TaskAdditionalInfo'
import { Press } from '../../Buttons/Press'
import { theme } from '../../../index'
import { MyBox } from '../../MyBox'

export type UnboxedArray<T> = T extends Array<infer U> ? U : T

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
  taskDeliveryObject: null | {
    id: string,
    title: string
  },
  taskType: null | {
    id: string,
    title: string,
  },
  toDate: {
    constructor: Date | null
    timestamp: any
    format: any
  },
  files: null | Array<FileDataProps>,
}

export interface FileDataProps {
  file: File,
  data: FileMetaInformation,
  preview: {
    src: null | string
  }
}

export type CreateTaskSteps = 'task-header' | 'task-body' | 'task-additional' | 'task-preview'

export interface ModalConfigProps {
  isOpen: boolean,
  src: string
}


const CreateNewTask: React.FC = () => {
  const [formState, setFormState] = useState<FormState>( {
    taskName: '',
    academicSubject: null,
    subSubjects: [],
    taskDeliveryObject: null,
    details: null,
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
  const [modal, setModal] = useState<ModalConfigProps>( {
    isOpen: false,
    src: ''
  } )

  const stepsContent: Array<{ title: string, description: string, current: CreateTaskSteps }> = [
    {
      title: 'Вводная информация',
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

  const howIsList = [
    {
      title: 'Как указать название, на которое автор обратит внимание?',
      content: '',
      icon: <HelpOutlineSharp color={'info'} fontSize={'large'}/>,
      key: 'task-title'
    },
    {
      title: 'Какие теги выбирать к заданию, чтобы его увидели авторы?',
      content: '',
      icon: <TagSharp color={'info'} fontSize={'large'}/>,
      key: 'task-tags'
    },
    {
      title: 'Какой срок сдачи работы указать для задания?',
      content: '',
      icon: <DateRange color={'info'} fontSize={'large'}/>,
      key: 'date-picker'
    },
    {
      title: 'Как загрузить больше/тяжелые файлы?',
      content: '',
      icon: <Storage color={'info'} fontSize={'large'}/>,
      key: 'how-to-upload-bigger-file'
    },
    {
      title: 'Что указать в поле "Детали задания"?',
      content: '',
      icon: <ListAltOutlined color={'info'} fontSize={'large'}/>,
      key: 'task-details'
    }
  ]

  return (
    <>
      <Grid container sx={{ transition: 'all .3s ease-in' }}>
        {current.name !== 'task-preview' ? (
          <Grid
            item
            xs={12}
            sx={{ transition: 'all .3s ease-in', display: 'flex', justifyContent: 'center' }}
          >
            <Box
              component={'section'}
              sx={{
                width: '100%'
                // boxShadow: `0px 2px 5px ${theme.palette.grey[ '500' ]}`,
                // border: `1px solid ${theme.palette.divider}`,
                // borderRadius: 4,
                // p: 2.5,
                // background: '#FFF'
              }}
            >
              <MyBox sx={{
                p: 2,
                borderRadius: 4,
                boxShadow: `0px 3px 12px 3px ${theme.palette.divider}`
              }}>
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
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'nowrap',
                            justifyContent: 'center'
                          }}>
                            <Typography variant={'subtitle1'} sx={{ mr: 1 }}>
                              {item.title}
                            </Typography>
                            <Tooltip title={item.description} arrow={true} placement={'bottom'}>
                              <HelpOutline color={'primary'} sx={{ cursor: 'help' }}/>
                            </Tooltip>
                          </Box>
                        </StepLabel>
                      </Step>
                    )
                  } )}
                </Stepper>
              </MyBox>
              <Grid container sx={{ mt: 0 }} rowSpacing={2} columnSpacing={4}>
                <Grid item xs={6}>
                  <MyBox sx={{
                    p: 2,
                    borderRadius: 4,
                    boxShadow: `0px 3px 12px 3px ${theme.palette.divider}`,
                    [ theme.breakpoints.up( 'md' ) ]: {
                      // flex: '1 0 50%'
                      // pr: 8
                    }
                  }}>
                    {current.name === 'task-header' ? (
                      <TaskHeaderForm
                        formState={formState}
                        setFormState={setFormState}
                        setCurrent={setCurrent}
                        getCurrentIndex={getCurrentIndex}
                      />
                    ) : current.name === 'task-body' ? (
                      <TaskBodyForm
                        modal={modal}
                        setModal={setModal}
                        formState={formState}
                        setFormState={setFormState}
                        setCurrent={setCurrent}
                        getCurrentIndex={getCurrentIndex}
                      />
                    ) : current.name === 'task-additional' ? (
                      <TaskAdditionalInfo
                        state={formState}
                        setState={setFormState}
                        setCurrent={setCurrent}
                        getCurrentIndex={getCurrentIndex}
                      />
                    ) : <></>}
                  </MyBox>
                </Grid>
                <Grid item xs={6}>
                  <MyBox sx={{
                    p: 2,
                    borderRadius: 4,
                    boxShadow: `0px 3px 12px 3px ${theme.palette.divider}`,
                    [ theme.breakpoints.up( 'md' ) ]: {
                      // flex: '1 0 50%'
                      // pl: 8
                    }
                  }}>
                    <Typography variant={'h2'} fontSize={18} mb={3}>
                      Вы можете повлиять на скорость выполнения работы, узнайте как:
                    </Typography>
                    <Grid container sx={{ alignItems: 'stretch' }} columnSpacing={2} rowSpacing={2}>
                      {howIsList.map( item => (
                        <Grid item xs={4}>
                          <Card sx={{
                            border: `1px solid ${theme.palette.info.main}`,
                            borderRadius: 4,
                            p: 1,
                            height: '100%',
                            cursor: 'pointer',
                            transition: 'all .3s ease-out',
                            '&:hover': {
                              boxShadow: `0px 4px 17px 1px ${theme.palette.info.main}`
                            }
                          }}>
                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'flex-start'
                            }}>
                              <Box sx={{ mb: 1 }}>
                                {item.icon}
                              </Box>
                              <Box>
                                <Typography
                                  variant={'subtitle1'}
                                  color={theme.palette.info.main}
                                  textAlign={'center'}
                                >
                                  {item.title}
                                </Typography>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      ) )}
                    </Grid>
                  </MyBox>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ) : <></>}
        {current.name === 'task-preview' ? (
          <Grid item={true} xs={8}>
            <TaskPage
              modal={modal}
              setModal={setModal}
              mode={'preview'}
              data={formState}
              userInfo={initialUser}
              previewOptions={{ current, useHighlighter: true }}
            />
            <FormControl sx={{ width: '100%', mt: 3 }}>
              <ButtonGroup fullWidth={true}>
                <Press color={'info'} type={'button'} onClick={() => setCurrent( {
                  name: 'task-additional',
                  index: getCurrentIndex( 'task-additional' )
                } )}>
                  Назад
                </Press>
                <Press
                  color={'primary'}
                  type={'button'}
                  variant={'contained'}
                  sx={{ whiteSpace: 'nowrap' }}
                  onClick={() => setCurrent( {
                    name: 'task-preview',
                    index: getCurrentIndex( 'task-preview' )
                  } )}
                >
                  Опубликовать задание
                </Press>
              </ButtonGroup>
            </FormControl>
          </Grid>
        ) : <></>}

      </Grid>
      <Modal
        open={modal.isOpen}
        onBackdropClick={() => setModal( { isOpen: false, src: '' } )}
      >
        <Fade in={modal.isOpen}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '45vw',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            outline: 0
          }}>

            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={modal.src}
                loading={'eager'}
                style={{
                  objectFit: 'contain',
                  width: 'inherit',
                  height: 'inherit',
                  position: 'relative'
                }}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default CreateNewTask