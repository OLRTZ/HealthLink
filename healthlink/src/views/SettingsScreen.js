import { Pressable, Text, View } from 'react-native';

export default function SettingsScreen({
  highContrast,
  largeText,
  onHighContrastChange,
  onLargeTextChange,
  styles,
}) {
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Accessibility</Text>
      </View>

      <Pressable
        accessibilityLabel="Toggle large text"
        accessibilityRole="button"
        style={styles.mainButton}
        onPress={() => onLargeTextChange(!largeText)}
      >
        <Text style={styles.mainButtonText}>
          {largeText ? 'Use Normal Text' : 'Use Large Text'}
        </Text>
      </Pressable>

      <Pressable
        accessibilityLabel="Toggle high contrast"
        accessibilityRole="button"
        style={styles.mainButton}
        onPress={() => onHighContrastChange(!highContrast)}
      >
        <Text style={styles.mainButtonText}>
          {highContrast ? 'Turn Off High Contrast' : 'Turn On High Contrast'}
        </Text>
      </Pressable>
    </>
  );
}
