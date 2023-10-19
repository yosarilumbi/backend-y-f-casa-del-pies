import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Productos() {

  // Crear un estado para cada campo del formulario 
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcionProducto] = useState('');
  const [precio, setPrecio] = useState('');
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      descripcion,
      precio,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createProductos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setNombre('');
        setDescripcionProducto('');
        setPrecio('');
      
      } else {
        alert('Error al registrar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header />
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registrar Productos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del producto"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la Descripcion del producto"
                      value={descripcion}
                      onChange={(e) => setDescripcionProducto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese el precio del producto"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}
export default Productos;