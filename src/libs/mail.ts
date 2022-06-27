import nodemailer from 'nodemailer'
import mailConfig from '~/config/mail'
import path from 'path';
import  {handlebarsProvider} from '~/config/handlebars';


const sendEmail = async (template: string, service: string, maildata: any = {}, tplKeys: any = {}, locale: string) => {

    let transporter = nodemailer.createTransport(mailConfig.transporter)

    maildata.from = mailConfig.defaults.from

    let view = path.resolve(__dirname,
        '..',
        'views',
		service,
        `${template}.hbs`)

    tplKeys.mailOpts = maildata
    tplKeys.mailOpts.year = new Date().getFullYear()

    let templateData = {
        locale,
        file: view,
        variables: tplKeys
    }

    maildata.html = await handlebarsProvider.parse(templateData)
    let info = await transporter.sendMail(maildata)
    console.log("Message sent: %s", info);
}


export default sendEmail
