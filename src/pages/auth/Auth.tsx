import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import { useEffect } from 'react';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function AuthPage() {
  const [request, response, promptAsync] = useAuthRequest(
    {
        clientId: '132e974dd45c4b81be56a8e62bef3e51',
        scopes: ['user-read-email', 'playlist-modify-public'],
        usePKCE: true,
        redirectUri: makeRedirectUri({
          scheme: 'musico'
        }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      console.log(response);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title="Login by Spotify"
        onPress={() => {
          promptAsync();
        }}
        disabled={!request}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
