<script setup>
    import useClima from "../composables/useClima"
    
    const {convertirKelvinEnCelsius} = useClima()

    defineProps({
        clima: {
            type: Object,
            required: true,
        },
    })
</script>
<template>
    <div class="resultado">
        <h2>Clima de: {{clima.name}}</h2>
        <p class="actual">{{convertirKelvinEnCelsius(clima.main.temp)}}&deg;C</p>
        <div class="temperaturas">
            <p>Min: <span>{{convertirKelvinEnCelsius(clima.main.temp_min)}}&deg;C</span></p>
            <p>Max: <span>{{convertirKelvinEnCelsius(clima.main.temp_max)}}&deg;C</span></p>
        </div>
    </div>
</template>