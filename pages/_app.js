import React from 'react';

import '../components/shared/index.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <Component {...pageProps } />
    )
}