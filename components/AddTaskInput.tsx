import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import type { AppColors } from '../utils/theme';

type Props = {
  onAdd: (text: string) => void;
  colors: AppColors;
};

export function AddTaskInput({ onAdd, colors }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <TextInput
      style={[
        styles.input,
        { color: colors.text, backgroundColor: colors.inputBg },
      ]}
      value={text}
      onChangeText={setText}
      onSubmitEditing={handleSubmit}
      placeholder="今日やること"
      placeholderTextColor={colors.textMuted}
      returnKeyType="done"
      blurOnSubmit={false}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 32,
  },
});
