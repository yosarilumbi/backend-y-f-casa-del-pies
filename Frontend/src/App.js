import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cliente from './pages/Cliente';
import ListaCliente from './pages/ListaCliente';
import Categorias from './pages/Categorias';
import Marcas from './pages/Marcas';
import Pagos from './pages/Pagos';
import Producto from'./pages/Producto';
import Descuento from './pages/Descuento';
import ListaDescuento from './pages/ListaDescuento';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Cliente" element={<Cliente />} />
        <Route path="/ListaCliente" element={<ListaCliente />} />
        <Route path="/Marcas" element={<Marcas />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/Pagos" element={<Pagos />} />
        <Route path="/Producto" element={<Producto/>} />
        <Route path="/descuento" element={<Descuento />} />
        <Route path="/listaDescuento" element={<ListaDescuento />} />
      </Routes>
    </Router>
  );
}

export default App;