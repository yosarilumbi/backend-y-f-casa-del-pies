import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Pagos() {

  // Crear un estado para cada campo del formulario
  const [metododePago, setMetodoDePago] = useState('');
  const [codigoPago, setCodigoDePago] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha_pago, setFechaPago] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      metododePago,
      codigoPago,
      monto,
      fecha_pago, 
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createPagos', {
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
        setMetodoDePago('');
        setCodigoDePago('');
        setMonto('');
        setFechaPago('');
      } else {
        alert('Error al registrar pagos');
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
            <Card.Title>Registrar Pagos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="metododePago" label="Metodo de pago">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el metodo de pago"
                      value={metododePago }
                      onChange={(e) => setMetodoDePago(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="codigoPago" label="Codigo de Pago">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={codigoPago}
                      onChange={(e) => setCodigoDePago(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="monto" label="Monto de pago">
                    <Form.Control
                      type="number"
                      placeholder="Monto pago"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="fecha_pago" label="Fecha de pago">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione la fecha de pago"
                      value={fecha_pago}
                      onChange={(e) => setFechaPago(e.target.value)} 
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
export default Pagos;