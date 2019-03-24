import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Container from "react-bootstrap/Container";
import { Cinema } from "../redux/cinemas/types";

interface Props {
  cinema: Cinema | undefined;
}

export const NavBar: React.FC<Props> = ({ cinema }: Props) => (
  <Navbar className="mx-auto  navbar-lighter" variant="dark" expand="md">
    <Container>
      <Navbar.Brand>
        <Link to="/">
          <Logo />
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="ml-auto">
          {cinema ? (
            <Link to="/cinemas">
              <h5 className="mb-0">
                {cinema.chain} {cinema.name}
              </h5>
            </Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
