import React, { Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react'
import {
  Box,
  Button, ButtonGroup, Chip, CircularProgress, ClickAwayListener,
  Dialog,
  DialogActions, DialogContent,
  DialogContentText,
  DialogTitle,
  Divider, FormControl, Grid, Icon,
  IconButton, IconProps,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader, SvgIconProps,
  TextField, TextFieldProps, Tooltip,
  Typography
} from '@mui/material'
import {
  AddCircle,
  ArrowBack,
  ArrowCircleDown,
  BuildCircle,
  CheckCircle,
  Close,
  DeleteForeverOutlined,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowDownOutlined,
  ListAlt,
  ListAltOutlined,
  SettingsApplicationsOutlined,
  SettingsPhoneOutlined, SvgIconComponent
} from '@mui/icons-material'
import { useAddNewSubSubjectMutation } from '../../SubjectManagement/graphqlTypes/addNewSubSubject'
import { useAcademicSubjectsListQuery } from '../../SubjectManagement/graphqlTypes/academicSubjects'
import { useAddNewSubjectMutation } from '../../SubjectManagement/graphqlTypes/addNewSubject'
import { theme } from '../../../../../index'
import { useSubSubjectsQuery } from '../../SubjectManagement/graphqlTypes/subsubject'
import { PreloaderProps, useLoading } from '../../../../../hooks/useLoading'
import { useEditSubSubjectMutation } from '../../SubjectManagement/graphqlTypes/editSubSubject'
import { useDeleteSubSubjectMutation } from '../../SubjectManagement/graphqlTypes/deleteSubSubject'
import { MyBox } from '../../../../MyBox'
import { useChangeSubjectInfoMutation } from '../graphQL/graphqlTypes/changeSubjectInfo'
import { useSnackbar } from 'notistack'
import { SubjectItem, SubjectsList } from '../../../SubjectsManagement/SubjectsList'


interface InputWithPlusProps {
  inputProps: TextFieldProps,
  icon?: ( props: SvgIconProps ) => ReactNode,
  onButtonClick: () => Promise<any>,
  loading?: boolean
}

export const InputWithPlus: FC<InputWithPlusProps> = ( props ) => {
  const [showButton, setShowButton] = useState( !!props.inputProps.value )

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
      width: '100%',
      mb: 2
    }}>
      <TextField
        {...props.inputProps}
        fullWidth={true}
        disabled={props.loading}
        sx={{ maxWidth: '100%', transition: 'all .3s ease-in' }}
        onFocus={() => setShowButton( true )}
      />
      {showButton ? (
        <Box sx={{ mr: 2, ml: 2 }}>
          {props.loading ? (
            <CircularProgress color={'primary'} size={25}/>
          ) : (
            <IconButton onClick={async () => {
              await props.onButtonClick()
            }}>
              {props.icon ? (
                <>
                  {props.icon( {
                    color: 'primary',
                    sx: {
                      fontSize: 30
                    }
                  } )}
                </>
              ) : (
                <AddCircle color={'primary'} sx={{ fontSize: 30 }}/>
              )}
            </IconButton>
          )}
        </Box>
      ) : <></>}
    </Box>
  )
}

interface SectionItemType {
  title: string,
  key: string,
  icon: ( IconProps: SvgIconProps ) => ReactNode
}

export const SubjectsConfig: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState( false )
  const [openingSection, setOpeningSection] = useState<SectionItemType | null>( null )

  const sectionList: Array<SectionItemType> = [
    {
      title: 'Список предметов',
      key: 'subject-list',
      icon: ( IconProps ) => <ListAltOutlined {...IconProps}/>
    },
    {
      title: 'Параметры предметов и тегов',
      key: 'params',
      icon: ( IconProps ) => <SettingsApplicationsOutlined {...IconProps}/>
    }
  ]
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column'

        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'nowrap',
          mt: 2,
          mb: 2
        }}>
          {openingSection && (
            <ArrowBack color={'primary'} sx={{cursor: 'pointer'}} onClick={() => setOpeningSection( null )}/>
          )}
          <Typography variant={'h2'} fontSize={22} sx={{ m: 0, p: 0, mr: 2, pl: 2 }}>
            {openingSection?.title || 'Управление предметами'}с
          </Typography>
        </Box>
        {!openingSection ? (
          <Grid container columnSpacing={2} alignItems={'stretch'}>
            {sectionList.map( item => (
              <Grid item xs={4} md={4} lg={2}>
                <MyBox
                  onClick={() => setOpeningSection( item )}
                  sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    border: `2px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    transition: 'all .3s ease-in',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: `0px 2px 12px 3px ${theme.palette.info.main}`
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {item.icon( {
                      sx: {
                        fontSize: 100
                      },
                      color: 'primary'
                    } )}
                  </Box>
                  <Typography variant={'h6'} fontSize={16} textAlign={'center'}>
                    {item.title}
                  </Typography>
                </MyBox>
              </Grid>
            ) )}
          </Grid>
        ) : (
          <>
            {openingSection.key === 'subject-list' ? (
              <Box sx={{
                height: '100%',
                overflow: 'hidden'
              }}>
                <SubjectsList/>
              </Box>
            ) : <></>}
          </>
        )}
      </Box>
    </>
  )
}