import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx
} from "unocss"

export default defineConfig({
  shortcuts: [
    ["account-start-button", "w-[100%] bg-orange rounded-[8px] h-50px text-[24px] text-white"],
    ["account-input-text", "h-48px px-16px leading-32px b-#ff8c09 b-1 border-solid focus:shadow focus:outline-0 focus:shadow-inset rounded-8px text-18px"],
    ["w-form", "px-16px flex flex-col gap-y-8px children-flex children-flex-col"],
    ["w-form-label", "text-18px"],
    ["w-btn", "text-18px text-white bg-orange rounded-8px px-16px py-8px w-full"],
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
