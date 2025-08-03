const { withPlugins, withDangerousMod, withInfoPlist, withAndroidManifest } = require('@expo/config-plugins');

const withLiveStreamingPermissions = (config) => {
  // iOS permissions
  config = withInfoPlist(config, (config) => {
    config.modResults.NSCameraUsageDescription = 
      config.modResults.NSCameraUsageDescription || 
      'This app needs access to camera for live streaming';
    config.modResults.NSMicrophoneUsageDescription = 
      config.modResults.NSMicrophoneUsageDescription || 
      'This app needs access to microphone for live streaming';
    return config;
  });

  // Android permissions
  config = withAndroidManifest(config, (config) => {
    const permissions = [
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE'
    ];

    permissions.forEach(permission => {
      if (!config.modResults.manifest['uses-permission']?.find(p => p.$['android:name'] === permission)) {
        config.modResults.manifest['uses-permission'] = config.modResults.manifest['uses-permission'] || [];
        config.modResults.manifest['uses-permission'].push({
          $: { 'android:name': permission }
        });
      }
    });

    return config;
  });

  return config;
};

module.exports = withLiveStreamingPermissions;