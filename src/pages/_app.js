import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';

export default function MyApp({ Component, pageProps }) {

    return (
        <LayoutProvider>
            <Component {...pageProps} />
        </LayoutProvider>
    )

}
