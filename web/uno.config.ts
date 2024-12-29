import { defineConfig, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'


export default defineConfig({
    presets: [
        presetUno(),
        presetIcons({
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle',
            },
        }),
    ],
})