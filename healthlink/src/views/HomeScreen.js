import { Pressable, Text, View } from 'react-native';

function InfoBox({ label, value, styles }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
}

export default function HomeScreen({
  appointmentCount,
  onGoToAppointments,
  onGoToBook,
  onGoToProfile,
  onGoToSettings,
  styles,
}) {
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dashboard</Text>
      </View>

      <View style={styles.row}>
        <InfoBox label="Appointments" value={appointmentCount.toString()} styles={styles} />
        <InfoBox label="Hospitals" value="3" styles={styles} />
      </View>

      <Pressable
        accessibilityLabel="Open book appointment screen"
        accessibilityRole="button"
        style={styles.mainButton}
        onPress={onGoToBook}
      >
        <Text style={styles.mainButtonText}>Book Appointment</Text>
      </Pressable>
      <Pressable
        accessibilityLabel="Open my appointments screen"
        accessibilityRole="button"
        style={styles.mainButton}
        onPress={onGoToAppointments}
      >
        <Text style={styles.mainButtonText}>My Appointments</Text>
      </Pressable>
      <Pressable
        accessibilityLabel="Open patient profile screen"
        accessibilityRole="button"
        style={styles.mainButton}
        onPress={onGoToProfile}
      >
        <Text style={styles.mainButtonText}>Patient Profile</Text>
      </Pressable>
      <Pressable
        accessibilityLabel="Open settings screen"
        accessibilityRole="button"
        style={styles.mainButton}
        onPress={onGoToSettings}
      >
        <Text style={styles.mainButtonText}>Settings</Text>
      </Pressable>
    </>
  );
}
