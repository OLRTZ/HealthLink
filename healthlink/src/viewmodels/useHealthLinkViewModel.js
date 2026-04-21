import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  departments,
  genderOptions,
  hospitals,
  maritalStatusOptions,
  patientProfile,
  reasons,
  slots,
} from '../models/appointmentModel';
import { api } from '../services/api';
import { sendAppointmentConfirmedNotification } from '../services/notifications';

const SETTINGS_KEY = 'healthlink_settings';

export function useHealthLinkViewModel() {
  const [screen, setScreen] = useState('login');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hospital, setHospital] = useState('');
  const [department, setDepartment] = useState('');
  const [slot, setSlot] = useState('');
  const [reason, setReason] = useState('');
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [message, setMessage] = useState('');
  const [staffFilter, setStaffFilter] = useState('Waiting');
  const [staffSearch, setStaffSearch] = useState('');
  const [profile, setProfile] = useState(patientProfile);
  const [appointments, setAppointments] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      saveSettings();
    }
  }, [largeText, highContrast, dataLoaded]);

  const loadInitialData = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);

      if (savedSettings !== null) {
        const settings = JSON.parse(savedSettings);
        setLargeText(settings.largeText);
        setHighContrast(settings.highContrast);
      }

      await loadRemoteData();
    } catch (error) {
      setMessage('Saved settings could not be loaded.');
    } finally {
      setDataLoaded(true);
    }
  };

  const loadRemoteData = async () => {
    try {
      const [loadedProfile, loadedAppointments] = await Promise.all([
        api.getProfile(),
        api.getAppointments(),
      ]);

      setProfile(loadedProfile);
      setAppointments(loadedAppointments);
    } catch (error) {
      setMessage('API data could not be loaded.');
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        largeText,
        highContrast,
      };

      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      setMessage('Settings could not be saved.');
    }
  };

  const addAppointment = async () => {
    if (hospital === '' || department === '' || slot === '' || reason === '') {
      setMessage('Please select a hospital, department, time, and reason.');
      return;
    }

    try {
      const [date, time] = slot.split(', ');
      const appointment = await api.createAppointment({
        hospital,
        department,
        date,
        time,
        reason,
      });

      setAppointments([appointment, ...appointments]);
      setMessage('Appointment request sent. Waiting for hospital confirmation.');
      setScreen('appointments');
    } catch (error) {
      setMessage('Appointment could not be created.');
    }
  };

  const login = async () => {
    try {
      const result = await api.login(email, password);
      setRole(result.role);
      setMessage('');
      setScreen(result.role === 'staff' ? 'staff' : 'home');
      await loadRemoteData();
    } catch (error) {
      setMessage('Invalid login details.');
    }
  };

  const logout = () => {
    setRole('');
    setEmail('');
    setPassword('');
    setMessage('');
    setScreen('login');
  };

  const updateAppointmentStatus = async (
    id,
    status,
    staffNote,
    successMessage,
    errorMessage,
  ) => {
    try {
      const updatedAppointment = await api.updateAppointmentStatus(id, status, staffNote);
      setAppointments(
        appointments.map((item) => (item.id === id ? updatedAppointment : item)),
      );

      if (status === 'Confirmed') {
        await sendAppointmentConfirmedNotification(updatedAppointment);
      }

      setMessage(successMessage);
    } catch (error) {
      setMessage(errorMessage);
    }
  };

  const confirmAppointment = (id, staffNote = '') => {
    updateAppointmentStatus(
      id,
      'Confirmed',
      staffNote,
      'Appointment confirmed by hospital staff.',
      'Appointment could not be confirmed.',
    );
  };

  const rejectAppointment = (id, staffNote = '') => {
    updateAppointmentStatus(
      id,
      'Rejected by hospital',
      staffNote,
      'Appointment rejected by hospital staff.',
      'Appointment could not be rejected.',
    );
  };

  const requestReschedule = async (id, rescheduleRequest) => {
    if (rescheduleRequest === '') {
      setMessage('Please choose a new appointment time.');
      return;
    }

    try {
      const updatedAppointment = await api.requestAppointmentReschedule(
        id,
        rescheduleRequest,
      );
      setAppointments(
        appointments.map((item) => (item.id === id ? updatedAppointment : item)),
      );
      setMessage('Reschedule request sent to hospital staff.');
    } catch (error) {
      setMessage('Reschedule request could not be sent.');
    }
  };

  const cancelAppointment = (id) => {
    Alert.alert('Cancel appointment', 'Are you sure you want to cancel this appointment?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteAppointment(id);
            setAppointments(appointments.filter((item) => item.id !== id));
            setMessage('Appointment cancelled.');
          } catch (error) {
            setMessage('Appointment could not be cancelled.');
          }
        },
      },
    ]);
  };

  const updateProfileField = async (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    });

    try {
      const updatedProfile = await api.updateProfile({
        phone: field === 'phone' ? value : profile.phone,
        gender: field === 'gender' ? value : profile.gender,
        maritalStatus: field === 'maritalStatus' ? value : profile.maritalStatus,
        allergies: field === 'allergies' ? value : profile.allergies,
        emergencyContact:
          field === 'emergencyContact' ? value : profile.emergencyContact,
      });
      setProfile(updatedProfile);
      setAppointments(
        appointments.map((item) => ({
          ...item,
          phone: updatedProfile.phone,
          patientName: updatedProfile.fullName,
          nhsNumber: updatedProfile.nhsNumber,
        })),
      );
    } catch (error) {
      setMessage('Profile could not be updated.');
    }
  };

  return {
    appointments,
    cancelAppointment,
    confirmAppointment,
    rejectAppointment,
    addAppointment,
    department,
    departments,
    email,
    genderOptions,
    highContrast,
    hospital,
    hospitals,
    largeText,
    login,
    logout,
    message,
    maritalStatusOptions,
    patientProfile: profile,
    reason,
    reasons,
    requestReschedule,
    role,
    screen,
    setDepartment,
    setEmail,
    setHighContrast,
    setHospital,
    setLargeText,
    setPassword,
    setReason,
    setScreen,
    setStaffFilter,
    setStaffSearch,
    setSlot,
    slot,
    slots,
    staffFilter,
    staffSearch,
    updateAllergies: (value) => updateProfileField('allergies', value),
    updateEmergencyContact: (value) => updateProfileField('emergencyContact', value),
    updateGender: (value) => updateProfileField('gender', value),
    updateMaritalStatus: (value) => updateProfileField('maritalStatus', value),
    updatePhone: (value) => updateProfileField('phone', value),
  };
}
