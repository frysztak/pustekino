import React, { Component } from "react";
import "./scss/bootstrap.scss";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Carousel from "react-bootstrap/Carousel";
import {
  MoviePreviewProps,
  MoviePreview
} from "./components/MoviePreview";

class App extends Component {
  render() {
    const movies: MoviePreviewProps[] = [
      {
        movieName: "Lego Movie",
        runtime: 107,
        genres: ["Familijny", "Animowany", "Przygodowy"],
        desktopImage:
          "https://multikino.pl/-/media/images/home-page/slider-hero-component/lego2-slider-d.jpg",
        mobileImage:
          "https://multikino.pl/-/media/images/home-page/slider-hero-component/lego2-slider-m.jpg"
      }
    ];

    return (
      <div className="App">
        <Navbar className="mx-auto tall-navbar" variant="dark" expanded={false}>
          <Navbar.Brand href="#home">
            <img src="/logo.svg" height="40" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="justify-content-end d-none">
              <Nav.Link href="#home">REPERTUAR</Nav.Link>
              <Nav.Link href="#link">WYDARZENIA</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Carousel indicators={false}>
          {movies.map((movie, i) => (
            <Carousel.Item key={i}>
              <MoviePreview {...movie} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default App;
