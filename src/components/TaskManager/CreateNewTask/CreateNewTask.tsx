import React, { useEffect, useState } from 'react'
import { useAcademicSubjectsListQuery } from '../../AdminCenter/ProjectSettings/SubjectManagement/graphqlTypes/academicSubjects'
import style from './style.module.sass'
import { Select } from '../../InputFields/Select'
import { SelectedDataProps } from '../../InputFields/Select/Type'
import {
  useSubSubjectsLazyQuery,
  useSubSubjectsQuery
} from '../../AdminCenter/ProjectSettings/SubjectManagement/graphqlTypes/subsubject'

const CreateNewTask: React.FC = () => {

  const subjects = useAcademicSubjectsListQuery()
  const [getSubSubjects, subSubjects] = useSubSubjectsLazyQuery( {
    variables: {
      parentID: ''
    }
  } )
  const [formState, setFormState] = useState( {
    academicSubject: null,
    subSubjects: null
  } )

  useEffect( () => {
    if( formState.academicSubject ) {
      getSubSubjects( {
        variables: {
          parentID: formState.academicSubject
        }
      } ).then()
    }
  }, [formState.academicSubject] )


  const parseSubjectList = ( data: typeof subjects.data ): Array<SelectedDataProps<string>> => {
    if( data?.academicSubjects ) {
      return data.academicSubjects.map( ( item ) => {
        return {
          title: item.title,
          value: item.description,
          data: item.id
        } as SelectedDataProps<string>
      } )
    } else {
      return []
    }
  }

  const parseSubSubjectsList = ( data: typeof subSubjects.data ): Array<SelectedDataProps<string>> => {
    if( data?.subSubjects ) {
      return data.subSubjects.map( ( item ) => ( {
        title: item.title,
        value: '',
        data: item.id || ''
      } ) )
    }
    return []
  }

  console.log( parseSubjectList( subjects.data ) )

  return (
    <form className={style.form}>
      <div className={style.headerContainer}>

        <h2 className={style.formHeader}>
          Создайте новое задание.
          Это быстро!
        </h2>
        <span>
        Его сразу увидят более 10000 экспертов на портале
      </span>
      </div>


      <div style={{ marginTop: 40 }}>
        <Select
          labelProps={{ htmlFor: 'academicSubject' }}
          isRequired={true}
          onSelect={( state ) => {
            setFormState( prev => ( {
              ...prev,
              academicSubject: state?.data || null
            } ) )
          }}
          labelText={'Выберите предмет'}
          dataList={parseSubjectList( subjects.data )}
          initialSelected={formState.academicSubject}
          id={'academicSubject'}
          useFilter={true}
          useArrowNavigation={true}
          useSuggestion={true}
          useForceSelect={true}
          useStrictCleaner={true}
        />

        {formState.academicSubject && subSubjects.data?.subSubjects && !!subSubjects.data.subSubjects.length ? (
          <Select
            dataList={parseSubSubjectsList( subSubjects.data )}
            initialSelected={formState.subSubjects}
            id={'subsubjects'}
            isRequired={true}
            useFilter={true}
            useArrowNavigation={true}
            useSuggestion={true}
            useForceSelect={true}
            useStrictCleaner={true}
            labelText={'Выберите теги предмета'}
          />
        ) : <></>}
      </div>

      {/*<button onClick={(e) => {*/}
      {/*  e.preventDefault()*/}
      {/*  getSubjectList().then( r => r )*/}
      {/*}}>*/}
      {/*  Подгрузить*/}
      {/*</button>*/}

      {/*{JSON.stringify(data)}*/}
    </form>
  )
}

export default CreateNewTask