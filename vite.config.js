import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//se actualizo el repositorio y la gh page de la sumativa anterior
export default defineConfig({
    plugins: [react()],
    base: '/ecommerce-s6-LazarethParra/'
})
