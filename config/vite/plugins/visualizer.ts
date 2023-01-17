import visualizer from 'rollup-plugin-visualizer';

export function ConfigVisualizerConfig(buildEnv: 'prod' | 'test') {
  if (buildEnv !== 'prod') {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
  }
  return [];
}
