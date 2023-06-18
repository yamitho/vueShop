<template>
  <div v-if="Object.keys(producto).length !== 0">
    <div>
      <span class="span-cantidad">
        {{ producto.cantidad }}
      </span>
    </div>
    <img :src="producto.imagen" alt="Imagen del producto" class="producto-imagen" />
    <div style="justify-content: space-between; display: flex">
      {{ producto.nombre }} - ${{ producto.precio }}
      <div>
        <button class="btn-subtract" @click="disminuirCantidad()">-</button>
        <button class="btn-add" @click="aumentarCantidad()">+</button>
      </div>
    </div>
    <hr/>
    <div>
      {{ producto.descripcion }}
    </div>
    <hr/>
  </div>
  <div v-else>
    <div><span>Please choose a product on the left</span></div>
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

<style scoped>
.producto-imagen {
  width: 50%;
  height: 100%;
}
</style>
