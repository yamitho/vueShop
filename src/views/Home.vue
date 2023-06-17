<template>
  <!-- <div>
    <Header />
  </div> -->
  <div class="row">
    <div class="column">
      <h3>Product</h3>
      <hr />
      <br />
      <Productos />
    </div>
    <div class="column">
      <button @click="toggleMostrarProductos">
        {{ mostrarProductosEnCarrito ? 'Cart X' : 'Cart' }}
      </button>
      <h3>Store</h3>
      <hr />
      <br />
      <Carrito v-show="mostrarProductosEnCarrito" />
      <Producto v-show="!mostrarProductosEnCarrito" />
      <!-- <button v-if="productos.length > 0" @click="realizarPago">Pagar</button> -->
    </div>
  </div>
</template>

<script>
// import Header from '../components/Header.vue'
import Productos from '../components/Productos.vue'
import Producto from '../components/Producto.vue'
import Carrito from '../components/Carrito.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Productos,
    Producto,
    Carrito
    // Header
  },
  setup() {
    const store = useStore()
    const productos = computed(() => store.state.productos)
    const mostrarProductosEnCarrito = ref(store.state.mostrarProductos)
    const realizarPago = () => {
      // Realizar la lógica para realizar el pago
    }
    const toggleMostrarProductos = () => {
      mostrarProductosEnCarrito.value = !mostrarProductosEnCarrito.value
      store.dispatch('verCarrito', mostrarProductosEnCarrito)
    }

    return {
      productos,
      mostrarProductosEnCarrito,
      realizarPago,
      toggleMostrarProductos
    }
  }
}
</script>

<style scoped>
.column {
  align-content: center;
  vertical-align: center;
  width: 100%;
  height: 100%;
  padding: 10%;
}
</style>
