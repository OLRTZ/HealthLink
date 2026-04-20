import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function setupNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('appointments', {
      name: 'Appointment Updates',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }

  const existingPermissions = await Notifications.getPermissionsAsync();
  let finalStatus = existingPermissions.status;

  if (finalStatus !== 'granted') {
    const requestedPermissions = await Notifications.requestPermissionsAsync();
    finalStatus = requestedPermissions.status;
  }

  return finalStatus === 'granted';
}

export async function sendAppointmentConfirmedNotification(appointment) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Appointment Confirmed',
      body: `${appointment.department} at ${appointment.hospital} on ${appointment.date} at ${appointment.time}`,
      sound: 'default',
    },
    trigger: null,
  });
}
