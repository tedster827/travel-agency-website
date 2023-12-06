// src/pages/_app.tsx

import React from 'react' // Reach for JSX Support
import {AppProps} from "next/app"; // AppProps type from Next.js for type-checking
import {ApolloProvider} from "@apollo/client"; // ApolloProvider to inject Apollo Client into the React component tree
import apolloClient from "../../../apollo-client"; // Importing the Apollo client instance
import '../../app/globals.css'
import {DevSupport} from "@react-buddy/ide-toolbox";

/**
 * Custom App component to initialize pages.
 *
 * This component is used by Next.js to initialize all pages. It wraps around all
 * page components and can be used to keep state when navigating between pages.
 * It's also the perfect place to inject global CSS and higher-order components.
 *
 * @param {AppProps} { Component, pageProps } The component and properties of the page, provided by Next.js
 * @returns {React.ReactNode} A React component that wraps the entire application
 *
 * FIXME: This file seems to be inactive, this might be needed for the GraphQL API integration. (It might be in the
 * wrong directory
 */
const MyApp = ({Component, pageProps}: AppProps): React.ReactNode => {
    console.log("MyApp Component has loaded")
    return (
        <ApolloProvider client={apolloClient}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <Component {...pageProps} />
            </DevSupport>
        </ApolloProvider>
    )
}

export default MyApp;