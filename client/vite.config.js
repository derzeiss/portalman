/** @type {import('vite').UserConfig} */
export default {
  optimizeDeps: {
    include: ['portalman_shared'],
  },
  build: {
    commonjsOptions: {
      include: [/portalman_shared/, /node_modules/],
    },
  },
};
