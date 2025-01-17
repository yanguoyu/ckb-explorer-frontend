import i18n from 'i18next'
import { useHistory, useLocation } from 'react-router-dom'
import { initReactI18next, useTranslation } from 'react-i18next'
import en from '../locales/en.json'
import zh from '../locales/zh.json'
import { includes } from './array'

export const SupportedLngs = ['en', 'zh'] as const
export type SupportedLng = (typeof SupportedLngs)[number]
export const isSupportedLng = (value: unknown): value is SupportedLng => includes(SupportedLngs, value)

// export this method for testing
export const initI18n = async () => {
  i18n.use(initReactI18next).init({
    resources: {
      en,
      zh,
    },
    supportedLngs: SupportedLngs,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
}

initI18n()

export const useCurrentLanguage = (): SupportedLng => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language
  if (currentLanguage !== 'en' && currentLanguage !== 'zh') {
    throw new Error('Not supported language')
  }
  return currentLanguage
}

export const useLanguageText = (payload?: { reverse: boolean }) => {
  const currentLanguage = useCurrentLanguage()
  const { t } = useTranslation()
  if (payload?.reverse) {
    return currentLanguage === 'zh' ? t('navbar.language_en') : t('navbar.language_zh')
  }
  return currentLanguage === 'en' ? t('navbar.language_en') : t('navbar.language_zh')
}

export const useChangeLanguage = () => {
  const { pathname } = useLocation()
  const history = useHistory()

  const changeLanguage = (lng: string) => {
    const to = removeI18nPrefix(pathname)
    const toWithPrefix = addI18nPrefix(to, lng)
    history.push(toWithPrefix)
  }

  return {
    changeLanguage,
  }
}

export function addI18nPrefix(url: string, lng?: string) {
  if (lng == null || !url.startsWith('/')) return url

  return `/${lng}${url}`
}

export function removeI18nPrefix(url: string) {
  const prefix = SupportedLngs.find(lng => url.startsWith(`/${lng}`))
  if (prefix == null) return url

  return url.slice(prefix.length + 1)
}
