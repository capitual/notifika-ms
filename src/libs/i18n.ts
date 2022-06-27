import i18n from '@jesobreira/i18n'
import neon from 'neon-js'
import cfg from '~/config/general'

let instance : any = {},
  i18nsettings = {
    locales: cfg.locales,
    directory: __dirname + '/../i18n',
    extension: '.lang',
    register: instance,
    defaultLocale: cfg.defaultLocale,
    objectNotation: true,
    parser: function(fileContents: any) {
      return neon.decode(fileContents.toString()).toObject(true)
    },
    reverseParser: function(obj: any, fileContents: any) {
      let wholeFile = neon.decode(fileContents.toString()).toObject(true)
      obj = {...wholeFile, ...obj }
      return neon.encode(obj, neon.BLOCK)
    }
  }

i18n.configure(i18nsettings)

const validateLang = (locale: string) => {
  if (!locale) locale = cfg.defaultLocale
  let possibleValues = cfg.locales
  if (possibleValues.includes(locale)) {
    return locale
  } else if (possibleValues.includes(locale.split("-")[0])) {
    return locale.split("-")[0]
  } else {
    return cfg.defaultLocale
  }
}

instance.safeSetLocale = (locale: string) => {
  return instance.setLocale(validateLang(locale))
}

instance.T = (locale: string, phrase: string, keys: any = {}) => {
  locale = validateLang(locale)
  return instance.__({ phrase, locale }, keys)
}

export= instance;
