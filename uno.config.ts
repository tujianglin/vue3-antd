import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex justify-between'],
    ['flex-end', 'flex items-end'],
    ['text-ellipsis', 'text-ellipsis overflow-hidden whitespace-nowrap'],
    ['wh-full', 'w-full h-full'],
  ],
});
