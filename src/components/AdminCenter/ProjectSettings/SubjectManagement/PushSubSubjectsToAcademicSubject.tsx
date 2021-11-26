import React, { useState } from 'react'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'
import { useSubSubjectsQuery } from './graphqlTypes/subsubject'
import { useAddNewSubSubjectMutation } from './graphqlTypes/addNewSubSubject'

const PushSubSubjectsToAcademicSubject: React.FC<RouteComponentProps<{ id: string }>> = ( { match } ) => {
  const history = useHistory()
  const [item, setItem] = useState( '' )
  const alreadyExists = useSubSubjectsQuery( {
    variables: {
      parentID: match.params.id
    }
  } )

  const [addItem, data] = useAddNewSubSubjectMutation()


  return (
    <>
      <span onClick={() => history.goBack()}>{'<-----'} Вернуться назад</span>
      <h2>Добавьте новые теги к предмету: {match.params.id}</h2>


      {alreadyExists.networkStatus === 8 ? (
        <p>Кажется, вы не подключены к интернету!</p>
      ) : <></>}
      {!!alreadyExists.data?.subSubjects?.length ? (
        <>
          <h3>Существующие теги по этому предмету</h3>
          <ul>

            {alreadyExists.data.subSubjects.map( ( item ) => (
              <li>
                {item.title}
              </li>
            ) )}
          </ul>
        </>
      ) : <h3>По этому предмету пока нет тегов для выдачи.</h3>}

      <form onSubmit={async ( e ) => {
        e.preventDefault()
        try {

          await addItem( {
            variables: {
              data: {
                title: item,
                parentID: match.params.id
              }
            }
          } )

          await alreadyExists.refetch( {
            parentID: match.params.id
          } )

        } catch (e) {
          console.log( e )
          return e
        }
      }}>
        <input value={item} onChange={( e ) => setItem( e.target.value )}/>
        <button type={'submit'}>Добавить</button>
      </form>
    </>
  )
}

export default withRouter( PushSubSubjectsToAcademicSubject )