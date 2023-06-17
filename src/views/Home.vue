<template>
  <div style="height: 100%; width: 100%">
    <div class="header">
      <div style="width: 50%">
        <img src="@/components/icons/shop.png" alt="" width="100" height="100" />
        <h3>Store</h3>
      </div>

      <div class="header-right">
        <h3 style="align-self: flex-end;" v-show="!mostrarProductosEnCarrito">Poduct</h3>
        <h3 style="align-self: flex-end;" v-show="mostrarProductosEnCarrito">Shopping Cart</h3>
        <button @click="toggleMostrarProductos">
          {{ mostrarProductosEnCarrito ? 'Cart X' : 'Cart' }}
        </button>
      </div>
    </div>
    <div style="display: flex">
      <div class="column">
        <hr />
        <br />
        <Productos />
      </div>
      <div class="column">
        <div v-show="mostrarProductosEnCarrito">
          <hr />
          <br />
          <Carrito />
        </div>
        <div v-show="!mostrarProductosEnCarrito">
          <hr />
          <br />
          <Producto />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  },
  setup() {
    const store = useStore()
    const productos = computed(() => store.state.productos)
    const mostrarProductosEnCarrito = ref(store.state.mostrarProductos)
    const toggleMostrarProductos = () => {
      mostrarProductosEnCarrito.value = !mostrarProductosEnCarrito.value
      store.dispatch('verCarrito', mostrarProductosEnCarrito)
    }

    return {
      productos,
      mostrarProductosEnCarrito,
      toggleMostrarProductos
    }
  }
}
</script>

<style scoped>
.column {
  align-content: top;
  vertical-align: center;
  width: 50%;
  padding: 10px;
}
.header {
  width: 100%;
  padding: 10px;
  display: flex;
}

.header-right {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
