import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function ListaCategoria({rol}) {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategorias, setSelectedCategoria] = useState({});
  const [formData, setFormData] = useState({
    id_Categoria: '',
    nombre_C: '',
    descripcion: '',
   
  });

  // Función para abrir el modal y pasar los datos de la promoción seleccionada
  const openModal = (categorias) => {
    setSelectedCategoria(categorias);



    setFormData({
      id_Categoria: categorias.id_Categoria,
      nombre_C: categorias.nombre_C,
      descripcion: categorias.descripcion,
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

  const loadCategorias = () => {
    fetch('http://localhost:5000/crud/readcategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener los descuentos:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatecategorias/${selectedCategorias.id_Categoria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de categorias
          setShowModal(false);
          loadCategorias(); // Cargar la lista de categoria actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar una promoción
  const handleDelete = (id_Categoria) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta categoria?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deletecategorias/${id_Categoria}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de categorias
            loadCategorias();
          }
        })
        .catch((error) => console.error('Error al eliminar la categoria:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener las categorias
  useEffect(() => {
    fetch('http://localhost:5000/crud/readcategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener las categorias:', error));
  }, []);

  return (
    <div>
      <Header rol={ rol}/>

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Categoria</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Categoria</th>
                <th>Descripcion</th>
            
              </tr>
            </thead>
            <tbody>
              {categorias.map((categorias) => (
                <tr key={categorias.id_Categoria}>
                  <td>{categorias.id_Categoria}</td>
                  <td>{categorias.nombre_C}</td>
                  <td>{categorias.descripcion}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(categorias)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(categorias.id_Categoria)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar categorias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Categorias</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombre_C" label="Nombre Marca">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre "
                        name="nombre_C"
                        value={formData.nombre_C}
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

export default ListaCategoria;