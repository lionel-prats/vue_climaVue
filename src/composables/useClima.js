import {ref, computed} from "vue"
import axios from "axios"

export default function useClima() {

    const clima = ref({}) // state
    const cargando = ref(false) // state
    const errorComposable = ref("") // state

    const obtenerClima = async({ciudad, pais}) => {

        clima.value = {}
        cargando.value = true
        errorComposable.value = ""

        // importo la Api Key (guardada en .env.local) de la API del clima vvv
        const key = import.meta.env.VITE_API_KEY 

        try {
            // obtener la latitud y la longitud vvv
            // formato de la peticion segun la documentacion (v172) vvv 
            // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`
            const {data} = await axios(url)
            const {lat, lon} = data[0]
            
            // obtener el clima de la ciudad luego de obtener la latitud y la longitud de la misma vvv
            // formato de la peticion segun la documentacion (v172) vvv 
            // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
            const {data: resultado} = await axios(urlClima)
            clima.value = resultado

        } catch {
            errorComposable.value = "Ciudad no encontrada"
        } finally { 
            // el finally se ejecuta siempre, independientemente de que se ejecute el try o el catch
            cargando.value = false
        }
    }

    const mostrarClima = computed( () => { // computed property
        return Object.keys(clima.value).length > 0
    })

    const convertirKelvinEnCelsius = tKelvin => parseInt(tKelvin - 273.15)
    // parseInt elimina la parte decimal de un numero vvv 
    // console.log(parseInt(2.999)) // 2

    return {
        obtenerClima,
        clima,
        mostrarClima,
        convertirKelvinEnCelsius,
        cargando,
        errorComposable,
    }
}