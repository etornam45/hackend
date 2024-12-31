import { defineConfig, presetUno, transformerVariantGroup } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'


export default defineConfig({
    presets: [
        presetUno(),
        presetIcons({
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle',
            },
        }),
        presetWebFonts({
            provider: 'google',
            fonts: {
                mono: ['JetBrains Mono', 'Fira Code', 'Fira Mono:400,700'],
            },
        }),
    ],
    transformers: [
        transformerVariantGroup(),
    ],
})