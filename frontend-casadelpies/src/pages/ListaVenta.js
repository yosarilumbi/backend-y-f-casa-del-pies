import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaVenta({rol}) {
  const [ventas, setVenta] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState({});
  const [formData, setFormData] = useState({
     id_Cliente: '',
      id_Vendedor: '',  
      cantidadProducto: '',  
      id_ModoPago: '',  
      fecha: '', 
      Estado: '', 
      TipoVentas: '',
      Direccion_Envio : '',
      Total_Venta: '',
   
  });

  const [clientes, setClientes] = useState([]); // Estado para almacenar los clientes
  const [vendedor, setVendedor] = useState([]); // Estado para almacenar los vendedor
  const [modopago, setModoPagos] = useState([]); // Estado para almacenar los modo de pagos

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener los clientes
    fetch('http://localhost:5000/crud//readvendedor')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con los vendedores obtenidas
        setVendedor(data);
      })
      .catch(error => {
        console.error('Error al obtener los vendedores', error);
      });
  }, []);


  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener los vendedores
    fetch('http://localhost:5000/crud//readclientes')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con los vendedores obtenidas
        setClientes(data);
      })
      .catch(error => {
        console.error('Error al obtener los clientes', error);
      });
  }, []);


  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener los vendedores
    fetch('http://localhost:5000/crud//readmodopagos')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con los vendedores obtenidas
        setModoPagos(data);
      })
      .catch(error => {
        console.error('Error al obtener los modo de pagos', error);
      });
  }, []);
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredVentas = ventas.filter((ventas) => { 
    
    if (ventas && ventas.id_Cliente && ventas.id_Vendedor && ventas.cantidadProducto&& ventas.id_ModoPago && ventas.fecha&& ventas.Estado&& ventas.TipoVentas&& ventas.Date&& ventas.Total_Venta) {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const id_Cliente = ventas.id_Cliente.toString().toLowerCase();
        const id_Vendedor = ventas.id_Vendedor.toString().toLowerCase();
        const cantidadProducto = ventas.cantidadProducto.toString().toLowerCase();
        const id_ModoPago = ventas.id_ModoPago.toString().toLowerCase();
        const fecha = ventas.fecha.toString().toLowerCase();
        const Estado = ventas.Estado.toString().toLowerCase();
        const TipoVentas = ventas.TipoVentas.toString().toLowerCase();
        const Direccion_Envio = ventas.Direccion_Envio.toString().toLowerCase();
        const Total_Venta = ventas.Total_Venta.toString().toLowerCase();
        
      
    
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
          id_Cliente.includes(searchQuery) ||
          id_Vendedor.includes(searchQuery) ||
          cantidadProducto.includes(searchQuery) ||
          id_ModoPago.includes(searchQuery)||
          fecha.includes(searchQuery)||
          Estado.includes(searchQuery)||
          TipoVentas.includes(searchQuery)||
          Direccion_Envio.includes(searchQuery)||
          Total_Venta.includes(searchQuery)
        );
      }
      return false; // Si algún valor está indefinido, no incluirlo en los resultados
    });
  

  // Función para abrir el modal y pasar los datos de la promoción seleccionada
  const openModal = (ventas) => {
    setSelectedVenta(ventas);

    // Formatea la fecha para el campo Fecha_Inicio
    const formattedFecha = formatDateForInput(ventas.fecha);
      

    setFormData({
      id_Cliente:ventas.id_Cliente,
      id_Vendedor:ventas.id_Vendedor,  
      cantidadProducto:ventas.cantidadProducto,  
      id_ModoPago:ventas.id_ModoPago,  
      fecha: formattedFecha,
      Estado:ventas.Estado, 
      TipoVentas:ventas.TipoVentas,
      Direccion_Envio :ventas.Direccion_Envio,
      Total_Venta:ventas.Total_Venta,
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

  const loadventa = () => {
    fetch('http://localhost:5000/crud/readVenta')
      .then((response) => response.json())
      .then((data) => setVenta(data))
      .catch((error) => console.error('Error al obtener los descuentos:', error));
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
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de ventas
          setShowModal(false);
          loadventa(); // Cargar la lista de ventas
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar una promoción
  const handleDelete = (cod_Venta) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta promoción?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deleteVentas/${cod_Venta}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de promociones
            loadventa();
          }
        })
        .catch((error) => console.error('Error al eliminar la venta:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener las promociones
  useEffect(() => {
    fetch('http://localhost:5000/crud/readVenta')
      .then((response) => response.json())
      .then((data) => setVenta(data))
      .catch((error) => console.error('Error al obtener las promociones:', error));
  }, []);

  return (
    <div>
      <Header rol={ rol}/>

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Ventas</Card.Title>

          
          <Row className="mb-3">
            <Col sm="6" md="6" lg="4">
              <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Cliente</th>
                <th>ID Vendedor</th>
                <th>Cantidad Producto</th>
                <th>ID Modo Pago</th>
                <th>Fecha</th>
                <th>Estado Venta</th>
                <th>Tipo Venta</th>
                <th>Direccion Envio</th>
                <th>Total Venta</th>
              </tr>
            </thead>
            <tbody>   
              {filteredVentas.map((ventas) => (
                <tr key={ventas.cod_Venta}>
                  <td>{ventas.cod_Venta}</td>
                  <td>{ventas.id_Cliente}</td>
                  <td>{ventas.id_Vendedor}</td>
                  <td>{ventas.cantidadProducto}</td>
                  <td>{ventas.id_ModoPago}</td>
                  <td>{formatDateForInput(ventas.fecha)}</td>
                  <td>{ventas.Estado}</td>
                  <td>{ventas.TipoVentas}</td>
                  <td>{ventas.Direccion_Envio}</td>
                  <td>{ventas.Total_Venta}</td>
            
                  <td>
                    <Button variant="primary" onClick={() => openModal(ventas)}><FaPencil/></Button>
                    <Button variant="danger" onClick={() => handleDelete(ventas.cod_Venta)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Ventas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Ventas</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

         









                <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="clientes" label="clientes">
                      <Form.Select
                        aria-label="clientes"
                        value={formData.id_Cliente}
                        onChange={(e) => 
                          setFormData({
                            id_Cliente: e.target.value
                          })
                        }
                      >
                        <option>Seleccione el cliente</option>
                        {clientes.map((clientes) => (
                          <option key={clientes.id_Cliente} value={clientes.id_Cliente}>
                            {clientes.nombre}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>




                <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="vendedor" label="vendedor">
                      <Form.Select
                        aria-label="vendedor"
                        value={formData.id_Vendedor}
                        onChange={(e) => 
                          setFormData({
                            id_Vendedor: e.target.value
                          })
                        }
                      >
                        <option>Seleccione el Vendedor</option>
                        {vendedor.map((vendedor) => (
                          <option key={vendedor.id_Vendedor} value={vendedor.id_Vendedor}>
                            {vendedor.nombre}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>




                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="cantidadProducto" label="cantidadProducto">
                      <Form.Control 
                      type="text" 
                      placeholder="Ingrese la cantidad producto"
                      value={formData.cantidadProducto}
                      name="cantidadProducto"
                      onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                

                <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="modopagos" label="modopagos">
                      <Form.Select
                        aria-label="modopagos"
                        value={formData.id_ModoPago}
                        onChange={(e) => 
                          setFormData({
                            id_ModoPago: e.target.value
                          })
                        }
                      >
                        <option>Seleccione el Modo de pago</option>
                        {vendedor.map((modopagos) => (
                          <option key={modopagos.id_ModoPago} value={modopagos.id_ModoPago}>
                            {modopagos.Nombre_ModoPago}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>



                <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="fecha" label="Fecha">
                      <Form.Control 
                        type="date" 
                        placeholder="Seleccione la fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>


               
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Estado" label="Estado">
                      <Form.Select 
                        aria-label="Estado"
                        value={formData.Estado}
                        onChange={handleFormChange}
                        name="Estado"
                      >
                        <option>Seleccione el Estado de la venta</option>
                         <option value="Pendiente">Pendiente</option>
                          <option value="Entregado">Entregado</option>
                           <option value="EnProceso">En Proceso</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>



                  
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="TipoVentas" label="TipoVentas">
                      <Form.Select 
                        aria-label="TipoVentas"
                        value={formData.TipoVentas}
                        onChange={handleFormChange}
                        name="TipoVentas"
                      >
                        <option>Seleccione el tipo de venta</option>
                          <option value="Presencial">Presencial</option>
                      <option value="EnLinea">En Linea</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>





                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="Direccion_Envio" label="Direccion_Envio">
                      <Form.Control 
                      type="text" 
                      placeholder="Ingrese la Direccion de envio"
                      value={formData.Direccion_Envio}
                      name="Direccion_Envio"
                      onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>


                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="Total_Venta" label="Total_Venta">
                      <Form.Control 
                      type="text" 
                      placeholder="Ingrese el total de la venta"
                      value={formData.Total_Venta}
                      name="Total_Venta"
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