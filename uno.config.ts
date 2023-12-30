import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  theme: {
  },
  shortcuts: {
    'j-btn': 'h-48px bg-#5926b9 text-white rounded-8px text-18px whitespace-nowrap',
    'j-input-text': 'h-48px px-16px leading-32px py-8px b-#5C33BE b-1 focus:shadow focus:shadow-inset rounded-8px text-18px',
    'j-form': 'px-16px flex flex-col gap-y-24px children-flex children-flex-col',
    'j-form-label': 'text-18px mb-8px',
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
})
