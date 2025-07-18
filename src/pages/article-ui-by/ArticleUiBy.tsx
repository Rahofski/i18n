import { type FC } from "react";
import { useIntl } from "react-intl";

import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleUiBy: FC = () => {
    const { formatMessage } = useIntl();
    return (
    <Layout>
        <main className={styles.article}>
            <h1>
                {formatMessage({ id: "articleUiBy.title" })}
            </h1>

            <p>
                {formatMessage({ id: "articleUiBy.text1" })}
            </p>
        </main>
    </Layout>
    )
};
