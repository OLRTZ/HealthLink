const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://healthlink-ax46.onrender.com/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
}

export const api = {
  login(username, password) {
    return request('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
  getProfile() {
    return request('/profile');
  },
  updateProfile(profile) {
    return request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  },
  getAppointments() {
    return request('/appointments');
  },
  createAppointment(appointment) {
    return request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  },
  updateAppointmentStatus(id, status) {
    return request(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
  deleteAppointment(id) {
    return request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};
