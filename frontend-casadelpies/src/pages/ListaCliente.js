import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaCliente() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    cedula : '',
    nombre: '', 
    apellido: '',
    historialdecompras: '',
    direccionEnvio: '',
  

  });

  // Función para abrir el modal y pasar los datos del vendedor seleccionado
  const openModal = (clientes) => {
    setSelectedCliente(clientes);

    setFormData({
        cedula:clientes.cedula,
        nombre:clientes.nombre,
        apellido:clientes.apellido,
        historialdecompras:clientes.historialdecompras,
        direccionEnvio:clientes.direccionEnvio,
       
    });
    setShowModal(true);
  };


  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadCliente = () => {
    fetch('http://localhost:5000/crud/readUsuarioyClientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los usuarios y clientes:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateClientesr/${selectedCliente.id_Cliente}`, {
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
          loadCliente(); // Cargar la lista de cliente actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (id_Usuario) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este vendedor?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteClienteUsuario/${id_Usuario}`, {
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

  // Realiza una solicitud GET al servidor para obtener los vendedores
  useEffect(() => {
    fetch('http://localhost:5000/crud/readUsuarioyClientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes y usuarios:', error));
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
                <th>ID</th>
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Historial de Compras</th>
                <th>Direccion de Envio</th>
              
              
            
              </tr>
            </thead>
            <tbody>
              {clientes.map((clientes) => (
                <tr key={clientes.id_Cliente}>
                  <td>{clientes.id_Cliente}</td>
                  <td>{clientes.cedula}</td>
                  <td>{clientes.nombre}</td>
                  <td>{clientes.apellido}</td>
                  <td>{clientes.historialdecompras}</td>
                  <td>{clientes.direccionEnvio}</td>
                 
                 
                  <td>
                  <Button variant="primary" onClick={() => openModal(clientes)}><FaPencil/></Button>
                  <Button variant="danger" onClick={() => handleDelete(clientes.id_Cliente)}><FaTrashCan/></Button>
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
              <Card.Title>Registro de Vendedor</Card.Title>
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