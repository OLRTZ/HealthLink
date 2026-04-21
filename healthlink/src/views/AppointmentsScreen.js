import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function AppointmentsScreen({
  appointments,
  message,
  onCancel,
  onReschedule,
  rescheduleSlots,
  styles,
}) {
  const [selectedSlots, setSelectedSlots] = useState({});

  const selectSlot = (appointmentId, slot) => {
    setSelectedSlots({
      ...selectedSlots,
      [appointmentId]: slot,
    });
  };

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
          {appointment.rescheduleRequest ? (
            <Text style={styles.text}>
              Requested new time: {appointment.rescheduleRequest}
            </Text>
          ) : null}
          {appointment.staffNote ? (
            <Text style={styles.text}>Staff note: {appointment.staffNote}</Text>
          ) : null}

          <Text style={styles.text}>Request a new time:</Text>
          {rescheduleSlots.map((item) => (
            <Pressable
              accessibilityLabel={`Select ${item} for reschedule`}
              accessibilityRole="button"
              key={`${appointment.id}-${item}`}
              style={
                selectedSlots[appointment.id] === item
                  ? styles.selectedOption
                  : styles.option
              }
              onPress={() => selectSlot(appointment.id, item)}
            >
              <Text
                style={
                  selectedSlots[appointment.id] === item
                    ? styles.selectedOptionText
                    : styles.optionText
                }
              >
                {item}
              </Text>
            </Pressable>
          ))}
          <Pressable
            accessibilityLabel={`Request reschedule for appointment at ${appointment.hospital}`}
            accessibilityRole="button"
            style={styles.secondaryButton}
            onPress={() =>
              onReschedule(appointment.id, selectedSlots[appointment.id] || '')
            }
          >
            <Text style={styles.secondaryButtonText}>Request Reschedule</Text>
          </Pressable>
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
