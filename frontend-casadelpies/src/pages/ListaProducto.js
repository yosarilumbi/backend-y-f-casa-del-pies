import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function ListaProducto() {
  const [producto, setProducto] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
  });

  // Función para abrir el modal y pasar los datos del producto seleccionado
  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
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

  const loadProducto = () => {
    fetch('http://localhost:5000/crud/readProductos')
      .then((response) => response.json())
      .then((data) => setProducto(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };
  

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateProducto/${selectedProducto.id_Producto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de productos
          setShowModal(false);
          loadProducto(); // Cargar la lista de productos actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un producto
  const handleDelete = (id_Producto) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el producto
      fetch(`http://localhost:5000/crud/deleteProducto/${id_Producto}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de productos
            loadProducto();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los productos
  useEffect(() => {
    fetch('http://localhost:5000/crud/readProductos')
      .then((response) => response.json())
      .then((data) => setProducto(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
        <Card.Title className="mb-3">Listado de productos</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Producto</th>
                <th>Descripcion</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(producto) ? (
                producto.map((producto) => (
                  <tr key={producto.id_Producto}>
                    <td>{producto.id_Producto}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td>
                      <Button variant="primary" onClick={() => openModal(producto)}>
                        Actualizar
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(producto.id_Producto)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay productos disponibles</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Producto</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombre" label="Nombre de Producto">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del producto"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="descripcion" label="Descripcion">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="precio" label="Precio">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el precio"
                        name="precio"
                        value={formData.precio}
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

export default ListaProducto;

