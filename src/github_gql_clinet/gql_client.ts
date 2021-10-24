import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';


const cache = new InMemoryCache();

const TOKEN = ""
const GITHUB_GQL_URL = "https://api.github.com/graphql"

const httpLink = new HttpLink({
    uri: GITHUB_GQL_URL,
    headers: {
        authorization: `Bearer ${TOKEN}`
    }
})

export const client = new ApolloClient({
    link: httpLink,
    cache,
})

