import React from 'react'
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container } from "react-bootstrap"
const Header = () => {
    return (
        <div>

            <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        <LinkContainer to="/">
                            <Nav.Link >
                                <Navbar.Brand>Vvork-Tech-Store</Navbar.Brand>
                            </Nav.Link>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <LinkContainer to="/cart">
                                    <Nav.Link >
                                        <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <Nav.Link >
                                        <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                                    </Nav.Link>
                                </LinkContainer>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

        </div>
    )
}

export default Header