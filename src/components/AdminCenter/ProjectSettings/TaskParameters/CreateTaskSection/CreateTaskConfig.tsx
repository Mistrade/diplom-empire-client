import React, { ReactNode, useState } from 'react'
import {
  Box,
  BoxProps,
  Container,
  Divider,
  Grid,
  styled, SvgIconProps,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import { theme } from '../../../../../index'
import { SubjectsConfig } from './SubjectsConfig'
import { MyBox } from '../../../../MyBox'
import {
  AlignVerticalBottom,
  AllInbox,
  Ballot,
  FactCheck,
  FileDownload,
  ListOutlined, Preview, QuestionMark
} from '@mui/icons-material'
import { gs } from '../../../../../common/styles'
import { WorkTypesConfig } from './WorkTypesConfig'

export const Wrapper = styled( Box )<BoxProps>( ( { theme } ) => ( {
  display: 'flex',
  borderRadius: 4,
  border: `1px solid ${theme.palette.divider}`,
  padding: `12px 24px 24px 24px`,
  backgroundColor: theme.palette.background.default
} ) )

export interface DeclarationConfigListItem {
  title: string,
  key: 'subjects' | 'work-type' | 'task-delivery' | 'files' | 'faq' | 'preview' | 'test',
  icon: ( params: SvgIconProps ) => ReactNode,
  content: ReactNode,
}


export const CreateTaskConfig: React.FC = () => {
  const configList: Array<DeclarationConfigListItem> = [
    {
      title: 'Предметы',
      key: 'subjects',
      icon: ( params ) => <FactCheck {...params} />,
      content: <SubjectsConfig/>
    },
    {
      title: 'Типы работ',
      key: 'work-type',
      icon: ( params ) => <Ballot {...params} />,
      content: <WorkTypesConfig/>
    },
    {
      title: 'Форматы сдачи работ',
      key: 'task-delivery',
      icon: ( params ) => <AllInbox {...params}/>,
      content: <>Тут пока ничего нет</>
    },
    {
      title: 'Загрузка файлов и изображений',
      key: 'files',
      icon: ( params ) => <FileDownload {...params}/>,
      content: <>Настройки загрузки файлов</>
    },
    {
      title: 'FAQ - создание задания',
      key: 'faq',
      icon: ( params ) => <QuestionMark {...params}/>,
      content: <>Контент</>
    },
    {
      title: 'Предпросмотр задания',
      key: 'preview',
      icon: ( params ) => <Preview {...params}/>,
      content: <>Предпросмотр задания</>
    }
  ]

  const [isActive, setIsActive] = useState<{ data: DeclarationConfigListItem, index: number }>( {
    data: configList[ 1 ],
    index: 1
  } )
  return (
    <Grid container spacing={3} component={'div'} sx={{ mt: 0 }}>
      <Grid
        item
        xs={3}
      >
        <Wrapper sx={{
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: gs.boxShadow.main
        }}>
          <Typography variant={'h2'} fontSize={22} pl={2} mb={2} mt={2}>
            Элементы управления
          </Typography>
          <Tabs
            sx={{ maxHeight: 400 }}
            value={isActive?.index || 0}
            variant={'scrollable'}
            orientation={'vertical'}
            indicatorColor={'secondary'}
          >
            {configList.map( ( item, index ) => (
              <>
                <Tab
                  sx={{ p: 0, mb: 1 }}
                  label={(
                    <Grid
                      container
                      sx={{ width: '100%' }}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      columnSpacing={1}
                      // rowSpacing={1}
                    >
                      <Grid item md={2}>
                        {item.icon && item.icon( {
                          fontSize: 'medium',
                          color: 'primary',
                          sx: {
                            mr: 1
                          }
                        } )}
                      </Grid>
                      <Grid md={10} justifyContent={'flex-start'}>
                        <Typography variant={'h3'} fontSize={16} textAlign={'left'} m={0}>
                          {item.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  onClick={() => setIsActive( { data: item, index } )}
                />
              </>
            ) )}
          </Tabs>
        </Wrapper>
      </Grid>
      <Grid item xs={9}>
        <Wrapper
          sx={{
            [ theme.breakpoints.up( 'xs' ) ]: {
              height: 600
            },
            overflow: 'hidden',
            boxShadow: gs.boxShadow.main
          }}
        >
          {isActive.data.content || <></>}
        </Wrapper>
      </Grid>
    </Grid>
  )
}