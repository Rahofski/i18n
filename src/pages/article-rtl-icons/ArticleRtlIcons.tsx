import cn from "classnames";
import { type FC } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { Layout } from "@/components";
import { LANG_DIRECTION } from "@/constants";
import {
    ClockIcon,
    GamepadIcon,
    MagnifierIcon,
    MessageIcon,
    PaperNoteIcon,
    WindowIcon,
} from "@/icons";
import { detectUserLanguage } from "@/lib/language";

import styles from "./styles.module.css";

export const ArticleRtlIcons: FC = () => {
    const intl = useIntl();
    const { pathname } = useLocation();
    const lang = detectUserLanguage(pathname);
    const isRtl = LANG_DIRECTION[lang as keyof typeof LANG_DIRECTION] === "rtl";
    return (
    <Layout>
        <main className={styles.article}>
                <h1>{intl.formatMessage({ id: "articleRtlIcons.title" }, { br: <br /> })}</h1>
                <p>{intl.formatMessage({ id: "articleRtlIcons.intro" })}</p>
            <section className={styles.section}>
                    <h2>{intl.formatMessage({ id: "articleRtlIcons.whyImportant.title" })}</h2>
                    <p>{intl.formatMessage({ id: "articleRtlIcons.whyImportant.text" })}</p>
            </section>
            <section className={styles.section}>
                    <h2>{intl.formatMessage({ id: "articleRtlIcons.flipIcons.title" })}</h2>
                    <p>{intl.formatMessage({ id: "articleRtlIcons.flipIcons.text" })}</p>
                <div className={cn(styles.icons)} data-testid="rtl-icons">
                    <span className={styles.rtlIconWrapper} style={isRtl ? { transform: "scaleX(-1)", display: "inline-block" } : { display: "inline-block" }}>
                        <PaperNoteIcon />
                    </span>
                    <span className={styles.rtlIconWrapper} style={isRtl ? { transform: "scaleX(-1)", display: "inline-block" } : { display: "inline-block" }}>
                        <MessageIcon />
                    </span>
                    <span className={styles.rtlIconWrapper} style={isRtl ? { transform: "scaleX(-1)", display: "inline-block" } : { display: "inline-block" }}>
                        <WindowIcon />
                    </span>
                </div>
            </section>
            <section className={styles.section}>
                    <h2>{intl.formatMessage({ id: "articleRtlIcons.dontFlipIcons.title" })}</h2>
                    <p>{intl.formatMessage({ id: "articleRtlIcons.dontFlipIcons.text" })}</p>
                    <div className={cn(styles.icons)} data-testid="not-rtl-icons">
                      <GamepadIcon />
                      <MagnifierIcon />
                      <ClockIcon />
                    </div>
                </section>
            <section className={styles.section}>
                    <h2>{intl.formatMessage({ id: "articleRtlIcons.conclusion.title" })}</h2>
                    <p>{intl.formatMessage({ id: "articleRtlIcons.conclusion.text1" })}</p>
                    <p dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: "articleRtlIcons.conclusion.text2" }) }} />
            </section>
        </main>
    </Layout>
);
};