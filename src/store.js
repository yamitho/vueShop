import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      productos: [
        {
          id: 1,
          nombre: 'Leche',
          precio: 10,
          descripcion: '',
          imagen:
            'https://supertiendascomunal.com/5476-large_default/leche-entera-alqueria-13-ml.jpg'
        },
        {
          id: 2,
          nombre: 'Detodito',
          precio: 20,
          descripcion: '',
          imagen:
            'https://www.superlosmontes.com/site/12619-large_default/detodito--frito-lay-bbq-65grs.jpg'
        },
        {
          id: 3,
          nombre: 'Milo',
          precio: 30,
          descripcion: '',
          imagen:
            'https://static.merqueo.com/images/products/large/b387b0d4-a1d9-4af2-bfe9-5618665ccd4b.jpg'
        },
        {
          id: 4,
          nombre: 'Zukaritas',
          precio: 30,
          descripcion: '',
          imagen:
            'https://images.kglobalservices.com/www.kelloggs.com.co/es_co/product/product_4508506/kicproductimage-121045_kicproductimage-121045.jpg'
        },
        {
          id: 5,
          nombre: 'Zukaritas',
          precio: 30,
          descripcion: '',
          imagen:
            'https://images.kglobalservices.com/www.kelloggs.com.co/es_co/product/product_4508506/kicproductimage-121045_kicproductimage-121045.jpg'
        },
        {
          id: 6,
          nombre: 'Zukaritas',
          precio: 30,
          descripcion: '',
          imagen:
            'https://images.kglobalservices.com/www.kelloggs.com.co/es_co/product/product_4508506/kicproductimage-121045_kicproductimage-121045.jpg'
        },
        {
          id: 7,
          nombre: 'Zukaritas',
          precio: 30,
          descripcion: '',
          imagen:
            'https://images.kglobalservices.com/www.kelloggs.com.co/es_co/product/product_4508506/kicproductimage-121045_kicproductimage-121045.jpg'
        },
        {
          id: 8,
          nombre: 'Zukaritas',
          precio: 30,
          descripcion: '',
          imagen:
            'https://images.kglobalservices.com/www.kelloggs.com.co/es_co/product/product_4508506/kicproductimage-121045_kicproductimage-121045.jpg'
        },
        {
          id: 9,
          nombre: 'Zukaritas',
          precio: 30,
          descripcion: '',
          imagen:
            'https://images.kglobalservices.com/www.kelloggs.com.co/es_co/product/product_4508506/kicproductimage-121045_kicproductimage-121045.jpg'
        },
        {
          id: 10,
          nombre: 'Zukaritas',
          precio: 30,
          descripcion: '',
          imagen:
            'https://images.kglobalservices.com/www.kelloggs.com.co/es_co/product/product_4508506/kicproductimage-121045_kicproductimage-121045.jpg'
        },
        {
          id: 11,
          nombre: 'Zukaritas',
          precio: 30,
          descripcion: '',
          imagen:
            'https://images.kglobalservices.com/www.kelloggs.com.co/es_co/product/product_4508506/kicproductimage-121045_kicproductimage-121045.jpg'
        },
        {
          id: 12,
          nombre: 'Zukaritas',
          precio: 30,
          descripcion: '',
          imagen:
            'https://images.kglobalservices.com/www.kelloggs.com.co/es_co/product/product_4508506/kicproductimage-121045_kicproductimage-121045.jpg'
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
    verCarrito({ commit }) {
      commit('verCarrito')
    }
  }
})

export default store
