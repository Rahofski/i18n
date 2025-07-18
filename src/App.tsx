import { type FC, useEffect } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

import {  DEFAULT_LOCALE } from "@/constants";

import { I18nProvider } from "../src/components/LocaleProvider" // Новый провайдер
import {
    ArticleAr,
    ArticleCss,
    ArticleEn,
    ArticleI18nKz,
    ArticleL10nRu,
    ArticleRtlIcons,
    ArticleUiBy,
    Home,
} from "./pages";

const ScrollToTop: FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    return (
        <BrowserRouter>
            <I18nProvider> 
                <ScrollToTop />
                <Routes>
                    {/* Редирект с корня на дефолтную локаль */}
                    <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />

                    {/* Основные маршруты с локалями */}
                    <Route path=":locale">
                        <Route index element={<Home />} />

                        <Route path="article">
                            <Route path="rtl-icons" element={<ArticleRtlIcons />} />
                            <Route path="css" element={<ArticleCss />} />
                            <Route path="l10n-ru" element={<ArticleL10nRu />} />
                            <Route path="ui-by" element={<ArticleUiBy />} />
                            <Route path="i18n-kz" element={<ArticleI18nKz />} />
                            <Route path="en" element={<ArticleEn />} />
                            <Route path="ar" element={<ArticleAr />} />
                        </Route>

                        {/* Редирект для неизвестных путей в рамках локали */}
                        <Route path="*" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
                    </Route>

                    {/* Фолбек для неподдерживаемых локалей */}
                    <Route path="*" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
                </Routes>
            </I18nProvider>
        </BrowserRouter>
    );
}

export default App;