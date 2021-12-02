import { NavItem } from './types'
import {
  CreateIcon,
  DoneIcon,
  FolderIcon,
  OkIcon, ServicesIcon,
  SynchronizeIcon,
  TheSunIcon
} from '../Icons/Icons'
import {
  Add,
  AddTask,
  Apps,
  LocalGroceryStore,
  Star,
  Subject,
  Wysiwyg,
  DisplaySettings
} from '@mui/icons-material'

export const navBarData: Array<NavItem> = [
  {
    type: 'task-manager',
    items: [
      {
        icon: <AddTask fontSize={'large'}/>,
        title: 'Создать задание',
        href: '/task-manager/create'
      },
      {
        icon: <Apps fontSize={'large'}/>,
        title: 'Мои заказы',
        href: '/task-manager/my-tasks'
      },
      {
        icon: <Wysiwyg fontSize={'large'}/>,
        title: 'Витрина заданий',
        href: '/task-manager/shopwindow'
      },
      {
        icon: <Star fontSize={'large'}/>,
        title: 'Рейтинги экспертов',
        href: '/task-manager/expert-rating'
      },
      {
        icon: <LocalGroceryStore fontSize={'large'}/>,
        title: 'Маркет готовых работ',
        href: '/task-manager/marketplace'
      }
    ]
  },
  {
    type: 'admin-center',
    title: 'Управление проектом',
    items: [
      {
        icon: <Subject fontSize={'large'} />,
        title: 'Предметы',
        href: '/admin-center/project-settings/subject-management',
        rule: ['admin']
      },
      {
        icon: <DisplaySettings fontSize={'large'} />,
        title: 'Параметры заданий',
        href: '/admin-center/project-settings/task-params',
        rule: ['admin']
      }
    ]
  }
]