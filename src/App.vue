<script setup>
  import useClima from "./composables/useClima"
  import Clima from "./components/Clima.vue"
  import Formulario from "./components/Formulario.vue"

  const {obtenerClima, clima, mostrarClima} = useClima()
</script>

<template>
  <h1 class="titulo">Buscador de Clima</h1>
  <div class="contenedor buscador-clima">
    <Formulario 
      @obtener-clima="obtenerClima"
    />
    <Clima 
      v-if="mostrarClima" 
    />
  </div>
</template>
