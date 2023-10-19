import React, { useState, useEffect } from 'react';
import { Table, Button,  Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function ListaCliente() {
  const [cliente, setCliente] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedcliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    cedula:'',
    nombre:'',
    apellido:'',
    historialdecompras:'',
    direccionEnvio:'', 
  });

  // Función para abrir el modal y pasar los datos del cliente seleccionado
  const openModal = (cliente) => {
    setSelectedCliente(cliente);
    setFormData({
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      historialdecompras: cliente.historialdecompras,
      direccionEnvio: cliente.direccionEnvio
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

  const loadCliente = () => {
    fetch('http://localhost:5000/crud/readclientes')
      .then((response) => response.json())
      .then((data) => setCliente(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateClientes/${selectedcliente.id_Cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de cliente
          setShowModal(false);
          loadCliente(); // Cargar la lista de clientes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un Cliente
  const handleDelete = (id_Cliente) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este Cliente?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deleteClientes/${id_Cliente}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de cliente
            loadCliente();
          }
        })
        .catch((error) => console.error('Error al eliminar el cliente:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener las promociones
  useEffect(() => {
    fetch('http://localhost:5000/crud/readclientes')
      .then((response) => response.json())
      .then((data) => setCliente(data))
      .catch((error) => console.error('Error al obtener las promociones:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Cliente</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id_Cliente</th>
                <th>cedula</th>
                <th>nombre</th>
                <th>apellido</th>
                <th>historialdecompras</th>
                <th>direccionEnvio</th>
              </tr>
            </thead>
            <tbody>
              {cliente.map((cliente) => (
                <tr key={cliente.id_Cliente}>
                  <td>{cliente.id_Cliente}</td>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.historialdecompras}</td>
                  <td>{cliente.direccionEnvio}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(cliente)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(cliente.id_Cliente)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Cliente</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="cedula" label="Cedula Cliente">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su cedula "
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombre" label="Nombre Cliente">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="apellido" label="Apellido">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese su Apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="historialdecompras" label="Historial de compras">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese su historial"
                        name="historialdecompras"
                        value={formData.historialdecompras}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="12" lg="12">
                    <FloatingLabel controlId="direccionEnvio" label="Dirección de Envio ">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese su dirección"
                        name="direccionEnvio"
                        value={formData.direccionEnvio}
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

export default ListaCliente;