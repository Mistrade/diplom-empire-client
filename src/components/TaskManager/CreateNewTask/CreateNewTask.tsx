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
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select, TextField
} from '@mui/material'
import { Close, UploadFile } from '@mui/icons-material'
import SelectInput from '@mui/material/Select/SelectInput'

type UnboxedArray<T> = T extends Array<infer U> ? U : T

interface FormState {
  academicSubject: null | UnboxedArray<AcademicSubjectsListQuery['academicSubjects']>,
  subSubjects: null | SubSubjectsQuery['subSubjects']
}

function SendIcon() {
  return null
}

const CreateNewTask: React.FC = () => {

  const subjects = useAcademicSubjectsListQuery()
  const [getSubSubjects, subSubjects] = useSubSubjectsLazyQuery()
  const [formState, setFormState] = useState<FormState>( {
    academicSubject: null,
    subSubjects: []
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

  return (
    <form className={style.form} onSubmit={( e ) => e.preventDefault()}>
      <div className={style.headerContainer}>

        <h2 className={style.formHeader}>
          Создайте новое задание.
          Это быстро!
        </h2>
        <span>
        Его сразу увидят более 10000 экспертов на портале
      </span>
      </div>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: 400
        }}
      >
        {/*<UploadFile />*/}
        <div style={{ marginTop: 40 }}>
          <FormControl sx={{ m: 1, width: '400px' }}>
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
            <FormControl sx={{ m: 1, width: 400 }}>

              <Autocomplete
                multiple
                id="tags-outlined"
                options={subSubjectsList || []}
                getOptionLabel={( option ) => option?.title || ''}
                defaultValue={formState.subSubjects || []}
                filterSelectedOptions={true}
                onChange={( e, value ) => {
                  console.log( value )
                }}
                renderInput={( params ) => (
                  <TextField
                    {...params}
                    label="Выберите теги предмета"
                    placeholder="Начните ввод или выберите из списка"
                  />
                )}
              />
            </FormControl>
          ) : <></>}
        </div>
        <ButtonGroup fullWidth={true}>
          <Button variant="contained" type={'submit'} endIcon={<SendIcon/>}>
            Создать задание
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  )
}

export default CreateNewTask