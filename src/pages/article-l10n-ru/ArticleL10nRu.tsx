import { type FC } from "react";
import { FormattedDate,FormattedMessage, FormattedNumber, useIntl } from "react-intl";

import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleL10nRu: FC = () => {
    const { formatMessage } = useIntl();

    const usersCount = 98000000;
    const percent = 78;
    const date = new Date(2015, 8, 1); // пример: июль 2015

    return (
        <Layout>
            <main className={styles.article}>
                <h1>{formatMessage({ id: "articleL10nRu.title" })}</h1>

                <p>
                    <FormattedMessage
                        id="articleL10nRu.text1"
                        values={{
                            usersCount: (
                                <FormattedNumber value={usersCount} />
                            ),
                            percent: (
                                <FormattedNumber value={percent} />
                            )
                        }}
                    />
                </p>

                <p>
                    <FormattedMessage
                        id="articleL10nRu.text2"
                        values={{
                            date: (
                                <FormattedDate
                                    value={date}
                                    year="numeric"
                                    month="long"
                                    day="numeric"
                                />
                            )
                        }}
                    />
                </p>
            </main>
        </Layout>
    );
};
