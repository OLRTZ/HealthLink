export function createLayoutStyles(theme) {
  return {
    page: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 20,
      paddingBottom: 40,
    },
    logo: {
      color: theme.primary,
      fontSize: theme.fontSize,
      fontWeight: '700',
      marginBottom: 4,
    },
    title: {
      color: theme.text,
      fontSize: theme.largeText ? 32 : 28,
      fontWeight: '800',
      marginBottom: 16,
    },
    text: {
      color: theme.muted,
      fontSize: theme.fontSize,
      lineHeight: theme.largeText ? 26 : 22,
      marginTop: 4,
    },
    card: {
      backgroundColor: theme.card,
      borderColor: theme.border,
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 12,
      padding: 16,
    },
    cardTitle: {
      color: theme.text,
      fontSize: theme.largeText ? 21 : 18,
      fontWeight: '800',
      marginBottom: 6,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 10,
    },
    section: {
      marginTop: 16,
    },
    filterRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12,
    },
    messageBox: {
      backgroundColor: theme.successBackground,
      borderColor: theme.primary,
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 12,
      padding: 14,
    },
    messageText: {
      color: theme.text,
      fontSize: theme.fontSize,
      fontWeight: '700',
      lineHeight: theme.largeText ? 26 : 22,
    },
  };
}
