/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  distDir: 'out', // Este es el directorio que se generará al exportar el proyecto
  async exportPathMap(defaultPathMap) {
    return {
      '/': { page: '/' },
      '/menu': { page: '/menu' },
      '/Modificar_recluta': { page: '/Modificar_recluta' },
      '/Modificar_usuario': { page: '/Modificar_usuario' },
      '/Registrar_reclutas': { page: '/Registrar_reclutas' },
      '/Registrar_usuario': { page: '/Registrar_usuario' },
      '/Visualisar_reclutas': { page: '/Visualisar_reclutas' },
      '/Visualisar_usuarios': { page: '/Visualisar_usuarios' },
    };
  },
};

export default nextConfig;
