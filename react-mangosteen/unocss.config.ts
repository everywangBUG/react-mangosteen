import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['account-start-button', 'w-[90%] bg-orange rounded-[8px] h-50px text-[24px] text-white']
  ],
  theme: {
    colors: {}
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
})
