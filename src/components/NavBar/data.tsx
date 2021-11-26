import { NavItem } from './types'
import {
  CreateIcon,
  DoneIcon,
  FolderIcon,
  OkIcon, ServicesIcon,
  SynchronizeIcon,
  TheSunIcon
} from '../Icons/Icons'

export const navBarData: Array<NavItem> = [
  {
    type: 'task-manager',
    items: [
      {
        icon: <CreateIcon size={25}/>,
        title: 'Создать задание',
        href: '/task-manager/create'
      },
      {
        icon: <TheSunIcon size={25}/>,
        title: 'Мои заказы',
        href: '/task-manager/my-tasks'
      },
      {
        icon: <FolderIcon size={25}/>,
        title: 'Витрина заданий',
        href: '/task-manager/shopwindow'
      },
      {
        icon: <OkIcon size={25}/>,
        title: 'Рейтинги экспертов',
        href: '/task-manager/expert-rating'
      },
      {
        icon: <DoneIcon size={25}/>,
        title: 'Маркет готовых работ',
        href: '/task-manager/marketplace'
      }
    ]
  },
  {
    type: 'admin-center',
    items: [
      {
        icon: <ServicesIcon size={25}/>,
        title: 'Управление предметами',
        href: '/admin-center/project-settings/subject-management',
        rule: ['admin']
      }
    ]
  }
]