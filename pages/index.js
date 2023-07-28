import Head from 'next/head';

import Field from '@/components/Field';

export default function Home() {
    return (
        <>
            <Head>
                <title>snake</title>
                <meta name="description" content="snake" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Field />
        </>
    );
}
