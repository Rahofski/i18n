import { type FC } from "react";
import { useIntl } from "react-intl";

import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleEn: FC = () => {
    const { formatMessage } = useIntl();

    return (
        <Layout>
            <main className={styles.article}>
                <h1>
                    {formatMessage({ id: "articleEn.title" })}
                </h1>

                <p>
                    {formatMessage({ id: "articleEn.text" })}
                </p>
            </main>
        </Layout>
    );
};