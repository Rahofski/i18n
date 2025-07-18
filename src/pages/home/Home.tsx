import { type FC } from "react";
import { FormattedDate, FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import articleAr from "@/assets/article-ar.jpg";
import articleCss from "@/assets/article-css.jpg";
import articleEn from "@/assets/article-en.jpg";
import articleI18nKz from "@/assets/article-i18n-kz.jpg";
import articleL10nRu from "@/assets/article-l10n-ru.jpg";
import articleRtlIcons from "@/assets/article-rtl-icons.jpg";
import articleUiBy from "@/assets/article-ui-by.jpg";
import { Layout } from "@/components";
import { useI18n } from "@/components/LocaleProvider";
import type { Locale } from "@/types";

import styles from "./styles.module.css";

const ARTICLES = [
    {
        id: "rtlArticle",
        imageUrl: articleRtlIcons,
        articleLink: "article/rtl-icons",
    },
    {
        id: "cssArticle",
        imageUrl: articleCss,
        articleLink: "article/css",
    },
];

const getRegionArticleByLocale = (locale: Locale) => {
    switch (locale) {
        case "ru":
        case "ru-RU":
            return {
                id: "ruArticle",
                imageUrl: articleL10nRu,
                articleLink: "article/l10n-ru",
            };
        case "ru-BY":
            return {
                id: "byArticle",
                imageUrl: articleUiBy,
                articleLink: "article/ui-by",
            };
        case "ru-KZ":
            return {
                id: "kzArticle",
                imageUrl: articleI18nKz,
                articleLink: "article/i18n-kz",
            };
        case "ar":
            return {
                id: "arArticle",
                imageUrl: articleAr,
                articleLink: "article/ar",
            };
        case "en":
        default:
            return {
                id: "enArticle",
                imageUrl: articleEn,
                articleLink: "article/en",
            };
    }
};

export const Home: FC = () => {
    const { locale } = useI18n();
    const { formatMessage } = useIntl();

    const regionArticle = getRegionArticleByLocale(locale);

    return (
        <Layout>
            <main className={styles.content}>
                <section className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        {formatMessage({ id: "homePage.hero.title" })}
                    </h1>

                    <div className={styles.heroDetails}>
                        <span className={styles.heroDetailsItem}>
                                    <FormattedMessage
                                  id="homePage.hero.conference"
                                  values={{ year: 2025 }}
                              />
                        </span>

                        <span className={styles.heroDetailsItem}>
                                <FormattedDate
                                    value={new Date(2025, 7, 15)}
                                    day="numeric"
                                    month="long"
                                    year="numeric"
                                />
                            </span>

                        <span className={styles.heroDetailsItem}>
                            {formatMessage({ id: "homePage.hero.location" })}
                        </span>

                        <span className={styles.heroDetailsItem}>
                            {formatMessage(
                                { id: "homePage.hero.price" },
                                { price: <FormattedNumber value={35000} style="currency" currency="RUB" /> }
                            )}
                        </span>
                    </div>

                    <a className={styles.heroRegister} href="">
                        {formatMessage({ id: "homePage.hero.register" })}
                    </a>
                </section>

                <section className={styles.regionArticle}>
                    <h2 className={styles.regionArticleTitle}>
                        {formatMessage({ id: "homePage.regionArticle.title" })}
                    </h2>

                    <Link className={styles.articleCard} to={regionArticle.articleLink}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>
                                {formatMessage({ id: `homePage.${regionArticle.id}.title` })}
                            </h3>

                            <p className={styles.cardDescription}>
                                {formatMessage({ id: `homePage.${regionArticle.id}.description` })}
                            </p>

                            <span className={styles.cardRead}>
                                {formatMessage({ id: "homePage.article.read" })}
                            </span>
                        </div>

                        <img className={styles.cardImage} src={regionArticle.imageUrl} />
                    </Link>
                </section>

                <section className={styles.articles}>
                    <h2 className={styles.articlesTitle}>
                        {formatMessage({ id: "homePage.articles.title" })}
                    </h2>

                    {ARTICLES.length > 0 && (
                        <p className={styles.articlesDescription}>
                            {formatMessage(
                                { id: "homePage.articles.description" },
                                { count: ARTICLES.length }
                            )}
                        </p>
                    )}

                    <div className={styles.articlesList}>
                        {ARTICLES.map(({ id, imageUrl, articleLink }, index) => (
                            <Link
                                key={index}
                                className={styles.articleCard}
                                to={articleLink}
                            >
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>
                                        {formatMessage({ id: `homePage.${id}.title` })}
                                    </h3>

                                    <p className={styles.cardDescription}>
                                        {formatMessage({ id: `homePage.${id}.description` })}
                                    </p>

                                    <span className={styles.cardRead}>
                                        {formatMessage({ id: "homePage.article.read" })}
                                    </span>
                                </div>

                                <img className={styles.cardImage} src={imageUrl} />
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </Layout>
    );
};