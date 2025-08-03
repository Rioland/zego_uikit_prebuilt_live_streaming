import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ZegoUIKitPrebuiltLiveStreaming, { 
  HOST_DEFAULT_CONFIG, 
  AUDIENCE_DEFAULT_CONFIG 
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';

// Replace with your actual App ID and App Sign from ZEGOCLOUD Console
const KeyCenter = {
  appID: 0, // Your App ID
  appSign: '', // Your App Sign
};

export default function App() {
  const [userID, setUserID] = useState('');
  const [liveID, setLiveID] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // Generate random IDs for demo
    setUserID(String(Math.floor(Math.random() * 100000)));
    setLiveID(String(Math.floor(Math.random() * 10000)));
  }, []);

  const startLive = (asHost) => {
    if (!KeyCenter.appID || !KeyCenter.appSign) {
      Alert.alert('Error', 'Please set your App ID and App Sign in KeyCenter');
      return;
    }
    
    if (!liveID.trim()) {
      Alert.alert('Error', 'Please enter a Live ID');
      return;
    }

    setIsHost(asHost);
    setCurrentPage('live');
  };

  const goHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'home') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Zego Live Streaming</Text>
        <Text style={styles.subtitle}>Expo Example</Text>
        
        <Text style={styles.userID}>Your User ID: {userID}</Text>
        
        <Text style={styles.label}>Live ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Live ID. e.g. 6666"
          value={liveID}
          onChangeText={(text) => setLiveID(text.replace(/[^0-9A-Za-z_]/g, ''))}
          maxLength={10}
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.hostButton]}
            onPress={() => startLive(true)}
            disabled={!liveID.trim()}
          >
            <Text style={styles.buttonText}>Start a Live</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.audienceButton]}
            onPress={() => startLive(false)}
            disabled={!liveID.trim()}
          >
            <Text style={styles.buttonText}>Watch a Live</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.liveContainer}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={KeyCenter.appID}
        appSign={KeyCenter.appSign}
        userID={userID}
        userName={`user_${userID}`}
        liveID={liveID}
        config={{
          ...(isHost ? HOST_DEFAULT_CONFIG : AUDIENCE_DEFAULT_CONFIG),
          onLeaveLiveStreaming: goHome,
          onLiveStreamingEnded: goHome,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  liveContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  userID: {
    fontSize: 14,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostButton: {
    backgroundColor: '#007AFF',
  },
  audienceButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});