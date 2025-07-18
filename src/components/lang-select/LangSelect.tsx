import { type FC, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useI18n } from '@/components/LocaleProvider';
import { SUPPORTED_LANGS } from "@/constants";
import { geoService } from "@/lib/geo-service";
import { DoneIcon, EarthIcon } from "@/icons";
import type { Lang } from "@/types";

import { useClickOutside } from "./hooks";
import styles from "./styles.module.css";

const LANG_LABEL: Record<Lang, string> = {
    ru: "Русский",
    en: "English",
    ar: "اَلْعَرَبِيَّةُ",
};

export const LangSelect: FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { locale: currentLocale } = useParams<{ locale: string }>();
    const { setLocale } = useI18n();

    const selectedLang = (currentLocale?.split('-')[0] || 'en') as Lang;

    const handleMenuClose = useCallback(() => {
        setShowMenu(false);
    }, []);

    const handleMenuToggle = useCallback(() => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    }, []);

    const langSelectRef = useClickOutside<HTMLDivElement>(handleMenuClose);

    const handleLangChange = (lang: Lang) => {
        // Для русского языка добавляем регион
        if (lang === 'ru') {
            const region = geoService.getCurrentRegion(window.location.search);
            setLocale(`${lang}-${region}` as Lang);
        } else {
            setLocale(lang);
        }
    }; 

    return (
        <div className={styles.langSelect} ref={langSelectRef}>
            <button
                className={styles.langSelectButton}
                onClick={handleMenuToggle}
                data-testid="lang-select-button"
            >
                <span className={styles.langSelectText}>
                    {LANG_LABEL[selectedLang]}
                </span>

                <EarthIcon />
            </button>

            {showMenu && (
                <ul className={styles.langSelectMenu} data-testid="lang-select-menu">
                    {SUPPORTED_LANGS.map((lang) => {
                        const langName = LANG_LABEL[lang];
                        return (
                            <li
                                className={styles.langSelectMenuItem}
                                key={lang}
                                onClick={() => {
                                    handleLangChange(lang);
                                    handleMenuClose();
                                }}
                            >
                                <Link to={""}>
                                    <span className={styles.langSelectMenuItemText}>
                                        {langName}
                                    </span>
                                </Link>
                                {lang === selectedLang && <DoneIcon />}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
