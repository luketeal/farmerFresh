import './_app.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/_header/_header'
import Splash from './pages/_splash'
import Signin from './pages/_signin';
import SignUp from './pages/_signup';
import FarmResults from './pages/_farmresults';
import FarmerDash from './pages/_farmerdash';
import Footer from './components/_footer/_footer';
import FarmVeggieResults from './pages/_farmveggieresults';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { FarmProvider } from './utils/_farmcontext';
import {useState} from "react";
import {useEffect} from 'react';
import Auth from './utils/auth';
import { setContext } from '@apollo/client/link/context';





// ------------------------------------------ added this link to link auth with ---------------------------------------------------------------
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});
// --------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------- added this authlink function that grabs the headers and adds the token ---------------------------

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


// ---------------------------------------------------------------------------------------------------------------------------------------------


// const client = new ApolloClient({
//   uri: '/graphql',                    commented this code out as a copy of original befoe my change.
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({

  link: authLink.concat(httpLink),   // added this line to add the authlink function to concat the httplink. 
  cache: new InMemoryCache(),
});




//how should we handle splash... 
function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ApolloProvider client={client}>
      <FarmProvider>
    <Router>
      <div className={"App " +(darkMode && "active")}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
        <div className="app-container">
          
            <Route exact path="/">
              <Splash/>
            </Route>
            <Route exact path="/farmresults">
              <FarmResults />
            </Route>
          
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            
            <Route exact path="/farmerdash">
            {Auth.loggedIn() ? (
              <FarmerDash />
              ) : (
                <Signin />
              )}
            </Route>
            <Route exact path="/farmveggieresults">
              <FarmVeggieResults />

            </Route>
          
        </div>
        <Footer />

      </div>
    </Router>
    </FarmProvider>
    </ApolloProvider>
    // <SignUp></SignUp>
  );
}

export default App;
