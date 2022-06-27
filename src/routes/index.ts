import express from 'express'

const routes = express.Router()
import notificationController from '~/controllers/notifications'

routes.get('/notifications', notificationController.listNotifications)

export default routes
