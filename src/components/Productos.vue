<template>
  <div class="productos">
    <div class="producto" v-for="producto in productos" :key="producto.id">
      <img
        :src="producto.imagen"
        alt="Imagen del producto"
        class="producto-imagen"
        @click="seleccionarProducto(producto)"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const productos = computed(() => store.state.productos)

    const seleccionarProducto = (producto) => {
      store.dispatch('productoSeleccionado', producto)
      store.dispatch('ocultarCarrito')
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    return {
      productos,
      seleccionarProducto
    }
  }
}
</script>

<style scoped>
.productos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.producto {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
}

.producto-imagen {
  width: 100%;
  height: 100%;
}

button {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .productos {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    overflow-y: scroll;
  }
}
</style>
