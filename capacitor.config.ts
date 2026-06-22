import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.samajconnect',
  appName: 'Samaj Connect',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
