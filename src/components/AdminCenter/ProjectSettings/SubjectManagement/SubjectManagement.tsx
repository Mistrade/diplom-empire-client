import React, { useState } from 'react'
import { useAcademicSubjectsListQuery } from './graphqlTypes/academicSubjects'
import { useHistory } from 'react-router-dom'
import { CreateSubject } from './CreateSubject'

const SubjectManagement: React.FC = () => {
  const history = useHistory()
  const { data, loading, error, refetch: refetchAcademicSubjects } = useAcademicSubjectsListQuery()
  const [creator, setCreator] = useState( false )

  return (
    <>
      <h2>Управление предметами</h2>

      <h3>
        Список созданных предметов
      </h3>
      <button onClick={() => setCreator( prev => !prev )}>
        Создать новый предмет
      </button>

      {creator ? (
        <>
          <CreateSubject onComplete={async () => {
            await refetchAcademicSubjects()
          }}/>
        </>
      ) : <></>}

      {data?.academicSubjects ? (
        <ul>
          {data.academicSubjects.map( ( item ) => {
            return (
              <li onClick={() => history.push( history.location.pathname + '/' + item.id )}>
                <h5>{item.title}</h5>
                {item.description ? <span>{item.description}</span> : <></>}
              </li>
            )
          } )}
        </ul>
      ) : <></>}
    </>
  )
}

export default SubjectManagement