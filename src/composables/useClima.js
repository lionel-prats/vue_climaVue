import {ref, computed} from "vue"
import axios from "axios"

export default function useClima() {

    const clima = ref({})

    const obtenerClima = async({ciudad, pais}) => {
        // importo la Api Key (guardada en .env.local) de la API del clima vvv
        const key = import.meta.env.VITE_API_KEY 

        try {
            // obtener la latitud y la longitud vvv
            // formato de la peticion segun la documentacion (v172) vvv 
            // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`
            const {data} = await axios(url)
            const {lat, lon} = data[0]
            
            // obtener el clima de la ciudad luego de obtener la latitud y la longitud de la misma vvv
            // formato de la peticion segun la documentacion (v172) vvv 
            // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
            const {data: resultado} = await axios(urlClima)
            clima.value = resultado

        } catch (error) {
            console.log(error);
        }
    }

    const mostrarClima = computed( () => {
        return Object.keys(clima.value).length > 0
    })

    return {
        obtenerClima,
        clima,
        mostrarClima,
    }
}