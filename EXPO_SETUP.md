# Expo Setup Guide

This guide will help you set up the Zego UIKit Prebuilt Live Streaming library in your Expo project.

## Prerequisites

- Expo CLI installed (`npm install -g @expo/cli`)
- Node.js 16 or later
- A ZEGOCLOUD account and App ID/App Sign

## Installation

### 1. Install the Package

For managed Expo projects:
```bash
npx expo install @zegocloud/zego-uikit-prebuilt-live-streaming-rn
```

For bare React Native projects:
```bash
npm install @zegocloud/zego-uikit-prebuilt-live-streaming-rn
# or
yarn add @zegocloud/zego-uikit-prebuilt-live-streaming-rn
```

### 2. Install Dependencies

```bash
npx expo install @zegocloud/zego-uikit-rn react-delegate-component zego-express-engine-reactnative expo-av expo-camera
```

### 3. Configure Your App

Add the plugin to your `app.config.js` or `expo.json`:

```javascript
// app.config.js
export default {
  expo: {
    // ... other config
    plugins: [
      '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
    ]
  }
};
```

### 4. Development Build

Since this library uses native modules, you'll need to create a development build:

```bash
# For iOS
npx expo run:ios

# For Android  
npx expo run:android
```

## Usage

```javascript
import ZegoUIKitPrebuiltLiveStreaming, { 
  HOST_DEFAULT_CONFIG, 
  AUDIENCE_DEFAULT_CONFIG 
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';

export default function LiveStreamingPage() {
  return (
    <ZegoUIKitPrebuiltLiveStreaming
      appID={YOUR_APP_ID}
      appSign={YOUR_APP_SIGN}
      userID={userID}
      userName={userName}
      liveID={liveID}
      config={HOST_DEFAULT_CONFIG} // or AUDIENCE_DEFAULT_CONFIG
    />
  );
}
```

## Permissions

The plugin automatically handles permissions for:
- Camera access
- Microphone access
- Network access

## Troubleshooting

### Common Issues

1. **"Module not found" errors**: Make sure you've installed all dependencies and created a development build.

2. **Permission errors**: The plugin should handle permissions automatically, but you can also request them manually using `expo-av` and `expo-camera`.

3. **Build errors**: Ensure you're using a development build, not Expo Go, as this library requires native modules.

### Getting Help

- Check the [main README](./README.md) for general usage
- Visit the [ZEGOCLOUD Discord](https://discord.gg/EtNRATttyp) for community support
- Review the example app in `example-expo/` folder

## Example Project

See the `example-expo/` directory for a complete working example of how to integrate this library in an Expo project.