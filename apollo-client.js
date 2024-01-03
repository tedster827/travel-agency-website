import { ApolloClient, InMemoryCache, HttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";


// HTTP connection to the TravelAgencyDestinationFinder  GraphQL API
const httpLink = new HttpLink({
    uri: 'https://dp4ya2czqfbdpa3ibnmv5bl2e4.appsync-api.us-west-1.amazonaws.com/graphql'
});

// Auth link to set the headers with the token
const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
});

// Apollo Client instance
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default apolloClient;