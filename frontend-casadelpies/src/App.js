import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cliente from './pages/Cliente';
import ListaCliente from './pages/ListaCliente';
import Categorias from './pages/Categorias';
import Marcas from './pages/Marcas';
import ListaMarcas from './pages/ListaMarcas';
import Pagos from './pages/Pagos';
import ListaPago from './pages/ListaPago';
import Producto from'./pages/Producto';
import ListaProducto from './pages/ListaProducto';
import Descuento from './pages/Descuento';
import ListaDescuento from './pages/ListaDescuento';
import Ventas from './pages/Ventas';
import ListaVenta from './pages/ListaVenta';
import Usuario from './pages/Usuario';
import Vendedor from './pages/Vendedor';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Cliente" element={<Cliente />} />
        <Route path="/ListaCliente" element={<ListaCliente />} />
        <Route path="/Marcas" element={<Marcas />} />
        <Route path="/ListaMarcas" element={<ListaMarcas />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/Pagos" element={<Pagos />} />
        <Route path="/ListaPago" element={<ListaPago />} />
        <Route path="/Producto" element={<Producto/>} />
        <Route path="/ListaProducto" element={<ListaProducto/>} />
        <Route path="/descuento" element={<Descuento />} />
        <Route path="/listaDescuento" element={<ListaDescuento />} />
        <Route path="/Ventas" element={<Ventas />} />
        <Route path="/ListaVenta" element={<ListaVenta />} />
        <Route path="/Usuario" element={<Usuario />} />
        <Route path="/vendedor" element={<Vendedor />} />
      </Routes>
    </Router>
  );
}

export default App;