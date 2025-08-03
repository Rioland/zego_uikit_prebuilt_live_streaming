# Quick start

## Expo Support

This library now supports Expo! You can use it in both managed and bare Expo workflows.

### Expo Installation

1. Install the package:
```bash
npx expo install @zegocloud/zego-uikit-prebuilt-live-streaming-rn
```

2. Add the plugin to your `app.config.js` or `expo.json`:
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

3. For development builds, run:
```bash
npx expo run:ios
# or
npx expo run:android
```

### Required Permissions

The plugin automatically adds the necessary permissions:
- **iOS**: Camera and Microphone usage descriptions
- **Android**: Camera, Record Audio, Internet, and Network State permissions

- - -

[![](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/EtNRATttyp)

> If you have any questions regarding bugs and feature requests, visit the [ZEGOCLOUD community](https://discord.gg/EtNRATttyp) .

## Integrate the SDK

[![Tutorial | How to build live streaming using React Native in 10 mins with ZEGOCLOUD](https://res.cloudinary.com/marcomontalbano/image/upload/v1682409295/video_to_markdown/images/youtube--Ch_szozkMfA-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/Ch_szozkMfA "Tutorial | How to build live streaming using React Native in 10 mins with ZEGOCLOUD")

### Import the SDK

### Add @zegocloud/zego-uikit-prebuilt-live-streaming-rn as dependencies

```bash
# For React Native CLI projects
yarn add @zegocloud/zego-uikit-prebuilt-live-streaming-rn 

# For Expo projects
npx expo install @zegocloud/zego-uikit-prebuilt-live-streaming-rn
```

### Add other dependencies

Run the following command to install other dependencies for making sure the `@zegocloud/zego-uikit-prebuilt-live-streaming-rn` can work properly:

```bash
# For React Native CLI projects
yarn add @zegocloud/zego-uikit-rn react-delegate-component zego-express-engine-reactnative

# For Expo projects
npx expo install @zegocloud/zego-uikit-rn react-delegate-component zego-express-engine-reactnative
```

**Note for Expo users**: Some dependencies may require development builds. If you encounter issues with the managed workflow, consider using a development build or ejecting to a bare workflow.

```bash
npx expo run:ios  # or npx expo run:android
```

### Using the `ZegoUIKitPrebuiltLiveStreaming` Component in your project

- Go to [ZEGOCLOUD Admin Console\|_blank](https://console.zegocloud.com/), get the `appID` and `appSign` of your project.
- Specify the `userID` and `userName` for connecting the LiveStreaming Kit service. 
- Create a `liveID` that represents the live streaming you want to make. 

<div class="mk-hint">

- `userID` and `callID` can only contain numbers, letters, and underlines (_). 
- Using the same `liveID` will enter the same live streaming.
</div>



```js
// HostPage.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'

export default function HostPage(props) {
    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltLiveStreaming
                appID={yourAppID}
                appSign={yourAppSign}
                userID={userID}
                userName={userName}
                liveID={liveID}

                config={{
                    ...HOST_DEFAULT_CONFIG,
                    onLeaveLiveStreaming: () => { props.navigation.navigate('HomePage') }
                }}
            />
        </View>
    );
}
```


## Configure your project

### For Expo Projects

If you're using Expo, the plugin will automatically configure permissions. No additional setup is needed for permissions.

### For React Native CLI Projects

- Android: 

Open `my_project/android/app/src/main/AndroidManifest.xml` file and add the code as follow:

<img src="/Pics/ZegoUIKit/RN/PrebuiltCall/android_config.gif" width=500/>

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.CAMERA" />
```

- iOS:

Open `my_project/ios/my_project/Info.plist` file and add the code as follow:

<img src="/Pics/ZegoUIKit/RN/PrebuiltCall/ios_config.gif" width=500/>

```xml
<key>NSCameraUsageDescription</key>
<string></string>
<key>NSMicrophoneUsageDescription</key>
<string></string>
```

## Run & Test

- Run on an iOS device:
```bash
yarn android
```
- Run on an Android device:
```bash
yarn ios
```

## Related guide

[Custom prebuilt UI](https://docs.zegocloud.com/article/14879)

[Sample code](https://github.com/ZEGOCLOUD/zego_uikit_prebuilt_live_streaming_example_rn)

