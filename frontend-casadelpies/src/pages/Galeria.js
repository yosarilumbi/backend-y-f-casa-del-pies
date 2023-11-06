import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Badge, Form, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Galeria({rol}) {
  const [productos, setProductos] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Realiza una solicitud GET al servidor para obtener los productos
  useEffect(() => {
    fetch('http://localhost:5000/crud/readProductos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return(
    <div>
      <Header rol={ rol} />
      
      <Container className="margen-contenedor">

      <Row className="mb-3">
        <Col sm="6" md="6" lg="4">
          <FloatingLabel controlId="search" label="Buscar">
            <Form.Control
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="g-3">
        {productos.map((producto) => (
          <Col sm="12" md="4" lg="3">
            <Card>
              <Card.Img className="image-card" variant="top" src={producto.imagen} alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>
                  {producto.descripcion}
                </Card.Text>
                <div>
                  <Badge bg="success">Precio: {producto.precio}</Badge>
                </div>
              </Card.Body>
              <Card.Body>
                <Card.Link href="#">Comprar</Card.Link>
              </Card.Body>
            </Card>
          </Col>            
        ))}
      </Row>
    </Container>

    </div>
  );
}

export default Galeria;