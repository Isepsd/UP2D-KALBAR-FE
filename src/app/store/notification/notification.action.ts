import { AddNotification, RemoveNotification } from "./notification.types"

const addNotification = (notification:any) => ({ type: AddNotification, payload: notification })
const removeNotification = (index:any) => ({ type: RemoveNotification, payload: index })

export {
  addNotification,
  removeNotification
}