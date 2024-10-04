export const defaultLanguage = 'ja'
export const availableLanguages = [defaultLanguage, 'en']

export const namespaces = ['translation']

export function getOptions(lng = defaultLanguage) {
  return {
    lng,
    defaultNS: 'translation',
    fallbackLng: defaultLanguage,
    ns: namespaces,
    supportedLngs: availableLanguages,
  }
}
