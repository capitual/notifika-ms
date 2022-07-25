import sendEmail from '~/libs/mail'
import Notification from '~/models/notification'
import i18n from '~/libs/i18n'

interface INotify {
    user: number,
    key: string,
    args: any,
    values: IValue[],
    locale: string,
    service: 'business' | 'capsvr' | 'banking' | 'kyc'
}

interface IValue {
	type: 'email' | 'push' | 'sms',
	value: string
}

const notify = async({user, key, values, args = {}, service, locale = 'en-US'}: INotify) => {

    await Notification.create({
        args,
        values,
        key,
        user,
        service
    })

    values.forEach((v: IValue) => {
        if(v.type === 'email') {
          sendEmail(key, service, {
              to: v.value,
              subject: i18n.T(locale, `${service}.mail.${key}.subject`)
          }, args, locale)
        } else if(v.type === 'sms') {
			console.log('Send notification sms')
		} else if(v.type === 'push') {
			console.log('Send notification push')
		}
    })
}

export default notify
