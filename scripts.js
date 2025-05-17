// Lista base de productos
const productos = [
  {
    nombre: "Camisa",
    descripcion: "Camisa blanca de algodón",
    categoria: "Ropa",
    precio: 25.99,
    stock: 50,
  },
  {
    nombre: "Pantalón",
    descripcion: "Pantalón azul jeans",
    categoria: "Ropa",
    precio: 40.0,
    stock: 30,
  },
  {
    nombre: "Zapatos",
    descripcion: "Zapatos deportivos",
    categoria: "Calzado",
    precio: 60.5,
    stock: 20,
  },
];

// Lista base de categorías
const categorias = [
  { nombre: "Ropa", descripcion: "Prendas de vestir" },
  { nombre: "Calzado", descripcion: "Zapatos, sandalias y más" },
];

const carrito = [
  { nombre: "Camisa", cantidad: 2, precio: 25.99 },
  { nombre: "Zapatos", cantidad: 1, precio: 60.5 },
];

const ventas = [
  {
    cliente: {
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      telefono: "0991234567",
      direccion: "Av. Siempre Viva 123",
    },
    total: 112.48,
  },
  {
    cliente: {
      nombre: "María López",
      email: "maria.lopez@example.com",
      telefono: "0987654321",
      direccion: "Calle Falsa 456",
    },
    total: 40.0,
  },
];
// Función: agregar o actualizar producto
function agregarProducto() {
  /*
      - Obtener datos del producto desde inputs
      - Validar que todos los campos sean correctos
      - Si el producto existe (por nombre), actualizar datos
      - Si no existe, agregar producto a la lista
      - Limpiar campos y actualizar la tabla y estadísticas
    */
  let nombre = recuperarTexto("txtNombre");
  let descripcion = recuperarTexto("txtDescripcion");
  let categoria = recuperarTexto("txtCategoria");
  let precio = recuperarFloat("txtPrecio");
  let stock = recuperarInt("txtStock");
  // validacion nombre
  let errorNombre = false;
  if (nombre == "") {
    mostrarTexto("lblErrorNombre", "El nombre no puede estar vacio");
    errorNombre = true;
  } else {
    mostrarTexto("lblErrorNombre", "");
  }
  if (errorNombre == false) {
    for (let i = 0; i < nombre.length; i++) {
      if (esDigito(nombre.charAt(i)) == true) {
        mostrarTexto("lblErrorNombre", "El nombre solo debe contener letras");
        errorNombre = true;
        break;
      } else {
        mostrarTexto("lblErrorNombre", "");
      }
    }
  }
  if (errorNombre == false) {
    if (esMayuscula(nombre.charAt(0)) == false) {
      mostrarTexto("lblErrorNombre", "La primera letra debe ser Mayuscula");
      errorNombre = true;
    } else {
      mostrarTexto("lblErrorNombre", "");
    }
  }

  //validacion Descripcion
  let errorDescripcion = false;
  if (descripcion == "") {
    mostrarTexto("lblErrorDescripcion", "La descripcion es obligatoria y debe ser valida");
    errorDescripcion = true;
  } else {
    mostrarTexto("lblErrorDescripcion", "");
  }
  if (errorDescripcion == false) {
    for (let i = 0; i < descripcion.length; i++) {
      if (soloLetras(descripcion.charAt(i)) == false) {
        mostrarTexto("lblErrorDescripcion", "La descripcion es no debe tener caracteres especiales");
        errorDescripcion = true;
        break;
      } else {
        mostrarTexto("lblErrorDescripcion", "");
      }
    }
  }

  //validacion Categoria
  let errorCategoria = false;
  if (categoria == "") {
    mostrarTexto("lblErrorCategoria", "La categoria es obligarotia y debe tener formato valido");
    errorCategoria = true;
  } else {
    mostrarTexto("lblErrorCategoria", "");
  }

  if (errorCategoria == false) {
    for (let i = 0; i < categoria.length; i++) {
      if (soloLetras(categoria.charAt(i)) == false) {
        mostrarTexto("lblErrorCategoria", "La categoria solo puede tener letras y espacios");
        errorCategoria = true;

      } else {
        mostrarTexto("lblErrorCategoria", "");
      }
    }
  }

  if (errorCategoria == false) {
    if (esMayuscula(categoria.charAt(0)) == false) {
      mostrarTexto("lblErrorCategoria", "La primera letra debe ser Mayuscula");
      errorCategoria = true;
    } else {
      for (let i = 1; i < categoria.length; i++) {
        if (esMayuscula(categoria.charAt(i)) == true) {
          mostrarTexto("lblErrorCategoria", "Solo la primera letra debe ser Mayuscula");
          errorCategoria = true;
          break;
        }
      }
    }
  }

  //validacion Precio
  let errorPrecio = false;
  if (precio == NaN) {
    mostrarTexto("lblErrorPrecio", "Ingrese un precio ");
    errorPrecio = true;
  } else {
    mostrarTexto("lblErrorPrecio", "");
  }
  if (precio < 0) {
    mostrarTexto("lblErrorPrecio", "Ingrese un precio valido mayor o igual a 0");
    errorPrecio = true;
  } else {
    mostrarTexto("lblErrorPrecio", "");
  }
  //Validacion Stock
  let errorStock = false;
  if (stock == NaN) {
    mostrarTexto("lblErrorStock", "Ingrese un stock ");
    errorPrecio = true;
  } else {
    mostrarTexto("lblErrorStock", "");
  }
  if (stock < 0) {
    mostrarTexto("lblErrorStock", "Ingrese un stock valido(entero, 0 o mas)");
    errorStock = true;
  } else {
    mostrarTexto("lblErrorStock", "");
  }


  if (errorNombre == false && errorDescripcion == false && errorCategoria == false && errorPrecio == false && errorStock == false) {
    let productoAgregar = {};
    productoAgregar.nombre = nombre;
    productoAgregar.descripcion = descripcion;
    productoAgregar.categoria = categoria;
    productoAgregar.precio = precio;
    productoAgregar.stock = stock;

    if (buscarNombre(productoAgregar.nombre) == null) {
      productos.push(productoAgregar);
      limpiar();
      actualizarEstadisticasProductos();
    } else {
      alert("producto existente");
      let productoAct = buscarNombre(productoAgregar.nombre);
      productoAct.descripcion = descripcion;
      productoAct.categoria = categoria;
      productoAct.precio = precio;
      productoAct.stock = stock;
      limpiar();
      actualizarEstadisticasProductos();
    }

  }
  mostrarProductos();
  actualizarEstadisticasProductos();




}

limpiar = function () {
  mostrarTexto("lblErrorNombre", "");
  mostrarTexto("lblErrorDescripcion", "");
  mostrarTexto("lblErrorCategoria", "");
  mostrarTexto("lblErrorPrecio", "");
  mostrarTexto("lblErrorStock", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtDescripcion", "");
  mostrarTextoEnCaja("txtCategoria", "");
  mostrarTextoEnCaja("txtPrecio", "");
  mostrarTextoEnCaja("txtStock", "");


}



buscarNombre = function (nombre) {
  let nombreEncontrado = null;
  for (i = 0; i < productos.length; i++) {
    if (productos[i].nombre == nombre) {
      nombreEncontrado = productos[i];
      break;
    }else{
      nombreEncontrado = null;
    }
  }
  return nombreEncontrado;
}

buscarProducto = function () {
  let nombre = recuperarTexto("txtNombre");
  let encontrado = buscarNombre(nombre);
  if (encontrado == null) {
    mostrarTexto("lblEncontrado", "El producto no existe");

  } else {
    mostrarTexto("lblEncontrado", "El Producto existe");

  }
}

// Función: mostrar productos en la tabla
function mostrarProductos() {
  let cmpTabla = document.getElementById("tablaProductos")
  /*
      - Limpiar contenido actual de la tabla
      - Recorrer lista de productos
      - Crear filas dinámicas con los datos y botón para eliminar
    */
  let contenidoTabla = "<table class='tabla-minimalista'><thead><tr>" +
    "<th>NOmbre</th>" +
    "<th>Descripcion</th>" +
    "<th>CAtegoria</th>" +
    "<th>Precio</th>" +
    "<th>Stock</th>" +
    "<th>Precio iva</th>" +
    "</tr></thead><tbody>";

  let elementosTabla;
  for (let i = 0; i < productos.length; i++) {
    elementosTabla = productos[i];
    contenidoTabla +=
      "<tr><td>" + elementosTabla.nombre + "</td>" +
      "<td>" + elementosTabla.descripcion + "</td>" +
      "<td>" + elementosTabla.categoria + "</td>" +
      "<td>" + elementosTabla.precio +
      "<td>" + elementosTabla.stock +
      "<td>" + ((elementosTabla.precio * 112) / 100).toFixed(2) +
      "</td></tr>";
  }
  contenidoTabla += "</tbody></table>";
  cmpTabla.innerHTML = contenidoTabla;


}

// Función: eliminar producto por índice
function eliminarProducto(index) {
  /*
      - Confirmar acción con el usuario
      - Remover producto de la lista productos
      - Actualizar tabla y estadísticas
    */
}

// Función: actualizar estadísticas de productos
function actualizarEstadisticasProductos() {
  /*
      - Calcular y mostrar total productos, stock total y valor inventario
    */
  let totalProductos = 0;
  let totalStock = 0;
  let inventario = 0;

  totalProductos = productos.length;
  for (let i = 0; i < productos.length; i++) {
    totalStock += productos[i].stock;
  }
  for (let i = 0; i < productos.length; i++) {
    inventario += (productos[i].stock * productos[i].precio);
  }

  mostrarTextoHTML("totalProductos", totalProductos);
  mostrarTexto("stockTotal", totalStock);
  mostrarTexto("valorInventario", inventario);


}

// Función: limpiar campos de producto
function limpiarCamposProducto() {
  /*
      - Limpiar inputs de producto para nueva entrada
    */
}

// Función: agregar categoría
function agregarCategoria() {
  /*
      - Obtener datos desde inputs
      - Validar campos obligatorios y evitar duplicados
      - Agregar categoría a la lista
      - Limpiar campos y actualizar lista de categorías
    */
  let categoria = recuperarTexto("nombreCategoria")
  let descripcion = recuperarTexto("descripcionCategoria")
  let errorCategoria = false;

  if (categoria == "") {
    mostrarTexto("errorNombreCategoria", "La categoria es obligarotia y debe tener formato valido");
    errorCategoria = true;
  } else {
    mostrarTexto("errorNombreCategoria", "");
  }
  if (errorCategoria == false) {
    for (let i = 0; i < categoria.length; i++) {
      if (soloLetras(categoria.charAt(i)) == false) {
        mostrarTexto("errorNombreCategoria", "La categoria solo puede tener letras y espacios");
        errorCategoria = true;

      } else {
        mostrarTexto("errorNombreCategoria", "");
      }
    }
  }

  if (errorCategoria == false) {
    if (esMayuscula(categoria.charAt(0)) == false) {
      mostrarTexto("errorNombreCategoria", "La primera letra debe ser Mayuscula");
      errorCategoria = true;
    } else {
      for (let i = 1; i < categoria.length; i++) {
        if (esMayuscula(categoria.charAt(i)) == true) {
          mostrarTexto("errorNombreCategoria", "Solo la primera letra debe ser Mayuscula");
          errorCategoria = true;
          break;
        }
      }
    }
  }
  //validar descripcion
  let errorDescripcion = false;
  if (descripcion == "") {
  } else {
    mostrarTexto("errorDescripcionCategoria", "");
  }
  if (errorDescripcion == false) {
    for (let i = 0; i < descripcion.length; i++) {
      if (soloLetras(descripcion.charAt(i)) == false) {
        mostrarTexto("errorDescripcionCategoria", "La descripcion es no debe tener caracteres especiales");
        errorDescripcion = true;
        break;
      } else {
        mostrarTexto("errorDescripcionCategoria", "");
      }
    }
  }
  if (errorCategoria == false && errorDescripcion == false) {
    let categoriaA
    let esNuevo = true
    for (let i = 0; i < categorias.length; i++) {
      categoriaA = categorias[i]
      if (categoriaA.nombre == categoria) {
        alert("La categoria ya existe")
        esNuevo = false
        break
      }
    }
    if (esNuevo == true) {
      let nuevaCategoria = []
      nuevaCategoria.nombre = categoria
      nuevaCategoria.descripcion = descripcion
      categorias.push(nuevaCategoria)
      alert("categoria agregada")
      mostrarTextoEnCaja("nombreCategoria", "")
      mostrarTextoEnCaja("descripcionCategoria", "")
    }
  }
  mostrarCategorias()
}

// Función: mostrar categorías
function mostrarCategorias() {
  /*
      - Limpiar lista actual
      - Recorrer categorías y mostrar en lista HTML
      - Agregar botón para eliminar categoría
    */
  let cmpLista = document.getElementById("listaCategorias")
  let categoriaA
  let contenidoListaCategorias = "<table class='tabla-minimalista'><thead><th>NOMBRE</th><th>Descripcion</th></thead><tbody>"
  for (let i = 0; i < categorias.length; i++) {
    categoriaA = categorias[i]
    contenidoListaCategorias += "<tr><td>" + categoriaA.nombre + "</td>" + "<td>" + categoriaA.descripcion + "</td></tr>"
  }
  contenidoListaCategorias += "</tbody></table>"
  cmpLista.innerHTML = contenidoListaCategorias
}

// Función: eliminar categoría
function eliminarCategoria(index) {
  /*
      - Confirmar con el usuario
      - Eliminar categoría de la lista
      - Actualizar lista en pantalla
    */
}

// Función: mostrar productos disponibles para añadir al carrito
function mostrarProductosDisponibles() {
  /*
      - Mostrar lista de productos con botón para añadir al carrito
    */
}

// Función: añadir producto al carrito
function agregarAlCarrito(nombreProducto) {
  let encontrado = buscarNombre();
  let cantidad = recuperarInt("txtCantidad")
  let errorCantidad = false;
  if(nombreProducto == null ){
    alert("El producto no fue encontrado")
  }else{
    if (cantidad == NaN) {
    mostrarTexto("lblErrorCantidad", "Ingrese una cantidad");
    errorCantidad = true;
  } else if (cantidad <= 0) {
    mostrarTexto("lblErrorCantidad", "Ingrese una cantidad valida");
    errorCantidad = true;
  } else if (productos.cantidad <= 0) {
    mostrarTexto("lblErrorCantidad", "No hay suficiente stock");
    errorCantidad = true;
  } else {
    mostrarTexto("lblErrorCantidad", "");
  }
  if (errorCantidad == false) {
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].nombre == nombreProducto) {
        carrito[i].cantidad += cantidad;
        encontrado.stock += cantidad;
        mostrarTexto("lblErrorCantidad", "El producto ya existe en el carrito");
        mostrarCarrito();
      }
    }
  }
  }
  
  if (encontrado != null) {
    agregarProducto(encontrado.nombre);
    agregarProducto(encontrado.descripcion);
    agregarProducto(encontrado.categoria);
    agregarProducto(encontrado.precio);
    agregarProducto(encontrado.stock);
  } else {
    alert("El producto no existe");
  }



  /*
      - Validar cantidad y stock disponible
      - Añadir producto o aumentar cantidad en carrito
      - Actualizar resumen y total del carrito
    */
}

// Función: mostrar resumen del carrito
function mostrarCarrito() {
  let nombreCar = recuperarTexto("txtCarrito")
  

  let cmpTabla = document.getElementById("tablaCarrito")

  /*
      - Limpiar contenido actual de la tabla
      - Recorrer lista de producto
      - Crear filas dinámicas con los datos y botón para eliminar
    */
  let contenidoTabla = "<table class='tabla-minimalista'><thead><tr>" +
    "<th>Nombre</th>" +
    "<th>Cantidad</th>" +
    "<th>Subtotal</th>" +
    "<th>Precio</th>" +

    "</tr></thead><tbody>";

  let elementosTabla;
  let totalAPagar = 0;
  for (let i = 0; i < carrito.length; i++) {
    elementosTabla = carrito[i];

    contenidoTabla +=

      "<tr> <td>" + elementosTabla.nombre + "</td>" + 
      "<td>" + elementosTabla.cantidad + "</td>" +
      "<td>" + elementosTabla.precio * elementosTabla.cantidad + "</td>" +

      "<td>" + elementosTabla.precio + "</td>" +
      "</td></tr>";
    totalAPagar += elementosTabla.precio * elementosTabla.cantidad
  }
  contenidoTabla += "</tbody></table>";
  cmpTabla.innerHTML = contenidoTabla;
  let resultado = mostrarTexto("totalCarrito", totalAPagar.toFixed(2))
  return resultado
}
/*
    - Mostrar tabla con productos en carrito, cantidades y subtotal
    - Mostrar total general
  */


// Función: editar cantidad de producto en carrito
function editarCantidadCarrito(index) {
  /*
      - Validar nueva cantidad contra stock
      - Actualizar cantidad en carrito
      - Actualizar tabla y total
    */
}

// Función: eliminar producto del carrito
function eliminarDelCarrito(index) {
  /*
      - Eliminar producto del carrito
      - Actualizar tabla y total
    */
}

// Función: guardar datos cliente
function guardarDatosCliente() {
  /*
      - Obtener y validar campos del cliente (nombre, email, teléfono, dirección)
      - Guardar datos para la compra
    */
  let nombreC = recuperarTexto("nombreCliente");
  let correoC = recuperarTexto("emailCliente");
  let telefonoC = recuperarTexto("telefonoCliente");
  let direccionC = recuperarTexto("direccionCliente");

  //validacion nombre
  let errorNombre = false;
  if (nombreC == "") {
    mostrarTexto("errorNombreCliente", "El nombre no puede estar vacio");
    errorNombre = true;
  } else {
    mostrarTexto("errorNombreCliente", "");
  }
  if (errorNombre == false) {
    for (let i = 0; i < nombreC.length; i++) {
      if (esDigito(nombreC.charAt(i)) == true) {
        mostrarTexto("errorNombreCliente", "El nombre solo debe contener letras");
        errorNombre = true;
        break;
      } else {
        mostrarTexto("errorNombreCliente", "");
      }
    }
  }
  if (errorNombre == false) {
    if (esMayuscula(nombreC.charAt(0)) == false) {
      mostrarTexto("errorNombreCliente", "La primera letra debe ser Mayuscula");
      errorNombre = true;
    } else {
      mostrarTexto("errorNombreCliente", "");
    }
  }

  //validacion Correo
  let errorCorreo = false;
  if (correoC == "") {
    mostrarTexto("errorEmailCliente", "Debe ingresar un correo");
    errorCorreo = true;
  } else {
    mostrarTexto("errorEmailCliente", "");
  }
  if (errorCorreo == false) {
    let arro = 0;
    for (let i = 0; i < correoC.length; i++) {
      if (correoC.charAt(i) == "@") {
        arro += 1;
      }
    }
    if (arro != 1) {
      mostrarTexto("errorEmailCliente", "Debe ser un correo valido (un solo @)");
      errorCorreo = true;
    } else {
      mostrarTexto("errorEmailCliente", "");
    }
  }

  //Validacion Telefono

  let errorTel = false;
  if (telefonoC == "") {
    mostrarTexto("errorTelefonoCliente", "Debe ingresar un telefono");
    errorTel = true;
  } else {
    mostrarTexto("errorTelefonoCliente", "");
  }

  if (errorTel == false) {
    for (let i = 0; i < telefonoC.length; i++) {
      if (esDigito(telefonoC.charAt(i)) == false) {
        mostrarTexto("errorTelefonoCliente", "Debe ingresar solo numeros");
        errorTel = true;
        break;
      }
    }
  }

  //validacion Direccion

  let errorDirec = false;
  if (direccionC == "") {
    mostrarTexto("errorDireccionCliente", "Debe ingresar una direccion");
    errorDirec = true;
  } else {
    mostrarTexto("errorDireccionCliente", "");
  }


}

// Función: finalizar compra
function finalizarCompra() {
  /*
      - Validar carrito y datos cliente completos
      - Crear registro de venta con productos, cliente, total y fecha
      - Actualizar stock de productos vendidos
      - Vaciar carrito
      - Actualizar tablas y estadísticas
      - Mostrar mensaje éxito y limpiar formulario cliente
    */
}

// Función: mostrar resumen de ventas
function mostrarVentas() {
  let cmpTabla = document.getElementById("tablaVentas")
  /*
      - Limpiar contenido actual de la tabla
      - Recorrer lista de productos
      - Crear filas dinámicas con los datos y botón para eliminar
    */
  let contenidoTabla = "<table class='tabla-minimalista'><thead><tr>" +
    "<th>Nombre</th>" +
    "<th>TOTAL VENDIDO</th>" +
    "</tr></thead><tbody>";

  let elementosTabla;
  for (let i = 0; i < ventas.length; i++) {
    elementosTabla = ventas[i];
    contenidoTabla +=
      "<tr><td>" + elementosTabla.cliente.nombre + "</td>" +
      "<td>" + elementosTabla.total +
      "</td></tr>";
  }
  contenidoTabla += "</tbody></table>";
  cmpTabla.innerHTML = contenidoTabla;
  calcularProductoMasVendido();
  /*
      - Mostrar tabla con ventas registradas
      - Calcular y mostrar totales globales y producto más vendido
    */
}

// Función: calcular producto más vendido
function calcularProductoMasVendido() {
  let totalVentas = 0;
  let elementoVentas;
  for (let i = 0; i < ventas.length; i++) {
    elementoVentas = ventas[i].total;
    totalVentas += elementoVentas;
  }
  mostrarTexto("totalVentas", totalVentas.toFixed(2))
  let productoMayor = carrito[0];
  for (let i = 1; i < carrito.length; i++) {
    let elementoCarrito = carrito[i];
    if (elementoCarrito.cantidad > productoMayor.cantidad) {
      productoMayor = elementoCarrito;
    }
  }
  let mayor = productoMayor;
  mostrarTexto("productoMasVendido", productoMayor.nombre + " fue el producto mas vendido con un total de " + productoMayor.cantidad + " ventas.")



  /*
      - Contar cantidades vendidas de cada producto en todas las ventas
      - Retornar nombre de producto con mayor cantidad vendida
    */
}
