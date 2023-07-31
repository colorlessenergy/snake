import Head from 'next/head';
import { useState } from 'react';

import Field from '@/components/Field';

export default function Home() {
    const [score, setScore] = useState(0);

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

            <div className="score">{score}</div>

            <Field setScore={setScore} />
        </>
    );
}
