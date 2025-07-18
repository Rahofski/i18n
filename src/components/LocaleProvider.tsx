import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';

import { DEFAULT_LOCALE, LANG_COOKIE_NAME, SUPPORTED_LANGS } from '@/constants';
import { getTranslations } from '@/lib/translations';
import type { Lang, Locale } from '@/types';

import { Loader } from './loader';

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const titleTranslations = {
  "ru": "Альт",
  "en": "Alt",
  "ar": "Alt"
};

// Поддерживаемые регионы для русского языка
const SUPPORTED_RU_REGIONS = ['RU', 'BY', 'KZ'];

const I18nContext = createContext<I18nContextType>(null!);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Состояние для хранения переводов
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // 1. Определяем локаль из URL
  const urlLocale = location.pathname.split('/')[1] as Locale;
  
  // 2. Функция проверки и нормализации локали
  const getValidLocale = (locale: Locale | undefined): Locale | undefined => {
  if (!locale) {
    return undefined;
  }

  const parts = locale.split('-');
  const lang = parts[0];
  const region = parts[1];

  if (!SUPPORTED_LANGS.includes(lang as Lang)) {
    return undefined;
  }

  if (lang === 'ru') {
    // Если регион строго KZ, BY или RU И больше ничего после — возвращаем ru-<REGION>
    if (region && SUPPORTED_RU_REGIONS.includes(region) && parts.length === 2) {
      return `${lang}-${region}` as Locale;
    }

    // иначе всегда ru-RU
    return 'ru-RU';
  }

  return lang as Locale;
};



  // 3. Управление локалью
  const [locale, setLocale] = useState<Locale>(() => {
    // Пробуем получить валидную локаль из разных источников
    const fromUrl = getValidLocale(urlLocale);
    const fromCookie = getValidLocale(Cookies.get(LANG_COOKIE_NAME) as Locale);
    const fromBrowser = getValidLocale(navigator.language as Locale);

    // Используем первую валидную локаль или дефолтную
    const detectedLocale = fromUrl || fromCookie || fromBrowser || DEFAULT_LOCALE;
    
    // Сохраняем в cookie полную локаль
    Cookies.set(LANG_COOKIE_NAME, detectedLocale);

    return detectedLocale;
  });

  // Определяем текущую страницу из URL
  const getCurrentPage = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    // Пропускаем локаль
    pathParts.shift();
    
    if (pathParts.length === 0) {
      return 'home';
    }

    // Если путь начинается с 'article', формируем имя файла с переводами
    if (pathParts[0] === 'article' && pathParts[1]) {
      return `article-${pathParts[1]}`;
    }

    return pathParts[0];
  };

  // Загрузка переводов при изменении страницы или локали
  useEffect(() => {
    const loadPageTranslations = async () => {
      setLoading(true);
      const currentPage = getCurrentPage();
      const lang = locale.split('-')[0] as Lang;
      
      // Всегда загружаем layout и текущую страницу
      const pagesToLoad = ['layout', currentPage];
      
      try {
        const newMessages = await getTranslations(lang, pagesToLoad);
        setMessages(newMessages);
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPageTranslations();
  }, [locale, location.pathname]);

  // 5. Редирект при изменении локали или если нужно добавить регион
  useEffect(() => {
    // Получаем нормализованную локаль из URL
    const normalizedLocale = getValidLocale(urlLocale);

    // Редирект нужен в следующих случаях:
    // 1. Нет локали в URL
    // 2. Локаль в URL отличается от текущей
    // 3. Нормализованная локаль отличается от локали в URL
    if (!urlLocale || locale !== urlLocale || (normalizedLocale && normalizedLocale !== urlLocale)) {
      const newPath = location.pathname.replace(/^\/[^/]*/, `/${locale}`);
      navigate(newPath, { replace: true });
    }
  }, [locale, urlLocale, location.pathname]);

  useEffect(() => {
    const lang = locale.split('-')[0] as keyof typeof titleTranslations;
    const title = titleTranslations[lang] || titleTranslations['en'] || 'Default Title';
    document.title = title;
  }, [locale]);

  // 6. Установка атрибутов HTML
  useEffect(() => {
    document.documentElement.lang = locale.split('-')[0];
    document.documentElement.dir = locale.startsWith('ar') ? 'rtl' : 'ltr';
  }, [locale]);

  if (loading) {
    return <Loader />;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      <IntlProvider 
        locale={locale}
        messages={messages}
        defaultLocale={DEFAULT_LOCALE}
        onError={() => null} // Игнорируем ошибки отсутствующих переводов
      >
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);