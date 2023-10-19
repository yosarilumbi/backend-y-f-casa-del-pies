import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">Casa Del Pies</Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/about" className="link-unstyled">Informacion</Link>
              </Nav.Link>


              <NavDropdown title="Usuario" id="usuario">
                <NavDropdown.Item>
                  <Link to="/usuario" className="link-unstyled">Registrar Usuario</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-usuario" className="link-unstyled">Listar Usuario</Link>
                </NavDropdown.Item>
              </NavDropdown>

        

              <NavDropdown title="Vendedor" id="vendedor">
                <NavDropdown.Item>
                  <Link to="/vendedor" className="link-unstyled">Registrar Vendedor</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-vendedor" className="link-unstyled">Listar Vendedor</Link>
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Clientes" id="clientes">
                <NavDropdown.Item>
                  <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/listaCliente" className="link-unstyled">Listar Clientes</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Ventas" id="ventas">
                <NavDropdown.Item>
                  <Link to="/ventas" className="link-unstyled">Registrar Ventas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-venta" className="link-unstyled">Listar Ventas</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Pagos" id="pagos">
                <NavDropdown.Item>
                  <Link to="/pagos" className="link-unstyled">Registrar Pagos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-pagos" className="link-unstyled">Listar Pagos</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Producto" id="producto">
                <NavDropdown.Item>
                  <Link to="/producto" className="link-unstyled">Registrar producto</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-producto" className="link-unstyled">Listar Producto</Link>
                </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Marcas" id="marcas">
                <NavDropdown.Item>
                  <Link to="/marcas" className="link-unstyled">Registrar Marcas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-marcas" className="link-unstyled">Listar Marcas</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Categorias" id="categorias">
                <NavDropdown.Item>
                  <Link to="/categorias" className="link-unstyled">Registrar Categorias</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-categoria" className="link-unstyled">Listar Categorias</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Descuentos" id="descuentos">
                <NavDropdown.Item>
                  <Link to="/descuento" className="link-unstyled">Registrar Descuento</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/listaDescuento" className="link-unstyled">Listar Descuentos</Link>
                </NavDropdown.Item>

              </NavDropdown>



            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">

            <Nav.Link>
              <Link to="/" className="link-unstyled">Inicio</Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/about" className="link-unstyled">About</Link>
            </Nav.Link>

            <NavDropdown title="Usuario" id="usuario">
                <NavDropdown.Item>
                  <Link to="/usuario" className="link-unstyled">Registrar Usuario</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-usuario" className="link-unstyled">Listar Usuario</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Vendedor" id="vendedor">
                <NavDropdown.Item>
                  <Link to="/vendedor" className="link-unstyled">Registrar Vendedor</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-vendedor" className="link-unstyled">Listar Vendedor</Link>
                </NavDropdown.Item>
              </NavDropdown>

            <NavDropdown title="Clientes" id="clientes">
              <NavDropdown.Item>
                <Link to="/customer" className="link-unstyled">Registrar Cliente</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/listaCliente" className="link-unstyled">Listar Clientes</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Ventas" id="ventas">
                <NavDropdown.Item>
                  <Link to="/ventas" className="link-unstyled">Registrar Ventas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-venta" className="link-unstyled">Listar Ventas</Link>
                </NavDropdown.Item>
              </NavDropdown>
  
              <NavDropdown title="Pagos" id="pagos">
                <NavDropdown.Item>
                  <Link to="/pagos" className="link-unstyled">Registrar Pagos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-pagos" className="link-unstyled">Listar Pagos</Link>
                </NavDropdown.Item>
              </NavDropdown>

            <NavDropdown title="Producto" id="producto">
                <NavDropdown.Item>
                  <Link to="/producto" className="link-unstyled">Registrar producto</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-producto" className="link-unstyled">Listar Producto</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Marcas" id="marcas">
                <NavDropdown.Item>
                  <Link to="/marcas" className="link-unstyled">Registrar Marcas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-marcas" className="link-unstyled">Listar Marcas</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Categorias" id="categorias">
                <NavDropdown.Item>
                  <Link to="/categorias" className="link-unstyled">Registrar Categorias</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-categoria" className="link-unstyled">Listar Categorias</Link>
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Descuentos" id="descuentos">
                <NavDropdown.Item>
                  <Link to="/descuento" className="link-unstyled">Registrar Descuento</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/listaDescuentos" className="link-unstyled">Listar Descuentos</Link>
                </NavDropdown.Item>
               </NavDropdown> 

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;