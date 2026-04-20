import { Pressable, Text, TextInput, View } from 'react-native';

export default function StaffDashboardScreen({
  appointments,
  filter,
  message,
  search,
  onConfirm,
  onReject,
  onFilterChange,
  onSearchChange,
  styles,
}) {
  const filteredByStatus = appointments.filter((appointment) => {
    if (filter === 'All') {
      return true;
    }

    if (filter === 'Waiting') {
      return appointment.status === 'Waiting for hospital';
    }

    if (filter === 'Confirmed') {
      return appointment.status === 'Confirmed';
    }

    return appointment.status === 'Rejected by hospital';
  });

  const filteredAppointments = filteredByStatus.filter((appointment) => {
    const searchText = search.toLowerCase();

    return (
      appointment.patientName.toLowerCase().includes(searchText) ||
      appointment.nhsNumber.toLowerCase().includes(searchText) ||
      appointment.hospital.toLowerCase().includes(searchText) ||
      appointment.department.toLowerCase().includes(searchText) ||
      appointment.reason.toLowerCase().includes(searchText)
    );
  });

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hospital Staff Dashboard</Text>
      </View>

      <View style={styles.filterRow}>
        {['Waiting', 'Confirmed', 'Rejected', 'All'].map((item) => (
          <Pressable
            accessibilityLabel={`${item} appointments filter`}
            accessibilityRole="button"
            key={item}
            style={filter === item ? styles.filterButtonSelected : styles.filterButton}
            onPress={() => onFilterChange(item)}
          >
            <Text
              style={
                filter === item ? styles.filterButtonTextSelected : styles.filterButtonText
              }
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        accessibilityLabel="Search appointments"
        accessibilityRole="search"
        style={styles.searchInput}
        placeholder="Search by patient, NHS number, hospital, department, or reason"
        placeholderTextColor={styles.searchPlaceholder.color}
        value={search}
        onChangeText={onSearchChange}
      />

      {message !== '' && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      {filteredAppointments.length === 0 && (
        <View style={styles.card}>
          <Text style={styles.text}>There are no appointments for this filter.</Text>
        </View>
      )}

      {filteredAppointments.map((appointment) => (
        <View key={appointment.id} style={styles.card}>
          <Text style={styles.cardTitle}>{appointment.hospital}</Text>
          <Text style={styles.text}>Patient: {appointment.patientName}</Text>
          <Text style={styles.text}>NHS number: {appointment.nhsNumber}</Text>
          {appointment.phone && <Text style={styles.text}>Phone: {appointment.phone}</Text>}
          <Text style={styles.text}>Department: {appointment.department}</Text>
          <Text style={styles.text}>
            Date: {appointment.date} at {appointment.time}
          </Text>
          <Text style={styles.text}>Reason: {appointment.reason}</Text>
          <Text style={styles.status}>Status: {appointment.status}</Text>
          {appointment.status === 'Waiting for hospital' && (
            <>
              <Pressable
                accessibilityLabel={`Confirm appointment for ${appointment.patientName}`}
                accessibilityRole="button"
                style={styles.mainButton}
                onPress={() => onConfirm(appointment.id)}
              >
                <Text style={styles.mainButtonText}>Confirm Appointment</Text>
              </Pressable>
              <Pressable
                accessibilityLabel={`Reject appointment for ${appointment.patientName}`}
                accessibilityRole="button"
                style={styles.cancelButton}
                onPress={() => onReject(appointment.id)}
              >
                <Text style={styles.cancelButtonText}>Reject Appointment</Text>
              </Pressable>
            </>
          )}
        </View>
      ))}
    </>
  );
}
