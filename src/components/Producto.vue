<template>
  <div v-if="Object.keys(producto).length !== 0">
    <ul>
      <li>
        <div></div>
        <img :src="producto.imagen" alt="Imagen del producto" class="producto-imagen" />
        <div>{{ producto.nombre }} - {{ producto.cantidad }} - {{ producto.precio }}</div>
        <button @click="aumentarCantidad()">+</button>
        <button @click="disminuirCantidad()">-</button>
      </li>
    </ul>
  </div>
  <div v-else>
    <div>Please choose a product on the left</div>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const productoRef = ref({})
    const cantidad = 0

    const actualizarProducto = () => {
      const producto = store.state.productoSeleccionado
      productoRef.value = { ...producto }
    }

    const aumentarCantidad = () => {
      productoRef.value.cantidad++
      store.dispatch('aumentarCantidad', productoRef.value)
    }

    const disminuirCantidad = () => {
      productoRef.value.cantidad--
      store.dispatch('disminuirCantidad', productoRef.value)
    }

    const total = computed(() => {
      return store.state.carrito.reduce((acc, item) => {
        return acc + item.producto.precio * item.cantidad
      }, 0)
    })

    watch(() => store.state.productoSeleccionado, actualizarProducto, { immediate: true })

    return {
      producto: productoRef,
      aumentarCantidad,
      disminuirCantidad,
      total,
      cantidad
    }
  }
}
</script>

<style>
.producto-imagen {
  width: 100px;
  height: 100px;
}
</style>
