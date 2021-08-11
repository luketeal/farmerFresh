import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Splash from './pages/Splash'
import Testimonial from './pages/Testimonials';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';
// import Footer from './components/Footer/Footer';

//how should we handle splash... 
function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
          <div className="app-container">
            <Route exact path="/">
              <Splash />
            </Route>
            <Route exact path="/login">
              <Signin />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </div>
        <Testimonial/>

      </div>
    </Router>
    // <SignUp></SignUp>
  );
}

export default App;
