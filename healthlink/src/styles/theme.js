export function createTheme(largeText, highContrast) {
  return {
    largeText,
    highContrast,
    fontSize: largeText ? 18 : 15,
    background: highContrast ? '#000000' : '#F4F8F7',
    card: highContrast ? '#111111' : '#FFFFFF',
    text: highContrast ? '#FFFFFF' : '#1F2937',
    muted: highContrast ? '#FFFFFF' : '#4B5563',
    primary: highContrast ? '#FFFFFF' : '#0F766E',
    buttonText: highContrast ? '#000000' : '#FFFFFF',
    border: highContrast ? '#FFFFFF' : '#D1D5DB',
    successBackground: highContrast ? '#111111' : '#DDF7F1',
    danger: '#DC2626',
  };
}
