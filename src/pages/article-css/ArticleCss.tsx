import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleCss: FC = () => {
    return (
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleCss.title"
                    />
                </h1>

                <p>
                    <FormattedMessage
                        id="articleCss.intro"
                    />
                </p>

                <p>              
                    <FormattedMessage
                        id="articleCss.diff"
                        values={{
                            code: (chunks) => <code>{chunks}</code>
                        }}
                    />

                </p>


                <section className={styles.section}>
                    <h2>
                        <FormattedMessage
                            id="articleCss.whyImportant.title"
                        />
                    </h2>

                    <p>
                        <FormattedMessage
                            id="articleCss.whyImportant.text"
                        />
                    </p>

                    <FormattedMessage
                        id="articleCss.whyImportant.list"
                        values={{
                            ul: (chunks) => <ul className={styles.list}>{chunks}</ul>,
                            li: (chunks) => <li>{chunks}</li>
                        }}
                    />
                </section>

                <section className={styles.section}>
                    <h2>
                        <FormattedMessage
                            id="articleCss.conclusion.title"
                        />
                    </h2>

                    <p>
                        <FormattedMessage
                            id="articleCss.conclusion.text"
                        />
                    </p>
                </section>
            </main>
        </Layout>
    );
};
