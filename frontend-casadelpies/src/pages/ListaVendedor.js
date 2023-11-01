import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function ListaVendedor() {
  const [vendedor, setVendedor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVendedor, setSelectedVendedor] = useState({});
  const [formData, setFormData] = useState({
    direccion: '',
    telefono: '',
    nombre: '',
    apellido: '',

  });

  // Función para abrir el modal y pasar los datos del vendedor seleccionado
  const openModal = (vendedor) => {
    setSelectedVendedor(vendedor);

    setFormData({
        direccion: vendedor.direccion,
        telefono:vendedor.telefono,
        nombre:vendedor.nombre,
        apellido:vendedor.apellido,
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

  const loadVendedor = () => {
    fetch('http://localhost:5000/crud/readUsuarioyVendedor')
      .then((response) => response.json())
      .then((data) => setVendedor(data))
      .catch((error) => console.error('Error al obtener los usuariosyvendedor:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateVendedor/${selectedVendedor.ID_Vendedor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de vendedor
          setShowModal(false);
          loadVendedor(); // Cargar la lista de vendedor actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (id_Usuario) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este vendedor?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteVendedorUsuario/${id_Usuario}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de vendedor
            loadVendedor();
          }
        })
        .catch((error) => console.error('Error al eliminar el vendedor:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los vendedores
  useEffect(() => {
    fetch('http://localhost:5000/crud/readUsuarioyVendedor')
      .then((response) => response.json())
      .then((data) => setVendedor(data))
      .catch((error) => console.error('Error al obtener los vendedores y usuarios:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Vendedor</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Direccion</th>
                <th>Telefono</th>
              
            
              </tr>
            </thead>
            <tbody>
              {vendedor.map((vendedor) => (
                <tr key={vendedor.ID_Vendedor}>
                  <td>{vendedor.ID_Vendedor}</td>
                  <td>{vendedor.direccion}</td>
                  <td>{vendedor.telefono}</td>
                  <td>{vendedor.nombre}</td>
                  <td>{vendedor.apellido}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(vendedor)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(vendedor.id_Usuario)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Vendedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Vendedor</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="direccion" label="Dirección">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="telefono" label="Telefono">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el numero de telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>


                  <Col sm="12" md="6" lg="8">
                    <FloatingLabel controlId="nombre" label="Nombre">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese su nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="apellido" label="Apellido">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese su apellido"
                        name="apellido"
                        value={formData.apellido}
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

export default ListaVendedor;