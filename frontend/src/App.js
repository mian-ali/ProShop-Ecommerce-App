import React from 'react'
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from './Components/Header';
import Footer from './Components/Footer'
import HomeScreen from './screen/HomeScreen'
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/loginScreen';

function App() {
  return (
    <>
      <Router>

        <Header />
        <main className="py-3">
          <Container>
            <Route path="/login" component={LoginScreen } />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" component={HomeScreen} exact />

          </Container>

        </main>
        <Footer />

      </Router>
    </>
  );
}
export default App;


