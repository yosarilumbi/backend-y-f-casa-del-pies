import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function ListaPago() {
  const [pago, setPago] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPago, setSelectedPago] = useState({});
  const [formData, setFormData] = useState({
    metododePago: '',
    codigoPago: '',
    monto: '',
    fecha_pago: '',
    
  });

  // Función para abrir el modal y pasar los datos del pago seleccionada
  const openModal = (pago) => {
    setSelectedPago(pago);

    // Formatea la fecha para el campo Fecha_pago
    const formattedFechaPago = formatDateForInput(pago.fecha_Pago);
        

    setFormData({
        metododePago:pago.metododePago,
        codigoPago:pago.codigoPago,
        monto:pago.monto,
        fecha: formattedFechaPago,
       
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

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadPago = () => {
    fetch('http://localhost:5000/crud/readpagos')
      .then((response) => response.json())
      .then((data) => setPago(data))
      .catch((error) => console.error('Error al obtener los pagos:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatePagos/${selectedPago.id_Pago}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de pagos
          setShowModal(false);
          loadPago(); // Cargar la lista de pagos actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar una promoción
  const handleDelete = (id_Pago) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este pago?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deletePagos/${id_Pago}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de pagos
            loadPago();
          }
        })
        .catch((error) => console.error('Error al eliminar el pago:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los pagos
  useEffect(() => {
    fetch('http://localhost:5000/crud/readpagos')
      .then((response) => response.json())
      .then((data) => setPago(data))
      .catch((error) => console.error('Error al obtener los pagos:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Lista de Pagos</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Metodo de Pago</th>
                <th>Codigo de Pagos</th>
                <th>Monto</th>
                <th>Fecha Pago</th>
              </tr>
            </thead>
            <tbody>
              {pago.map((pago) => (
                <tr key={pago.id_Pago}>
                  <td>{pago.id_Pago}</td>
                  <td>{pago.metododePago}</td>
                  <td>{pago.codigoPago}</td>
                  <td>{pago.monto}</td>
                  <td>{formatDateForInput(pago.fecha_pago)}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(pago)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(pago.id_Pago)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Pago</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="metododePago" label="Código de descuento">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el metodo de pago"
                        name="metododePago"
                        value={formData.metododePago}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="codigoPago" label="Codigo del pago">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el codigo del pago"
                        name="codigoPago"
                        value={formData.codigoPago}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>


                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="monto" label="Monto total a pagar">
                      <Form.Control
                        type="number"
                        placeholder="Monto total a pagar"
                        name="monto"
                        value={formData.monto}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="fecha_pago" label="Fecha pago">
                      <Form.Control 
                        type="date" 
                        placeholder="Seleccione la fecha pago"
                        name="fecha_pago"
                        value={formData.fecha_pago}
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

export default ListaPago;