import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import AppWidget from './Src/Shared/Widget';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Src/**/*.jsx', { eager: true });
    let page = pages[`./Src/${name}.jsx`];
    page.default.layout = page.default.layout || AppWidget;
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})