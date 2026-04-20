import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text } from 'react-native';
import { makeStyles } from './src/styles/appStyles';
import { setupNotificationsAsync } from './src/services/notifications';
import AppointmentsScreen from './src/views/AppointmentsScreen';
import BookScreen from './src/views/BookScreen';
import HomeScreen from './src/views/HomeScreen';
import LoginScreen from './src/views/LoginScreen';
import ProfileScreen from './src/views/ProfileScreen';
import SettingsScreen from './src/views/SettingsScreen';
import StaffDashboardScreen from './src/views/StaffDashboardScreen';
import { useHealthLinkViewModel } from './src/viewmodels/useHealthLinkViewModel';

export default function App() {
  const viewModel = useHealthLinkViewModel();
  const styles = makeStyles(viewModel.largeText, viewModel.highContrast);

  useEffect(() => {
    setupNotificationsAsync();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style={viewModel.highContrast ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>HealthLink UK</Text>
        <Text style={styles.title}>{getScreenTitle(viewModel.screen)}</Text>

        {viewModel.screen !== 'home' &&
          viewModel.screen !== 'login' &&
          viewModel.screen !== 'staff' && (
          <Pressable
            accessibilityLabel="Back button"
            accessibilityRole="button"
            style={styles.backButton}
            onPress={() => viewModel.setScreen('home')}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        )}

        {viewModel.screen !== 'login' && (
          <Pressable
            accessibilityLabel="Logout button"
            accessibilityRole="button"
            style={styles.logoutButton}
            onPress={viewModel.logout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        )}

        {viewModel.screen === 'login' && (
          <LoginScreen
            email={viewModel.email}
            message={viewModel.message}
            password={viewModel.password}
            styles={styles}
            onEmailChange={viewModel.setEmail}
            onLogin={viewModel.login}
            onPasswordChange={viewModel.setPassword}
          />
        )}

        {viewModel.screen === 'home' && (
          <HomeScreen
            appointmentCount={viewModel.appointments.length}
            styles={styles}
            onGoToAppointments={() => viewModel.setScreen('appointments')}
            onGoToBook={() => viewModel.setScreen('book')}
            onGoToProfile={() => viewModel.setScreen('profile')}
            onGoToSettings={() => viewModel.setScreen('settings')}
          />
        )}

        {viewModel.screen === 'book' && (
          <BookScreen
            department={viewModel.department}
            hospital={viewModel.hospital}
            message={viewModel.message}
            reason={viewModel.reason}
            slot={viewModel.slot}
            styles={styles}
            onBook={viewModel.addAppointment}
            onDepartmentChange={viewModel.setDepartment}
            onHospitalChange={viewModel.setHospital}
            onReasonChange={viewModel.setReason}
            onSlotChange={viewModel.setSlot}
          />
        )}

        {viewModel.screen === 'appointments' && (
          <AppointmentsScreen
            appointments={viewModel.appointments}
            message={viewModel.message}
            styles={styles}
            onCancel={viewModel.cancelAppointment}
          />
        )}

        {viewModel.screen === 'settings' && (
          <SettingsScreen
            highContrast={viewModel.highContrast}
            largeText={viewModel.largeText}
            styles={styles}
            onHighContrastChange={viewModel.setHighContrast}
            onLargeTextChange={viewModel.setLargeText}
          />
        )}

        {viewModel.screen === 'profile' && (
          <ProfileScreen
            genderOptions={viewModel.genderOptions}
            maritalStatusOptions={viewModel.maritalStatusOptions}
            onEmergencyContactChange={viewModel.updateEmergencyContact}
            onAllergiesChange={viewModel.updateAllergies}
            onGenderChange={viewModel.updateGender}
            onMaritalStatusChange={viewModel.updateMaritalStatus}
            patientProfile={viewModel.patientProfile}
            styles={styles}
            onPhoneChange={viewModel.updatePhone}
          />
        )}

        {viewModel.screen === 'staff' && (
          <StaffDashboardScreen
            appointments={viewModel.appointments}
            filter={viewModel.staffFilter}
            message={viewModel.message}
            search={viewModel.staffSearch}
            styles={styles}
            onConfirm={viewModel.confirmAppointment}
            onFilterChange={viewModel.setStaffFilter}
            onReject={viewModel.rejectAppointment}
            onSearchChange={viewModel.setStaffSearch}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function getScreenTitle(screen) {
  if (screen === 'login') {
    return 'Login';
  }

  if (screen === 'book') {
    return 'Book Appointment';
  }

  if (screen === 'appointments') {
    return 'My Appointments';
  }

  if (screen === 'settings') {
    return 'Settings';
  }

  if (screen === 'profile') {
    return 'Patient Profile';
  }

  if (screen === 'staff') {
    return 'Staff Dashboard';
  }

  return 'Home';
}
