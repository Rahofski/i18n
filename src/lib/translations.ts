import type { Lang } from '@/types';

export async function loadTranslations(lang: Lang, page: string) {
    try {
        const translations = await import(`../../translations/${lang}/${page}.json`);
        return translations.default;
    } catch (error) {
        console.warn(`Failed to load translations for ${lang}/${page}`, error);
        // Если не удалось загрузить перевод, возвращаем пустой объект
        return {};
    }
}

export async function getTranslations(lang: Lang, pages: string[]) {
    // Загружаем все необходимые переводы параллельно
    const translationsPromises = pages.map(page => loadTranslations(lang, page));
    const translationsArray = await Promise.all(translationsPromises);

    // Объединяем все переводы в один объект
    const translations = translationsArray.reduce((acc, curr) => ({
        ...acc,
        ...curr
    }), {});

    return translations;
} 