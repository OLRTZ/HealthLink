export const hospitals = [
  'Kingston Hospital',
  'Frimley Park Hospital',
  'Royal Surrey County Hospital',
  'St Thomas Hospital',
  'Croydon University Hospital',
];

export const departments = [
  'General Medicine',
  'Cardiology',
  'Physiotherapy',
  'Dermatology',
  'Neurology',
  'Orthopaedics',
  'Paediatrics',
  'ENT',
];

export const slots = ['Tue 23 Apr, 09:30', 'Wed 24 Apr, 14:00', 'Fri 26 Apr, 11:15'];

export const reasons = ['Check-up', 'Follow-up', 'New symptoms', 'Test results'];

export const genderOptions = ['Male', 'Female'];

export const maritalStatusOptions = ['Single', 'Married'];

export const patientProfile = {
  fullName: 'Chris Olarte',
  nhsNumber: '485 777 3456',
  dateOfBirth: '12 Jan 2003',
  gender: 'Male',
  maritalStatus: 'Single',
  allergies: 'Peanuts',
  emergencyContact: 'Alex Olarte - 07999 123456',
  phone: '07123 456789',
};

export const startingAppointments = [
  {
    id: 1,
    hospital: 'Kingston Hospital',
    patientName: patientProfile.fullName,
    nhsNumber: patientProfile.nhsNumber,
    department: 'General Medicine',
    date: 'Mon 22 Apr',
    time: '10:30',
    reason: 'Check-up',
    status: 'Confirmed',
  },
  {
    id: 2,
    hospital: 'Frimley Park Hospital',
    patientName: patientProfile.fullName,
    nhsNumber: patientProfile.nhsNumber,
    department: 'Cardiology',
    date: 'Thu 25 Apr',
    time: '15:00',
    reason: 'Follow-up',
    status: 'Waiting for hospital',
  },
];
