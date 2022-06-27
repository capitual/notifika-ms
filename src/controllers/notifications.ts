import { Request, Response } from 'express'
import Notification from '~/models/notification'

const notificationsController = (() => {
	const listNotifications = async(req: Request, res: Response) => {
		try {
			const { page = 1, per_page = 10 } = req.query

			const notifications = await Notification.find()
			.limit(Number(per_page))
			.skip((Number(page) - 1) * Number(per_page)).sort({created_at: -1})

			return res.status(200).json({notifications})
		} catch(err: any) {
			throw new Error(err)
		}
	}

	return {
		listNotifications
	}
})()

export default notificationsController
