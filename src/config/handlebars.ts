import fs from 'fs';
import handlebars from 'handlebars'
import I18n from '~/libs/i18n';

interface ITemplateVariables {
    [key: string]: string | number;
}

export default interface IParseEmailTemplateDTO {
    locale: string
    file: string
    variables: ITemplateVariables
}

interface IMailTemplateProvider {
    parse(data: IParseEmailTemplateDTO): Promise<string>
}

export const handlebarsProvider = ((): IMailTemplateProvider  => {

    const parse = async ({locale, file, variables}: IParseEmailTemplateDTO) => {

        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8'
        });

        handlebars.registerHelper('i18n', (str: any) => {
            return (I18n != undefined ? I18n.T(locale, str, variables) : str);
        })

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables)
    }

    return {
        parse
    }
})()
