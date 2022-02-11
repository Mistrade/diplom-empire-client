import React, { FC, MouseEventHandler, ReactNode, ReactNodeArray, useState } from 'react'
import {
  Box, BoxProps, CircularProgress, Divider,
  IconButton,
  List, ListItem, ListItemProps, ListItemSecondaryAction, ListItemText,
  ListProps,
  ListSubheader,
  ListSubheaderProps, Stack, StackProps,
  styled,
  Typography
} from '@mui/material'
import {
  AddCircle, AllInbox,
  ArrowCircleDown, AutoDelete, Ballot,
  Close, Edit,
  FactCheck, FileDownload,
  KeyboardArrowDown, Preview, QuestionMark
} from '@mui/icons-material'
import { theme } from '../../index'
import { SubjectsConfig } from '../AdminCenter/ProjectSettings/TaskParameters/CreateTaskSection/SubjectsConfig'
import { WorkTypesConfig } from '../AdminCenter/ProjectSettings/TaskParameters/CreateTaskSection/WorkTypesConfig'
import { DeclarationConfigListItem } from '../AdminCenter/ProjectSettings/TaskParameters/CreateTaskSection/CreateTaskConfig'
import { PreloaderProps, useLoading } from '../../hooks/useLoading'
import { Preloader } from '../Preloader/Preloader'

interface MyConfigListProps<T> {
  sx?: ListProps['sx'],
  isOpenHeight?: number | string,
  isClosedHeight?: number | string,
  initialIsOpenState?: boolean,
  subHeaderOptions?: {
    mainAction?: () => Promise<any> | any,
    buttonIcon?: ReactNode,
    title?: ( ( listIsOpen: boolean ) => ReactNode ) | string
  }
  loadProps?: PreloaderProps,
  dataList: Array<T>,
  renderListItemTitle: ( item: T, list: Array<T>, index: number, isOpen: boolean ) => ReactNode | string,
  emptyListMessage?: ( () => ReactNode | string )
}

interface MyConfigListAdditionalCallbackProps {
  onOpenList?: () => void,
  onCloseList?: () => void,
}

interface ConfigListProps extends ListProps {
  isOpen: boolean,
  height: number | string
}

interface ConfigListSubheaderProps extends ListSubheaderProps {
  isOpen: boolean
  maxHeightIfClosed: number | string
}

interface ConfigListItemProps extends ListItemProps {
  isOpen?: boolean,
  animationDelay?: number,
  maxDelay?: number,
}

export const ConfigList = styled( List )<ConfigListProps>( ( { theme, isOpen, height } ) => ( {
  padding: isOpen ? `0px 12px 12px 12px` : `0px 12px`,
  borderRadius: 4,
  background: '#FFF',
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'scroll',
  p: 0,
  transition: 'all .5s ease-in-out',
  height,
  [ `@media(max-width: ${theme.breakpoints.down( 'md' )}` ]: {
    maxWidth: '100%'
  }
} ) )

export const ConfigListSubheader = styled( ListSubheader )<ConfigListSubheaderProps>( ( {
                                                                                          theme,
                                                                                          isOpen,
                                                                                          maxHeightIfClosed
                                                                                        } ) => ( {
  maxHeight: isOpen ? 'fit-content' : maxHeightIfClosed,
  padding: 12,
  '&::after': {
    content: `''`,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    transform: isOpen ? 'translateY(0)' : 'translateY(-12px)',
    opacity: isOpen ? 1 : 0,
    height: 1,
    background: theme.palette.divider,
    transition: 'all .5s ease-in-out'
  }
} ) )

export const ConfigListItem = styled( ListItem )<ConfigListItemProps>( ( {
                                                                           theme,
                                                                           isOpen,
                                                                           animationDelay = 50,
                                                                           maxDelay = 500
                                                                         } ) => ( {
  position: 'relative',
  display: !isOpen ? 'none' : 'flex',
  // height: !isOpen ? 'none' : 'fit-content',
  transition: 'all .5s ease-in-out',
  opacity: isOpen ? 1 : 0,
  transitionDelay: isOpen ? `${animationDelay > 500 ? 500 : animationDelay}ms` : `0ms`,
  transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
  padding: 12,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 2,
  marginTop: 4
} ) )

export const ConfigListItemContent = styled( Box )<BoxProps>( ( { theme } ) => ( {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'nowrap',
  width: '100%'
} ) )

export const ConfigListItemActions = styled( Stack )<StackProps>( ( { theme } ) => ( {} ) )

export const EmptyListMessageContainer = styled( Box )<BoxProps>( () => ( {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
  paddingTop: '2rem'
} ) )

export function MyConfigList<T>( {
                                   isOpenHeight,
                                   isClosedHeight,
                                   initialIsOpenState = true,
                                   subHeaderOptions,
                                   loadProps,
                                   dataList,
                                   renderListItemTitle,
                                   emptyListMessage,
                                   sx = {}
                                 }: MyConfigListProps<T> ): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>( !!initialIsOpenState )


  return (
    <>
      <ConfigList
        sx={{ p: 0, ...sx }}
        isOpen={isOpen}
        height={( isOpen ? isOpenHeight : isClosedHeight ) || ''}
      >
        {loadProps?.status && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: 'inherit',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'inherit',
              zIndex: 2,
              left: 0,
              top: 0
            }}
          >
            <Preloader message={loadProps.message}/>
          </Box>
        )}
        <ConfigListSubheader
          sx={{ zIndex: loadProps?.status ? 3 : 1 }}
          isOpen={isOpen}
          maxHeightIfClosed={isClosedHeight || ''}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {!!subHeaderOptions?.title && (
                <>
                  {typeof subHeaderOptions.title === 'string' ? (
                    <Typography variant={'subtitle1'} sx={{ m: 0, p: 0 }}>
                      {subHeaderOptions.title.toString()}
                    </Typography>
                  ) : subHeaderOptions.title( isOpen )}
                </>
              )}
              {( !!subHeaderOptions?.mainAction ) && (
                <IconButton
                  onClick={subHeaderOptions.mainAction}
                >
                  {subHeaderOptions.buttonIcon || (
                    <AddCircle color={'primary'}/>
                  )}
                </IconButton>
              )}
            </Box>
            <IconButton onClick={() => setIsOpen( prev => !prev )} sx={{ m: 0, p: 0 }}>
              <ArrowCircleDown
                color={'primary'}
                sx={{
                  transform: `${isOpen ? 'rotate(180deg)' : ''}`,
                  transition: 'all .3s ease-in'
                }}
              />
            </IconButton>
          </Box>
        </ConfigListSubheader>
        {( !!dataList.length && dataList.map( ( item, index ) => (
          <ConfigListItem isOpen={isOpen} animationDelay={index * 100}>
            {renderListItemTitle( item, dataList, index, isOpen )}
          </ConfigListItem>
        ) ) ) || emptyListMessage && emptyListMessage() || <></>}
      </ConfigList>
    </>
  )
}