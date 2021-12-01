export const routeList = {
  taskManager: {
    default: '/task-manager',
    createTask() {
      return this.default + '/create'
    },
    myTasks: {
      default(){
        return 'string'
      },
      routes: {
        default(){
          return {
            path: '/task-manager/my-tasks',
            title: "По умолчанию"
          }
        },
        dashboard() {
          return {
            path: this.default().path + '/',
            title: 'Дашборд'
          }
        },
        completed() {
          return {
            path: this.default().path + '/completed',
            title: 'Выполненные'
          }
        },
        moderated() {
          return { path: this.default().path + '/moderated', title: 'На модерации' }
        },
        disabled() {
          return { path: this.default().path + '/disabled', title: 'Заблокированные' }
        },
        inWork() {
          return { path: this.default().path + '/in-work', title: 'В работе' }
        },
        active() {
          return { path: this.default().path + '/active', title: 'Активные' }
        },
        bookmarks() {
          return { path: this.default().path + '/bookmarks', title: 'Избранные' }
        },
        nonPublished() {
          return { path: this.default().path + '/non-published', title: 'Не опубликованные' }
        }
      },
      getRouteList() {
        const data: { [ key: string ]: ( () => { path: string, title: string } ) | string } = this.routes
        const result: Array<{ path: string, title: string, key: keyof typeof routeList.taskManager.myTasks.routes }> = []
        for (let key in data) {
          if( key !== 'default' ) {
            const item = data[ key ]
            if( typeof item !== 'string' ) {
              const path: { path: string, title: string } = item.apply(routeList.taskManager.myTasks.routes)
              result.push( {
                ...path, key: key as keyof typeof routeList.taskManager.myTasks.routes
              } )
            }
          }
        }

        return result
      }
    }
  }
}