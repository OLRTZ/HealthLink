import { Pressable, Text, View } from 'react-native';

export default function OptionList({ label, options, selected, onSelect, styles }) {
  return (
    <View style={styles.section}>
      <Text style={styles.cardTitle}>{label}</Text>
      {options.map((option) => (
        <Pressable
          accessibilityLabel={`${label} option ${option}`}
          accessibilityRole="button"
          key={option}
          style={option === selected ? styles.selectedOption : styles.option}
          onPress={() => onSelect(option)}
        >
          <Text style={option === selected ? styles.selectedOptionText : styles.optionText}>
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
