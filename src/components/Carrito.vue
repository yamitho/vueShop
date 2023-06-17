<template>
  <div>
    <div v-if="total != '0'">
      <div v-for="item in carrito" :key="item.producto.id">
        <div style="display: flex; align-items: center;">
          <span class="span-cantidad" style="">{{ item.cantidad }}</span>
          <img :src="item.producto.imagen" alt="Imagen del producto" class="producto-imagen" />
        </div>
      </div>
      <div>
        Total: {{ total }}
        <form>
          <div ref="checkoutForm"></div>
        </form>
      </div>
    </div>
    <div v-else>
      <div><span>Please choose a product on the left</span></div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const carrito = computed(() => store.state.carrito)
    const script = document.createElement('script')
    const aumentarCantidad = (item) => {
      store.dispatch('aumentarCantidad', item)
    }

    const disminuirCantidad = (item) => {
      store.dispatch('disminuirCantidad', item)
    }

    const total = computed(() => {
      return store.state.carrito.reduce((acc, item) => {
        return acc + item.producto.precio * item.cantidad
      }, 0)
    })

    script.src = 'https://checkout.wompi.co/widget.js'
    script.setAttribute('data-render', 'button')
    script.setAttribute('data-public-key', 'pub_test_X0zDA9xoKdePzhd8a0x9HAez7HgGO2fH')
    script.setAttribute('data-currency', 'COP')
    script.setAttribute('data-amount-in-cents', '4950000')
    script.setAttribute('data-reference', '4XMPGKWWPKWQ')
    script.setAttribute(
      'data-signature:integrity',
      '37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5'
    )

    const checkoutForm = ref(null)

    watch(
      () => checkoutForm.value,
      (newValue) => {
        if (newValue) {
          newValue.appendChild(script)
        }
      }
    )

    return {
      carrito,
      aumentarCantidad,
      disminuirCantidad,
      total,
      checkoutForm
    }
  }
}
</script>

<style scoped>
.producto-imagen {
  width: 10%;
  height: 100%;
}
</style>
