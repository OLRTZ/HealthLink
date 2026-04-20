import { Pressable, Text, TextInput, View } from 'react-native';

export default function ProfileScreen({
  genderOptions,
  maritalStatusOptions,
  onEmergencyContactChange,
  patientProfile,
  onAllergiesChange,
  onGenderChange,
  onMaritalStatusChange,
  onPhoneChange,
  styles,
}) {
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Patient Details</Text>
        <Text style={styles.text}>Full name: {patientProfile.fullName}</Text>
        <Text style={styles.text}>NHS number: {patientProfile.nhsNumber}</Text>
        <Text style={styles.text}>Date of birth: {patientProfile.dateOfBirth}</Text>
      </View>

      <Text style={styles.cardTitle}>Gender</Text>
      <View style={styles.filterRow}>
        {genderOptions.map((option) => (
          <Pressable
            key={option}
            accessibilityLabel={`Gender option ${option}`}
            accessibilityRole="button"
            style={
              patientProfile.gender === option
                ? styles.filterButtonSelected
                : styles.filterButton
            }
            onPress={() => onGenderChange(option)}
          >
            <Text
              style={
                patientProfile.gender === option
                  ? styles.filterButtonTextSelected
                  : styles.filterButtonText
              }
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.cardTitle}>Marital status</Text>
      <View style={styles.filterRow}>
        {maritalStatusOptions.map((option) => (
          <Pressable
            key={option}
            accessibilityLabel={`Marital status option ${option}`}
            accessibilityRole="button"
            style={
              patientProfile.maritalStatus === option
                ? styles.filterButtonSelected
                : styles.filterButton
            }
            onPress={() => onMaritalStatusChange(option)}
          >
            <Text
              style={
                patientProfile.maritalStatus === option
                  ? styles.filterButtonTextSelected
                  : styles.filterButtonText
              }
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.cardTitle}>Phone number</Text>
      <TextInput
        accessibilityLabel="Phone number input"
        accessibilityRole="text"
        keyboardType="phone-pad"
        placeholder="Phone number"
        placeholderTextColor={styles.searchPlaceholder.color}
        style={styles.searchInput}
        value={patientProfile.phone}
        onChangeText={onPhoneChange}
      />

      <Text style={styles.cardTitle}>Emergency contact</Text>
      <TextInput
        accessibilityLabel="Emergency contact input"
        accessibilityRole="text"
        placeholder="Emergency contact"
        placeholderTextColor={styles.searchPlaceholder.color}
        style={styles.searchInput}
        value={patientProfile.emergencyContact}
        onChangeText={onEmergencyContactChange}
      />

      <Text style={styles.cardTitle}>Allergies</Text>
      <TextInput
        accessibilityLabel="Allergies input"
        accessibilityRole="text"
        placeholder="Allergies"
        placeholderTextColor={styles.searchPlaceholder.color}
        style={styles.searchInput}
        value={patientProfile.allergies}
        onChangeText={onAllergiesChange}
      />
    </>
  );
}
