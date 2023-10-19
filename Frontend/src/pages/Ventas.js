import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Ventas() {

  // Crear un estado para cada campo del formulario
  const [fecha, setFecha] = useState('');
  const [Estado, setEstadodeLaVenta] = useState('');
  const [Presencial_enLinea, setPresencial_0__EN_LineaLaVenta] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      fecha,
      Estado,
      Presencial_enLinea,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createVentas', {
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
        setFecha('');
        setEstadodeLaVenta('');
        setPresencial_0__EN_LineaLaVenta('');
    
      } else {
        alert('Error al registrar la venta');
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
            <Card.Title>Registro de Ventas</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="fecha" label="Fecha">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la Fecha"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Estado" label="Estado">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el Estado de la Venta"
                      value={Estado}
                      onChange={(e) => setEstadodeLaVenta(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="presencial_enLinea" label="Presencial o en Linea">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese como fue realizada la venta"
                      value={Presencial_enLinea}
                      onChange={(e) => setPresencial_0__EN_LineaLaVenta(e.target.value)} 
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
export default Ventas;