interface IMailConfig {
    transporter: {
        host: string,
        port: number,
        secure: boolean,
        auth: {
            user: string,
            pass: string,
        },
    },
    defaults: {
      from: {
        address: string;
        name: string;
      };
    };
  }

  export default {

    transporter: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // generated ethereal user
            pass: process.env.SMTP_PASS, // generated ethereal password
        },
    },
    defaults: {
      from: {
        address: 'suporte@capitual.com',
        name: 'Capitual',
      },
    },
  } as IMailConfig;
