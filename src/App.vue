<script setup>
  import useClima from "./composables/useClima"
  import Clima from "./components/Clima.vue"
  import Formulario from "./components/Formulario.vue"
  import Spinner from "./components/Spinner.vue"
  import Alerta from "./components/Alerta.vue"

  const {obtenerClima, clima, mostrarClima, cargando, errorComposable} = useClima()
</script>

<template>
  <h1 class="titulo">Buscador de Clima (LP)</h1>
  <div class="contenedor buscador-clima">
    <Formulario 
      @obtener-clima="obtenerClima"
    />
    <Spinner v-if="cargando" />
    <Alerta v-if="errorComposable">{{errorComposable}}</Alerta>
    <Clima 
      v-if="mostrarClima" 
      :clima="clima"  
    />
  </div>
</template>
