import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Splash from './pages/Splash'
import Testimonial from './pages/Testimonials';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';
import FarmResults from './pages/FarmResults';
import FarmerDash from './pages/FarmerDash';
import Footer from './components/Footer/Footer';
import TestPage from './pages/TestPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

//how should we handle splash... 
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Header />
        <div className="app-container">
          <Route exact path="/">
            <Splash />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/farmresults">
            <FarmResults />
          </Route>
          <Route exact path="/farmerdash">
            <FarmerDash />
          </Route>
          <Route exact path="/testpage">
            <TestPage/>
          </Route>
        </div>
        <Footer />

      </div>
    </Router>
    </ApolloProvider>
    // <SignUp></SignUp>
  );
}

export default App;
