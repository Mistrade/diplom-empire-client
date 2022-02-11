import React, { FC, useState } from 'react'
import { theme } from '../../../index'
import {
  Box, Button, Dialog, DialogActions, DialogContentText, DialogTitle, Divider, IconButton, List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader, TextField,
  Typography
} from '@mui/material'
import {
  AddCircle,
  Close, Delete,
  DeleteForeverOutlined,
  Edit,
  KeyboardArrowDown
} from '@mui/icons-material'
import { useAcademicSubjectsListQuery } from '../ProjectSettings/SubjectManagement/graphqlTypes/academicSubjects'
import { useAddNewSubjectMutation } from '../ProjectSettings/SubjectManagement/graphqlTypes/addNewSubject'
import { Preloader } from '../../Preloader/Preloader'
import { AddSubjectModal } from './AddSubjectModal'
import { SubjectOptionsModal } from './SubjectOptionsModal'
import { DeleteWithTooltip } from '../../ControlActions/DeleteWithTooltip'
import {
  ConfigListItemActions,
  ConfigListItemContent,
  MyConfigList
} from '../../Lists/MyConfigList'

export interface SubjectItem {
  id: string,
  title: string,
  description: string
}


export const SubjectsList: FC = () => {
  const [listIsOpen, setListIsOpen] = useState<boolean>( true )
  const [editorState, setEditorState] = useState<null | SubjectItem>( null )
  const subjectsList = useAcademicSubjectsListQuery()
  const [addModalState, setAddModalState] = useState( false )

  const sizeConfig = {
    height: listIsOpen ? 400 : 60,
    padding: listIsOpen ? `0px 12px 12px 12px` : `0px 12px`,
    maxWidth: '50%',
    borderRadius: 4,
    border: `1px solid ${theme.palette.divider}`
    // boxShadow: `0px 3px 12px 3px ${theme.palette.divider}`
  }

  return (
    <>
      {subjectsList.loading ? (
        <Box sx={{
          ...sizeConfig,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Preloader message={'Загрузка списка предметов...'}/>
        </Box>
      ) : subjectsList.error ? (
        <Box
          sx={{
            ...sizeConfig,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography>
            Не удалось загрузить список предметов...
          </Typography>
        </Box>
      ) : subjectsList.data?.academicSubjects?.length ? (
        <MyConfigList
          isOpenHeight={'100%'}
          isClosedHeight={'auto'}
          dataList={subjectsList.data.academicSubjects || []}
          initialIsOpenState
          subHeaderOptions={{
            title: ( isOpen ) => (
              <Typography>
                {isOpen ? 'Список созданных предметов' : 'Найдено предметов: ' + subjectsList.data?.academicSubjects?.length || 0}
              </Typography>
            ),
            mainAction: () => (
              <IconButton
                onClick={() => {
                  setAddModalState( true )
                }}
              >
                <AddCircle color={'primary'}/>
              </IconButton>
            )
          }}
          renderListItemTitle={( item, list, index, isOpen ) => (
            <>
              <ConfigListItemContent>
                <Typography variant={'h6'} fontSize={14}>
                  {item?.title || ''}
                </Typography>
              </ConfigListItemContent>
              <ConfigListItemActions direction={'row'} divider={<Divider/>} spacing={1}>
                <IconButton>
                  <AddCircle color={'primary'}/>
                </IconButton>
                <IconButton onClick={() => setEditorState( {
                  id: item.id,
                  title: item.title,
                  description: item.description || ''
                } )}>
                  <Edit color={'primary'}/>
                </IconButton>
                <DeleteWithTooltip title={'Любые действия, пока недоступны!'}/>
              </ConfigListItemActions>
            </>
          )}
        />
      ) : (
        <></>
      )}

      {addModalState && (
        <AddSubjectModal
          isOpen={addModalState}
          onClose={setAddModalState}
          onComplete={async () => await subjectsList.refetch()}
        />
      )}

      {editorState && (
        <SubjectOptionsModal
          data={editorState}
          setState={setEditorState}
        />
      )}
    </>
  )
}