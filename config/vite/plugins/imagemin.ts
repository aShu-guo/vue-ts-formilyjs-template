import viteImagemin from 'vite-plugin-imagemin';

export function ConfigImageminPlugin() {
  return viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    mozjpeg: {
      quality: 20,
    },
    optipng: {
      optimizationLevel: 7,
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 10,
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
      ],
    },
  });
}
