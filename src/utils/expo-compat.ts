import { Platform } from 'react-native';

// Expo compatibility utilities
export const isExpoEnvironment = () => {
  try {
    // Check if we're running in Expo environment
    return !!(global as any).__expo || !!(global as any).expo;
  } catch {
    return false;
  }
};

export const getExpoConstants = () => {
  try {
    if (isExpoEnvironment()) {
      // Try to import Expo Constants
      const Constants = require('expo-constants');
      return Constants.default || Constants;
    }
  } catch {
    // Expo Constants not available
  }
  return null;
};

export const handleExpoPermissions = async () => {
  if (!isExpoEnvironment()) {
    return true; // Not in Expo, use regular permission handling
  }

  try {
    // Try to use Expo AV permissions
    const { Audio } = require('expo-av');
    const { Camera } = require('expo-camera');
    
    const audioPermission = await Audio.requestPermissionsAsync();
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    
    return audioPermission.granted && cameraPermission.granted;
  } catch (error) {
    console.warn('Expo permissions not available, falling back to React Native permissions');
    return false;
  }
};

export const getExpoDeviceInfo = () => {
  try {
    if (isExpoEnvironment()) {
      const Constants = getExpoConstants();
      return {
        deviceName: Constants?.deviceName || 'Unknown Device',
        platform: Platform.OS,
        version: Constants?.expoVersion || 'Unknown'
      };
    }
  } catch {
    // Fallback
  }
  
  return {
    deviceName: 'Unknown Device',
    platform: Platform.OS,
    version: 'Unknown'
  };
};