import { Pressable, Text, View } from 'react-native';

export default function AppointmentsScreen({ appointments, message, onCancel, styles }) {
  return (
    <>
      {message !== '' && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      {appointments.map((appointment) => (
        <View key={appointment.id} style={styles.card}>
          <Text style={styles.cardTitle}>{appointment.hospital}</Text>
          <Text style={styles.text}>Department: {appointment.department}</Text>
          <Text style={styles.text}>
            Date: {appointment.date} at {appointment.time}
          </Text>
          <Text style={styles.text}>Reason: {appointment.reason}</Text>
          <Text style={styles.status}>Status: {appointment.status}</Text>
          <Pressable
            accessibilityLabel={`Cancel appointment at ${appointment.hospital}`}
            accessibilityRole="button"
            style={styles.cancelButton}
            onPress={() => onCancel(appointment.id)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      ))}
    </>
  );
}
