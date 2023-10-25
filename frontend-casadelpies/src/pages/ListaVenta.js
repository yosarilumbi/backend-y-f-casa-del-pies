import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function ListaVenta() {
  const [venta, setVenta] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState({});
  const [formData, setFormData] = useState({
    cantidadProducto: '',
    total: '',
    metododePago: '',
    fecha: '',
    Estado: '',
    presencial_enLinea: '',
   
  });

  // Función para abrir el modal y pasar los datos de la venta seleccionada
  const openModal = (venta) => {
    setSelectedVenta(venta);

    // Formatea la fecha para el campo Fecha_Inicio
    const formattedFecha = formatDateForInput(venta.fecha);


    
    function calculatetotal(formData) {
      // Supongamos que el total se calcula multiplicando la cantidad de productos por 10
      const cantidadProducto = parseFloat(formData.cantidadProducto);
      const total = cantidadProducto * 10;
      return isNaN(total) ? 0 : total;
    }
    
    

    setFormData({
      cantidadProducto:venta.cantidadProducto,
      total:venta.total,
      metododePago:venta.metododePago,
      fecha: formattedFecha,
      Estado: venta.Estado,
      presencial_enLinea: venta.presencial_enLinea,
     
    });
    setShowModal(true);
  };

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  function calculatetotal(formData) {
    const cantidadProducto = parseFloat(formData.cantidadProducto);
    const tarifaPorProducto = parseFloat(formData.tarifaPorProducto); // Agrega un campo tarifaPorProducto al formData
    const total = isNaN(cantidadProducto) || isNaN(tarifaPorProducto)
      ? 0
      : cantidadProducto * tarifaPorProducto;
    return total;
  }

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };





  const loadVenta = () => {
    fetch('http://localhost:5000/crud/readVenta')
      .then((response) => response.json())
      .then((data) => setVenta(data))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateVentas/${selectedVenta.cod_Venta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de las ventas
          loadVenta(); // Cargar la lista de venta actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar una venta
  const handleDelete = (cod_Venta) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta venta?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deleteVentas/${cod_Venta}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de venta
            loadVenta();
          }
        })
        .catch((error) => console.error('Error al eliminar la venta:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener las ventas
  useEffect(() => {
    fetch('http://localhost:5000/crud/readVenta')
      .then((response) => response.json())
      .then((data) => setVenta(data))
      .catch((error) => console.error('Error al obtener la venta:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Venta</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cantidad Producto</th>
                <th>Total</th>
                <th>Metodo de Pago</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Presencial o en linea</th>
              </tr>
            </thead>
            <tbody>
              {venta.map((venta) => (
                <tr key={venta.cod_Venta}>
                  <td>{venta.cod_Venta}</td>
                  <td>{venta.cantidadProducto}</td>
                  <td>{venta.total}</td> {}
                  <td>{venta.metododePago}</td>
                  <td>{formatDateForInput(venta.fecha)}</td>
                  <td>{venta.Estado}</td>
                  <td>{venta.presencial_enLinea}</td>
                  <td>

                    
                    <Button variant="primary" onClick={() => openModal(venta)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(venta.cod_Venta)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Venta</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="cantidadProducto" label="Cantidad de Producto">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la cantidad de producto "
                        name="cantidadProducto"
                        value={formData.cantidadProducto}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="total" label="Total">
                      <Form.Control
                        type="number"
                        placeholder="Total de la venta"
                        name="total"
                        value={formData.total}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="metododePago" label="Metodo de pago">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese el metodo de pago"
                        name="metododePago"
                        value={formData.metododePago}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="fecha" label="Fecha Venta">
                      <Form.Control 
                        type="date" 
                        placeholder="Seleccione la fecha de la venta"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="Estado" label="Estado de la venta">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese el estado de la venta"
                        name="Estado"
                        value={formData.Estado}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="presencial_enLinea" label="Venta presencial o en linea">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese como se realizo la venta"
                        name="presencial_enLine"
                        value={formData.presencial_enLinea}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>




                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default ListaVenta;