import React, { Component } from 'react'
import ApiService from "./ApiService";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/jquery/dist/jquery.min.js'
import { Navbar, Nav, Form, FormControl, Button, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class NavigationBar extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="#home">Bingofy</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/register-user">Register User</Nav.Link>
						<Nav.Link href="/add-user">Add User To List</Nav.Link>
						<Nav.Link href="/login-user">Login</Nav.Link>
						<NavDropdown title="Others" id="basic-nav-dropdown">
							<NavDropdown.Item href="/recipes">Recipes</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Notes</NavDropdown.Item>
							<NavDropdown.Divider/>
							<NavDropdown.Item href="#action/3.4">Feedback</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}

}

export default NavigationBar;