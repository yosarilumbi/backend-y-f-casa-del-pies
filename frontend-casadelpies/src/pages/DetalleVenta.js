import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function DetalleVenta({rol}) {

  // Crear un estado para cada campo del formulario
  
  const [producto, setProductos] = useState([]);
  const [id_Producto, setIDProducto] = useState('');

  const [PrecioUnitario, setPrecioUnitario ] = useState('');
  const [TotalDetalle, setTotalDetalle] = useState('');

  const [ventas, setVentas] = useState([]);
  const [cod_Venta, setCodigoVenta] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      id_Producto,  
      PrecioUnitario,  
      TotalDetalle,  
      cod_Venta,
     
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createDetalleVenta', {
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
        setIDProducto('');
        setPrecioUnitario('');
        setTotalDetalle('');
        setCodigoVenta('');
      } else {
        alert('Error al registrar el detalleVenta');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener los productos
    fetch('http://localhost:5000/crud/readProductos')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las Categorias obtenidas
        setProductos(data);
      })
      .catch(error => {
        console.error('Error al obtener los productos', error);
      });
  }, []);


  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener los productos
    fetch('http://localhost:5000/crud/readVenta')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las ventas obtenidas
        setVentas(data);
      })
      .catch(error => {
        console.error('Error al obtener las ventas', error);
      });
  }, []);



  return(
    <div>
      <Header rol={ rol}/>
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Detalle Venta</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

              <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Producto" label="Producto">
                    <Form.Select
                      aria-label="producto"
                      value={id_Producto}
                      onChange={(e) => setIDProducto(e.target.value)}
                    >
                      <option>Seleccione los productos</option>
                      {producto.map((producto) => (
                        <option key={producto.id_Producto} value={producto.id_Producto}>
                          {producto.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="PrecioUnitario" label="Precio Uniitario">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el precio del producto"
                      value={PrecioUnitario}
                      onChange={(e) => setPrecioUnitario(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="TotalDetalle" label="Total Detalle">
                    <Form.Control 
                      type="number" 
                      placeholder="Total DetalleVenta"
                      value={TotalDetalle}
                      onChange={(e) => setTotalDetalle(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="cod_venta" label="codigo Venta">
                    <Form.Select
                      aria-label="ventas"
                      value={cod_Venta}
                      onChange={(e) => setCodigoVenta(e.target.value)}
                    >
                      <option>Seleccione las ventas</option>
                      {ventas.map((ventas) => (
                        <option key={ventas.cod_Venta} value={ventas.cod_Venta}>
                          {ventas.cod_Venta}
                        </option>
                      ))}
                    </Form.Select>
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

export default DetalleVenta;