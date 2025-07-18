import { DEFAULT_LANG, LANG_COOKIE_NAME, SUPPORTED_LANGS } from "@/constants";
import type { Lang } from "@/types";

export const getLocaleFromPathname = (
    pathname: string
): { lang: Lang | null; locale: string | null } => {
    const pathParts = pathname.split("/");
    const pathLocale = pathParts[1];

    if (!pathLocale) {
        return { lang: null, locale: null };
    }

    const [lang] = pathLocale.split("-");

    if (SUPPORTED_LANGS.includes(lang as Lang)) {
        return {
            lang: lang as Lang,
            locale: pathLocale,
        };
    }

    return { lang: null, locale: null };
};

export function getLocaleFromCookie(): Lang | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(
        new RegExp(`${LANG_COOKIE_NAME}=([^;]+)`)
    );
    if (match && SUPPORTED_LANGS.includes(match[1] as Lang)) {
        return match[1] as Lang;
    }
    return null;
}

export const getLanguageFromBrowser = (): Lang | null => {
    if (typeof navigator === "undefined") return null;

    const navigatorLang = navigator.language.split("-")[0] as Lang;
    return SUPPORTED_LANGS.includes(navigatorLang) ? navigatorLang : null;
};

export const detectUserLanguage = (pathname: string): Lang => {
    const { lang } = getLocaleFromPathname(pathname);

    return (
        lang ||
        getLocaleFromCookie() ||
        getLanguageFromBrowser() ||
        DEFAULT_LANG
    );
};
