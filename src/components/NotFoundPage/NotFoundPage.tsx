import React from 'react'
import { Box, Button, Link, List, Tooltip, Typography } from '@mui/material'
import { Help, QuestionMarkRounded, QuestionMarkSharp } from '@mui/icons-material'

export const NotFoundPage: React.FC<{ variant: 'task-manager' | 'main' | 'admin-center' }> = () => {


  return (
    <Box
      sx={{
        width: '100%',
        height: '100%'
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant={'h1'} component={'h2'} fontSize={30} sx={{ width: '100%', mb: 3 }}>Страница
            не найдена!</Typography>
          <Typography variant={'body1'} component={'h3'}>
            Возможно вы хотели попасть на один из следующих разделов сайта:
          </Typography>
          <Link href={'/'} variant={'subtitle1'} color={'primary'} sx={{textDecoration: 'none'}}>
            Перейти на главную
          </Link>
        </Box>
        <Box>
          <Tooltip title={'ПАТАМУЧТА'}>
            <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
              <Button
                color={'primary'}
                variant={'text'}
                sx={{ p: 1, display: 'flex', alignItems: 'center', lineHeight: 1 }}
                endIcon={<Help color={'primary'} fontSize={'medium'} sx={{ fontSize: 20 }}/>}
              >
                <Typography>Почему я сюда попал</Typography>
              </Button>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}