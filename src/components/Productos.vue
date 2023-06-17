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
    }

    return {
      productos,
      seleccionarProducto
    }
  }
}
</script>

<style>
.productos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 2fr));
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
  width: 100px;
  height: 100px;
}

.producto-nombre {
  margin-top: 10px;
  font-weight: bold;
}

.producto-precio {
  margin-top: 5px;
  color: #888;
}

button {
  margin-top: 10px;
}
</style>
