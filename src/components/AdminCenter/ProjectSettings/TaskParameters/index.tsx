import React, { useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'

interface TaskParametersProps {

}

export interface TabItemProps {
  title: string,
  key: 'type-to-delivery-task' | 'how-to-complete-task'
}

export const TaskParameters: React.FC<TaskParametersProps> = ( {} ) => {
  const tabs: Array<TabItemProps> = [
    { title: 'Варианты сдачи работы', key: 'type-to-delivery-task' },
    { title: 'В какой программе выполнять задание', key: 'how-to-complete-task' }
  ]

  const [activeTab, setActiveTab] = useState<TabItemProps>( tabs[ 0 ] )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', display: 'flex' }}>
        <Typography variant={'h1'} fontSize={30}>
          Управление параметрами реализации заданий
        </Typography>
      </Box>
      <Box>
        <Tabs sx={{ mt: 2 }} value={tabs.findIndex( item => item.key === activeTab.key ) || 0}>
          {tabs.map( item => (
            <Tab label={item.title} onClick={() => setActiveTab( item )}/>
          ) )}
        </Tabs>
      </Box>
    </Box>
  )
}