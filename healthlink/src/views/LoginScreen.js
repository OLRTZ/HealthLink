import { Pressable, Text, TextInput, View } from 'react-native';

export default function LoginScreen({
  email,
  message,
  password,
  onEmailChange,
  onLogin,
  onPasswordChange,
  styles,
}) {
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome to HealthLink UK</Text>
      </View>

      {message !== '' && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <TextInput
        accessibilityLabel="Username input"
        accessibilityRole="text"
        autoCapitalize="none"
        placeholder="Username"
        placeholderTextColor={styles.searchPlaceholder.color}
        style={styles.searchInput}
        value={email}
        onChangeText={onEmailChange}
      />

      <TextInput
        accessibilityLabel="Password input"
        accessibilityRole="text"
        placeholder="Password"
        placeholderTextColor={styles.searchPlaceholder.color}
        secureTextEntry
        style={styles.searchInput}
        value={password}
        onChangeText={onPasswordChange}
      />

      <Pressable
        accessibilityLabel="Login button"
        accessibilityRole="button"
        style={styles.mainButton}
        onPress={onLogin}
      >
        <Text style={styles.mainButtonText}>Login</Text>
      </Pressable>
    </>
  );
}
