import { Pressable, Text, View } from 'react-native';
import { departments, hospitals, reasons, slots } from '../models/appointmentModel';
import OptionList from './OptionList';

export default function BookScreen({
  department,
  hospital,
  message,
  reason,
  slot,
  onBook,
  onDepartmentChange,
  onHospitalChange,
  onReasonChange,
  onSlotChange,
  styles,
}) {
  return (
    <>
      {message !== '' && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <OptionList
        label="Hospital"
        options={hospitals}
        selected={hospital}
        styles={styles}
        onSelect={onHospitalChange}
      />
      <OptionList
        label="Department"
        options={departments}
        selected={department}
        styles={styles}
        onSelect={onDepartmentChange}
      />
      <OptionList
        label="Date and time"
        options={slots}
        selected={slot}
        styles={styles}
        onSelect={onSlotChange}
      />
      <OptionList
        label="Reason"
        options={reasons}
        selected={reason}
        styles={styles}
        onSelect={onReasonChange}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Summary</Text>
        <Text style={styles.text}>Hospital: {hospital || 'Not selected'}</Text>
        <Text style={styles.text}>Department: {department || 'Not selected'}</Text>
        <Text style={styles.text}>Time: {slot || 'Not selected'}</Text>
        <Text style={styles.text}>Reason: {reason || 'Not selected'}</Text>
      </View>

      <Pressable
        accessibilityLabel="Request appointment button"
        accessibilityRole="button"
        style={styles.mainButton}
        onPress={onBook}
      >
        <Text style={styles.mainButtonText}>Request Appointment</Text>
      </Pressable>
    </>
  );
}
