import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      productos: [
        {
          id: 1,
          nombre: 'Leche',
          precio: 1.5,
          descripcion: 'It is an opaque whitish nutritive secretion produced by the secretory cells of the mammary glands of mammals, including monotremes.',
          imagen: 'https://citymercao.com/wp-content/uploads/2020/10/alqueria-megalitro-entera.png'
        },
        {
          id: 2,
          nombre: 'Detodito',
          precio: 1.15,
          descripcion: 'It is Ideal to overcome hunger and to share with others on different occasions.',
          imagen: 'https://detoditocolombia.com.co/img/snackBBQ.png'
        },
        {
          id: 3,
          nombre: 'Milo',
          precio: 2.25,
          descripcion: 'It is the worlds most trusted chocolate malt beverage. With the goodness of cocoa, milk and malt, a glass of delicious MILO contains essential vitamins and minerals that children need, including calcium for strong bones and B vitamins and minerals to help the body release energy.',
          imagen:
            'https://www.goodnes.com/sites/g/files/jgfbjl321/files/gdn_product/field_product_images/milo-ognk0b2vegecoxnalykq.png'
        },
        {
          id: 4,
          nombre: 'Zukaritas',
          precio: 4,
          descripcion: 'Corn cereals in the form of flakes or small sheets covered in sugar.',
          imagen:
            'https://devinmotionstorage.blob.core.windows.net/emotion/surtiapp/images/products/mobile/COVA-000055828_22020407500000.png'
        },
        {
          id: 5,
          nombre: 'Leche',
          precio: 1.5,
          descripcion: 'It is an opaque whitish nutritive secretion produced by the secretory cells of the mammary glands of mammals, including monotremes.',
          imagen: 'https://citymercao.com/wp-content/uploads/2020/10/alqueria-megalitro-entera.png'
        },
        {
          id: 6,
          nombre: 'Detodito',
          precio: 1.15,
          descripcion: 'It is Ideal to overcome hunger and to share with others on different occasions.',
          imagen: 'https://detoditocolombia.com.co/img/snackBBQ.png'
        },
        {
          id: 7,
          nombre: 'Milo',
          precio: 2.25,
          descripcion: 'It is the worlds most trusted chocolate malt beverage. With the goodness of cocoa, milk and malt, a glass of delicious MILO contains essential vitamins and minerals that children need, including calcium for strong bones and B vitamins and minerals to help the body release energy.',
          imagen:
            'https://www.goodnes.com/sites/g/files/jgfbjl321/files/gdn_product/field_product_images/milo-ognk0b2vegecoxnalykq.png'
        },
        {
          id: 8,
          nombre: 'Milo',
          precio: 2.25,
          descripcion: 'It is the worlds most trusted chocolate malt beverage. With the goodness of cocoa, milk and malt, a glass of delicious MILO contains essential vitamins and minerals that children need, including calcium for strong bones and B vitamins and minerals to help the body release energy.',
          imagen:
            'https://www.goodnes.com/sites/g/files/jgfbjl321/files/gdn_product/field_product_images/milo-ognk0b2vegecoxnalykq.png'
        },
        {
          id: 9,
          nombre: 'Zukaritas',
          precio: 4,
          descripcion: 'Corn cereals in the form of flakes or small sheets covered in sugar.',
          imagen:
            'https://devinmotionstorage.blob.core.windows.net/emotion/surtiapp/images/products/mobile/COVA-000055828_22020407500000.png'
        },
        {
          id: 10,
          nombre: 'Detodito',
          precio: 1.15,
          descripcion: 'It is Ideal to overcome hunger and to share with others on different occasions.',
          imagen: 'https://detoditocolombia.com.co/img/snackBBQ.png'
        },
        {
          id: 11,
          nombre: 'Leche',
          precio: 1.5,
          descripcion: 'It is an opaque whitish nutritive secretion produced by the secretory cells of the mammary glands of mammals, including monotremes.',
          imagen: 'https://citymercao.com/wp-content/uploads/2020/10/alqueria-megalitro-entera.png'
        },
        {
          id: 12,
          nombre: 'Leche',
          precio: 1.5,
          descripcion: 'It is an opaque whitish nutritive secretion produced by the secretory cells of the mammary glands of mammals, including monotremes.',
          imagen: 'https://citymercao.com/wp-content/uploads/2020/10/alqueria-megalitro-entera.png'
        }
      ],
      carrito: [],
      productoSeleccionado: {},
      mostrarProductos: false
    }
  },
  mutations: {
    verCarrito(state, mostrarProductos) {
      state.mostrarProductos = mostrarProductos
      localStorage.setItem('mostrarProductos', JSON.stringify(state.mostrarProductos))
    },
    ocultarCarrito(state) {
      state.mostrarProductos = false
      localStorage.setItem('mostrarProductos', JSON.stringify(state.mostrarProductos))
    },
    productoSeleccionado(state, producto) {
      const cantidadDelItem = state.carrito.find((item) => item.producto.id === producto.id)
      if (cantidadDelItem) {
        producto.cantidad = cantidadDelItem.cantidad
      } else {
        producto.cantidad = 0
      }
      state.productoSeleccionado = producto
      localStorage.setItem('productoSeleccionado', JSON.stringify(state.productoSeleccionado))
    },
    agregarAlCarrito(state, producto) {
      const itemEnCarrito = state.carrito.find((item) => item.producto.id === producto.id)
      if (itemEnCarrito) {
        itemEnCarrito.cantidad++
        state.productoSeleccionado.cantidad++
        localStorage.setItem('productoSeleccionado', JSON.stringify(state.productoSeleccionado))
      } else {
        state.carrito.push({ producto: producto, cantidad: 1 })
      }
      localStorage.setItem('carrito', JSON.stringify(state.carrito))
    },
    aumentarCantidad(state, producto) {
      const itemEnCarrito = state.carrito.find((item) => item.producto.id === producto.id)
      if (itemEnCarrito) {
        itemEnCarrito.cantidad++
      } else {
        state.carrito.push({ producto: producto, cantidad: 1 })
      }
      localStorage.setItem('carrito', JSON.stringify(state.carrito))
    },

    disminuirCantidad(state, producto) {
      const itemEnCarrito = state.carrito.find((item) => item.producto.id === producto.id)
      if (itemEnCarrito) {
        if (itemEnCarrito.cantidad > 1) {
          itemEnCarrito.cantidad--
        } else {
          state.carrito = state.carrito.filter((item) => item !== itemEnCarrito)
        }
        localStorage.setItem('carrito', JSON.stringify(state.carrito))
      }
    },
    cargarCarrito(state) {
      const carrito = JSON.parse(localStorage.getItem('carrito'))
      if (carrito) {
        state.carrito = carrito
      }
    }
  },
  actions: {
    agregarAlCarrito({ commit }, producto) {
      commit('agregarAlCarrito', producto)
    },
    aumentarCantidad({ commit }, item) {
      commit('aumentarCantidad', item)
    },
    disminuirCantidad({ commit }, item) {
      commit('disminuirCantidad', item)
    },
    cargarCarrito({ commit }) {
      commit('cargarCarrito')
    },
    productoSeleccionado({ commit }, producto) {
      commit('productoSeleccionado', producto)
    },
    verCarrito({ commit }, mostrarProductos) {
      commit('verCarrito', mostrarProductos)
    },
    ocultarCarrito({ commit }) {
      commit('ocultarCarrito')
    }
  }
})

export default store
