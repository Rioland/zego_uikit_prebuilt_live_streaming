import { isExpoEnvironment, getExpoConstants, getExpoDeviceInfo } from '../utils/expo-compat';
import { zloginfo } from '../utils/logger';

export class ExpoService {
  private static instance: ExpoService;
  private isExpo: boolean;
  private constants: any;

  private constructor() {
    this.isExpo = isExpoEnvironment();
    this.constants = getExpoConstants();
    
    if (this.isExpo) {
      zloginfo('[ExpoService] Running in Expo environment');
    }
  }

  static getInstance(): ExpoService {
    if (!ExpoService.instance) {
      ExpoService.instance = new ExpoService();
    }
    return ExpoService.instance;
  }

  isExpoEnvironment(): boolean {
    return this.isExpo;
  }

  getDeviceInfo() {
    return getExpoDeviceInfo();
  }

  getAppInfo() {
    if (!this.isExpo || !this.constants) {
      return {
        name: 'Unknown App',
        version: '1.0.0',
        buildVersion: '1'
      };
    }

    return {
      name: this.constants.manifest?.name || 'Unknown App',
      version: this.constants.manifest?.version || '1.0.0',
      buildVersion: this.constants.manifest?.android?.versionCode?.toString() || 
                   this.constants.manifest?.ios?.buildNumber || '1'
    };
  }

  async checkExpoModules() {
    if (!this.isExpo) {
      return { available: false, modules: [] };
    }

    const availableModules = [];
    const moduleChecks = [
      { name: 'expo-av', module: () => require('expo-av') },
      { name: 'expo-camera', module: () => require('expo-camera') },
      { name: 'expo-constants', module: () => require('expo-constants') },
      { name: 'expo-device', module: () => require('expo-device') }
    ];

    for (const check of moduleChecks) {
      try {
        check.module();
        availableModules.push(check.name);
      } catch {
        zloginfo(`[ExpoService] ${check.name} not available`);
      }
    }

    return {
      available: true,
      modules: availableModules
    };
  }
}

export default ExpoService;