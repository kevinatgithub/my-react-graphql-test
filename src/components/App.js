import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
// import Main from "./Main";
import Region from "./Main/Location/Region";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:5000/graphql",
    }),
    credentials: 'same-origin'
});

const App = () => {

    return (
        <ApolloProvider client={client}>
            <Region />
        </ApolloProvider>
    );
};

export default App;