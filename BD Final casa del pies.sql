CREATE DATABASE casadelpies1;
USE casadelpies1;

CREATE TABLE Categorias (
  id_Categoria Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_C Varchar(30),
  descripcion Varchar(50)
);

CREATE TABLE Marcas (
  id_Marca Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Marca Varchar(60)
);

CREATE TABLE Pagos (
  id_Pago Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  metododePago Varchar(30),
  codigoPago Int,
  cod_Venta Int,
  monto Decimal(12,2),
  fecha_pago Date,
  id_Cliente Int
);

CREATE TABLE PromocionesyDescuentos (
  id_Promociones Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  codigoDescuentos Int,
  condiciones Varchar(30),
  fecha_Inicio Date,
  fecha_Fin Date
);

CREATE TABLE Usuario (
  id_Usuario Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario Varchar(30) NOT NULL,
  contrasena Varchar(16) NOT NULL,
  rol Varchar (20) NOT NULL
);

CREATE TABLE Vendedor (
  id_Vendedor Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  direccion Varchar(60),
  telefono Varchar(8),
  nombre Varchar(30),
  apellido Varchar(30),
  id_Usuario Int UNIQUE
);

CREATE TABLE Clientes (
  id_Cliente Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cedula Varchar(16),
  nombre Varchar(30),
  apellido Varchar(30),
  historialdecompras Varchar(200),
  direccionEnvio Varchar(200),
  id_Usuario Int UNIQUE
);

CREATE TABLE Productos (
  id_Producto Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_Categoria Int,
  nombre Varchar(30),
  descripcion Varchar(200),
  precio Decimal(12,2),
  id_Marca Int,
  id_Promociones Int
);

CREATE TABLE DetalleVenta (
  id_detalleVenta Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_producto Int,
  cod_Venta Int,
  id_Categoria Int,
  cantidad Int,
  total int
  
);

CREATE TABLE Ventas (
  cod_Venta Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_Cliente Int,
  id_Vendedor Int,
  cantidadProducto Int,
 total Int,
 metododePago Varchar (15),
  fecha Date,
  Estado Varchar(50),
  Presencial_enLinea Varchar(50)
  
);

 CREATE TABLE bitacora (
 id_bitacora INT NOT NULL AUTO_INCREMENT,
 transaccion VARCHAR(10) NOT NULL,
 usuario VARCHAR (40),
 fecha DATETIME NOT NULL,
 tabla VARCHAR (22) NOT NULL,
 PRIMARY KEY (id_bitacora)
 );
 
 CREATE TABLE Imagenes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  imagenUrl VARCHAR(255) NOT NULL
);

ALTER TABLE Productos
ADD CONSTRAINT FK_Productos_id_Categoria
FOREIGN KEY (id_Categoria) 
REFERENCES Categorias (id_Categoria);

ALTER TABLE Productos 
ADD CONSTRAINT FK_Productos_id_Marca
FOREIGN KEY (id_Marca) 
REFERENCES Marcas (id_Marca);

ALTER TABLE Productos 
ADD CONSTRAINT FK_Productos_id_Promociones
FOREIGN KEY (id_Promociones) 
REFERENCES PromocionesyDescuentos (id_Promociones);

ALTER TABLE DetalleVenta 
ADD CONSTRAINT FK_DetalleVenta_id_producto 
FOREIGN KEY (id_producto) 
REFERENCES Productos (id_Producto);

ALTER TABLE Ventas 
ADD CONSTRAINT FK_Ventas_id_Cliente 
FOREIGN KEY (id_Cliente) 
REFERENCES Clientes (id_Cliente);

ALTER TABLE DetalleVenta 
ADD CONSTRAINT FK_DetalleVenta_cod_Venta
FOREIGN KEY (cod_Venta) 
REFERENCES Ventas (cod_Venta);

ALTER TABLE Pagos 
ADD CONSTRAINT FK_Pagos_cod_Venta
FOREIGN KEY (cod_Venta) 
REFERENCES Ventas (cod_Venta);

ALTER TABLE Ventas 
ADD CONSTRAINT FK_Ventas_id_Vendedor
FOREIGN KEY (id_Vendedor) 
REFERENCES Vendedor (id_Vendedor);

ALTER TABLE Pagos 
ADD CONSTRAINT FK_Pagos_id_Cliente
FOREIGN KEY (id_Cliente) 
REFERENCES Clientes (id_Cliente);

ALTER TABLE Clientes 
ADD CONSTRAINT FK_Clientes_id_Usuario
FOREIGN KEY (id_Usuario) 
REFERENCES Usuario (id_Usuario);

ALTER TABLE Vendedor 
ADD CONSTRAINT FK_Vendedor_id_Usuario
FOREIGN KEY (id_Usuario) 
REFERENCES Usuario (id_Usuario);
