import React from 'react';
import { TextInput, Text, View } from 'react-native';

const Input = ({ secureTextEntry, label, value, onChangeText, placeholder, autoCorrect }) => {
  const { labelStyle, inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>
        {label}
      </Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },

  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },

  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
