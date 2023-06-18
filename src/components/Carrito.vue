<template>
  <div>
    <div v-if="total != '0'">
      <div v-for="item in carrito" :key="item.producto.id">
        <div style="display: flex; align-items: center">
          <span class="span-cantidad" style="">{{ item.cantidad }}</span>
          <img :src="item.producto.imagen" alt="Imagen del producto" class="producto-imagen" />
        </div>
      </div>
      <div>
        Total: {{ total }}
        <div class="checkoutForm" ref="checkoutForm"></div>
        <div>
          <button class="paymentButton" @click="abrirCheckout()">
            Paga con
            <strong>Wompi</strong>
          </button>
        </div>
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

    const checkout = new WidgetCheckout({
      currency: 'COP',
      amountInCents: 2490000,
      reference: 'AD002901221',
      publicKey: 'pub_fENJ3hdTJxdzs3hd35PxDBSMB4f85VrgiY3b6s1',
      redirectUrl: 'https://transaction-redirect.wompi.co/check', // Opcional
      taxInCents: {
        // Opcional
        vat: 1900,
        consumption: 800
      },
      customerData: {
        // Opcional
        email: 'lola@gmail.com',
        fullName: 'Lola Flores',
        phoneNumber: '3040777777',
        phoneNumberPrefix: '+57',
        legalId: '123456789',
        legalIdType: 'CC'
      },
      shippingAddress: {
        // Opcional
        addressLine1: 'Calle 123 # 4-5',
        city: 'Bogota',
        phoneNumber: '3019444444',
        region: 'Cundinamarca',
        country: 'CO'
      }
    })

    function abrirCheckout() {
      checkout.open(function (result) {
        var transaction = result.transaction
        console.log('Transaction ID: ', transaction.id)
        console.log('Transaction object: ', transaction)
      })
    }

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
      checkoutForm,
      checkout,
      abrirCheckout
    }
  }
}
</script>

<style scoped>
.producto-imagen {
  width: 10%;
  height: 100%;
}

@media (min-width: 768px) {
  .paymentButton {
    display: none;
  }
}

@media (max-width: 768px) {
  .producto-imagen {
    width: 50%;
    height: 100%;
  }

  .checkoutForm {
    display: none;
  }

  .paymentButton {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background-color: rgb(26, 69, 148);
    border: 0px none;
    border-radius: 4px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 400;
    font-size: 10px;
    padding: 0px 16px;
    color: white;
    cursor: pointer;
  }
  .paymentButton::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 229.5 229.5'%3E%3Cpath fill='%23fff' d='M214.419 32.12A7.502 7.502 0 0 0 209 25.927L116.76.275a7.496 7.496 0 0 0-4.02 0L20.5 25.927a7.5 7.5 0 0 0-5.419 6.193c-.535 3.847-12.74 94.743 18.565 139.961 31.268 45.164 77.395 56.738 79.343 57.209a7.484 7.484 0 0 0 3.522 0c1.949-.471 48.076-12.045 79.343-57.209 31.305-45.217 19.1-136.113 18.565-139.961zm-40.186 53.066l-62.917 62.917c-1.464 1.464-3.384 2.197-5.303 2.197s-3.839-.732-5.303-2.197l-38.901-38.901a7.497 7.497 0 0 1 0-10.606l7.724-7.724a7.5 7.5 0 0 1 10.606 0l25.874 25.874 49.89-49.891a7.497 7.497 0 0 1 10.606 0l7.724 7.724a7.5 7.5 0 0 1 0 10.607z'/%3E%3C/svg%3E");
    background-size: contain;
    vertical-align: middle;
    transform: translateY(-8%);
  }
  .paymentButton strong {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 600;
    font-size: 14px;
    color: white;
    cursor: pointer;
  }
}
</style>
