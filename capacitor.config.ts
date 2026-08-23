import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sangath.community',
  appName: 'Sangath',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
