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
import FarmVeggieResults from './pages/FarmVeggieResults';
import TestPage from './pages/TestPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { FarmProvider } from './utils/FarmContext';
import {useState} from "react";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});




//how should we handle splash... 
function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ApolloProvider client={client}>
    <Router>
      <div className={"App " +(darkMode && "active")}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
        <div className="app-container">
          <FarmProvider>
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
              <FarmerDash />
            </Route>

            <Route exact path="/testpage">
              <TestPage/>
            </Route>
            <Route exact path="/farmveggieresults">
              <FarmVeggieResults />

            </Route>
          </FarmProvider>
        </div>
        <Footer />

      </div>
    </Router>
    </ApolloProvider>
    // <SignUp></SignUp>
  );
}

export default App;
