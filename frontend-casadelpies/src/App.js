import React, { useState } from 'react';
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
import ListaUsuario from './pages/ListaUsuario';
import Vendedor from './pages/Vendedor';
import ListaVendedor from './pages/ListaVendedor';
import Imagenes from './pages/Imagenes';
import Login from './pages/Login';


function App() {

  const [userRol, setUserRol] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login rol={userRol} setRol={setUserRol} />} />
        <Route path="/home" element={<Home rol={userRol} />} />
        <Route path="/about" element={<About rol={userRol} />} />
        <Route path="/Cliente" element={<Cliente rol={userRol}/>} />
        <Route path="/ListaCliente" element={<ListaCliente rol={userRol} />} />
        <Route path="/Marcas" element={<Marcas rol={userRol} />} />
        <Route path="/ListaMarcas" element={<ListaMarcas rol={userRol} />} />
        <Route path="/Categorias" element={<Categorias rol={userRol} />} />
        <Route path="/Pagos" element={<Pagos rol={userRol} />} />
        <Route path="/ListaPago" element={<ListaPago rol={userRol} />} />
        <Route path="/Producto" element={<Producto rol={userRol}/>} />
        <Route path="/ListaProducto" element={<ListaProducto rol={userRol}/>} />
        <Route path="/descuento" element={<Descuento rol={userRol}/>} />
        <Route path="/listaDescuento" element={<ListaDescuento rol={userRol}/>} />
        <Route path="/Ventas" element={<Ventas rol={userRol}/>} />
        <Route path="/ListaVenta" element={<ListaVenta rol={userRol}/>} />
        <Route path="/Usuario" element={<Usuario rol={userRol}/>} />
        <Route path="/ListaUsuario" element={<ListaUsuario rol={userRol}/>} />
        <Route path="/vendedor" element={<Vendedor rol={userRol}/>} />
        <Route path="/ListaVendedor" element={<ListaVendedor rol={userRol}/>} />
        <Route path="/Imagenes" element={<Imagenes rol={userRol}/>} />
      </Routes>
    </Router>
  );
}

export default App;