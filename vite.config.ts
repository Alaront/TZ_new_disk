import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '/src/assets/styles/variables.scss' as *;
          @use '/src/assets/styles/mixins.scss' as *;
          @use '/src/assets/styles/typography.scss' as *;
        `,
      },
    },
  },
})
