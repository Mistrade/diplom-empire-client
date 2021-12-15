import React, { useState } from 'react'
import { Box, BoxProps, Container, Divider, Grid, styled, Typography } from '@mui/material'
import { theme } from '../../../../../index'
import { SubjectsConfig } from './SubjectsConfig'
import { MyBox } from '../../../../MyBox'

export const Wrapper = styled( Box )<BoxProps>( ( { theme } ) => ( {
  display: 'flex',
  borderRadius: 4,
  border: `1px solid ${theme.palette.divider}`,
  padding: `12px 24px 24px 24px`,
  backgroundColor: theme.palette.background.default
} ) )

interface ConfigListItem {
  title: string,
  key: 'subjects' | 'work-type' | 'task-delivery',
}


export const CreateTaskConfig: React.FC = () => {
  const configList: Array<ConfigListItem> = [
    { title: 'Предметы', key: 'subjects' },
    { title: 'Типы работ', key: 'work-type' },
    { title: 'Форматы сдачи работ', key: 'task-delivery' }
  ]

  const [isActive, setIsActive] = useState<ConfigListItem | null>( null )
  return (
    <Grid container spacing={3} component={'div'} sx={{ mt: 1 }}>
      <Grid
        item
        xs={2}
      >
        {configList.map( ( item, index ) => (
          <>
            <MyBox
              sx={{
                width: '100%',
                mb: 1,
                borderRadius: 2,
                border: isActive?.key === item.key ? '1px solid ' + theme.palette.primary.main : '1px solid ' + theme.palette.divider,
                transition: 'all .3s ease-in',
                p: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: isActive?.title === item.title ? `0px 3px 12px 3px ${theme.palette.divider}` : undefined,
              }}
              onClick={() => setIsActive( item )}
            >
              <Typography variant={'subtitle1'}>
                {item.title}
              </Typography>
            </MyBox>
            {index !== configList.length - 1 ? (
              <Box sx={{ width: '100%' }}>
                <Divider sx={{ width: '50%', margin: '0 auto', mb: 1 }}/>
              </Box>
            ) : <></>}
          </>
        ) )}
      </Grid>
      <Grid item xs={10}>
        <Wrapper
          sx={{
            [ theme.breakpoints.up( 'xs' ) ]: {
              height: 600
            },
            overflow: 'hidden',
            boxShadow: `0px 3px 12px 3px ${theme.palette.divider}`,
          }}
        >
          {isActive?.key === 'subjects' ? (
            <SubjectsConfig/>
          ) : <></>}
        </Wrapper>
      </Grid>
    </Grid>
  )
}