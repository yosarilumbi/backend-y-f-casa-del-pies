import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import axios from 'axios';


function Imagenes() {
  const [nombre, setNombre] = useState('');
  const [imagenUrl, setImagenURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre,
      imagenUrl,
    };

    try {
      const response = await axios.post('http://localhost:5000/crud/createimagenes', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Registro exitoso');
        setNombre('');
        setImagenURL('');
      } else {
        alert('Error al registrar imagen');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://localhost:5000/crud/guardarImagen', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSelectedFile(null);
      alert('Imagen guardada', response.data.imageUrl);
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Ingresar Imagenes</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingresar Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="imagenUrl" label="ImagenURL">
                    <Form.Control
                      type="text"
                      placeholder="Registrar Imagen"
                      value={imagenUrl}
                      onChange={(e) => setImagenURL(e.target.value)}
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
        <Form className="mt-3" onSubmit={handleFileUpload}>
          <Row className="g-3">
            <Col sm="6" md="6" lg="6">
              <Form.Group controlId="selectedFile" className="mb-3">
                <Form.Control
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  size="lg"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="center-button">
            <Button variant="primary" type="submit" className="mt-3" size="lg">
              Registrar
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Imagenes;


