import type { FC, PropsWithChildren } from "react";
import {useIntl} from "react-intl";
import { Link } from "react-router-dom";

import { BRAND_NAMES } from "@/constants";
import { BrandLogoIcon, TelegramIcon, VkontakteIcon } from "@/icons";

import { LangSelect } from "../lang-select";
import { useI18n } from "../LocaleProvider";
import styles from "./styles.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { locale } = useI18n();
    const { formatMessage } = useIntl();
    return (
    <>
        <div className={styles.header}>
            <div className={styles.headerContent}>
                    <Link className={styles.headerBrand} to={`/${locale}`}>
                    <BrandLogoIcon />

                    <span className={styles.headerBrandText}>
                        {BRAND_NAMES[locale]}
                    </span>
                </Link>

                <LangSelect />
            </div>
        </div>

        <div className={styles.contentContainer}>{children}</div>

        <div className={styles.footer}>
            <div
                className={styles.footerSocialLinks}
                data-testid="social-icons"
            >
                {[TelegramIcon, VkontakteIcon].map((Icon, index) => (
                    <a key={index} href="">
                        <Icon />
                    </a>
                ))}
            </div>

            <span className={styles.footerText}>
    {formatMessage(
      { 
        id: 'layout.footer.copyright' 
      }, 
      {
        yearStart: 2024,
        yearEnd: 2025,
        link: (chunks: React.ReactNode) => (
        <a className={styles.textLink} href="">
          {chunks}
        </a>
        ),
        brand: BRAND_NAMES[locale]
      }
    )}
    </span>
        </div>
    </>)
};
