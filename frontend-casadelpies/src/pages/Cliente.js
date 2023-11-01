import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Cliente() {

  // Crear un estado para cada campo del formulario
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [historialdecompras, setHistorialDeCompras] = useState('')
  const [direccionEnvio, setDireccionEnvio] = useState('');;
  const [nombre_Usuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      cedula,
      nombre,
      apellido,
      historialdecompras,
      direccionEnvio,
      nombre_Usuario,  // Agregar el campo nombre_Usuario
      contrasena      // Agregar el campo contrasena
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createClientes', {
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
        setCedula('');
        setNombre('');
        setApellido('');
        setHistorialDeCompras('');
        setDireccionEnvio('');
        setNombreUsuario(''); 
        setContrasena('');   

      } else {
        alert('Error al registrar el cliente');
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
            <Card.Title>Registrar Cliente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

              <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="cedula" label="Cédula">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la cédula"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

              <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="apellido" label="Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="direccionEnvio" label="Dirección">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la dirección"
                      value={direccionEnvio}
                      onChange={(e) => setDireccionEnvio(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="12">
                  <FloatingLabel controlId="historialdecompras" label="Historial de compras">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese el historial de compras" 
                      value={historialdecompras}
                      onChange={(e) => setHistorialDeCompras(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_Usuario" label="Nombre Usuario">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su nombre usuario"
                      value={nombre_Usuario}
                      onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="contrasena" label="Contraseña">
                    <Form.Control
                      type="password"
                      placeholder="Ingrese su contraseña"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
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
export default Cliente;