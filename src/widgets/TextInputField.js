import React, { useState } from 'react';
import { Picker, StyleSheet, TextInput } from 'react-native';
import { Qiew as View } from './view';
import { Qext as Text } from './text';
import DatePicker from 'react-native-datepicker';
import { Ionicons } from 'react-native-vector-icons';
import SearchableDropdown from './DropDownSearch';
import { DANGER } from '../utils/Colors';
import { isIOS } from '../utils';
import colors from '../themes/colors';

const TextInputField = ({
  errorText,
  label,
  data,
  disabled,
  value,
  multiline,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  borderError,
  style,
  type,
  indexName,
  initialValue,
  onChange,
  onBlur,
  mb,
  ...props
}) => {
  function renderView() {
    if (type === 'search') {
      return (
        <SearchableDropdown
          onTextChange={(text) => {
            onChange && onChange(text);
          }}
          onItemSelect={(item) => onChangeText(item[indexName || 'name'], item)}
          indexName={indexName}
          textInputStyle={{
            color: colors.gray75,
            padding: 12,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: errorText ? DANGER : colors.gray10,
            backgroundColor: 'white',
          }}
          textInputProps={{
            disabled: disabled,
            enabled: !disabled,
            editable: !disabled,
            defaultValue: initialValue
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: 'white',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          items={data}
          defaultIndex={0}
          placeholder={placeholder || 'Enter location'}
          underlineColorAndroid="transparent"
        />
      );
    }

    if (type === 'select' && data) {
      return (
        <View relative r={5} color={'#dadada'} bw={1} bc={'#E8F0F2'}>
          <Picker
            selectedValue={value}
            itemStyle={{
              position: 'relative',
              border: 'none',
              borderStyle: 'none',
              height: 45,
              width: '100%',
              fontSize: 13,
              backgroundColor: 'transparent',
              textAlign: 'center',
              zIndex: 33,
            }}
            mode={'dropdown'}
            onValueChange={(itemValue, itemIndex) => onChangeText(itemValue, itemIndex)}
            style={[styles.inputStyle, { width: '98%' }, borderError ? styles.borderErrorStyle : '', style]}
          >
            {data.map(({ name }) => <Picker.Item label={name} color={'#323232'} value={name}/>)}
          </Picker>
          {
            isIOS ?
              <View style={{
                position: 'absolute',
                zIndex: 2,
                right: 10,
                top: '10%'
              }}>
                <Ionicons name="chevron-up" style={{
                  padding: 0,
                  margin: 0
                }} color={'#323232'}
                          size={17}/>
                <Ionicons name="chevron-down" style={{
                  padding: 0,
                  margin: 0
                }} color={'#323232'}
                          size={17}/>
              </View>
              :
              <Ionicons
                name="chevron-down" style={{
                position: 'absolute',
                zIndex: 2,
                right: 10,
                top: '25%'
              }}
                size={20}/>
          }

        </View>
      );
    }

    if (type === 'date') {

      const [date, setDate] = useState(new Date(1990, 0, 1));
      return (
        <DatePicker
          style={{ width: '100%' }}
          date={date} mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1950-01-01"
          maxDate="2005-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
            dateInput: [styles.inputStyle, {
              alignItems: 'flex-start',
              justifyContent: 'center'
            }, borderError ? styles.borderErrorStyle : '', style],
            dateText: { textAlign: 'left' }
          }}
          onDateChange={(date) => {
            setDate(date);
            onChangeText(date);
          }}
        />);
    }
    return (
      <TextInput
        keyboardType={type || keyboardType || 'default'}
        value={value}
        autoCapitalize="words"
        disabled={disabled}
        enabled={!disabled}
        editable={!disabled}
        multiline={multiline}
        placeholder={placeholder}
        autoCorrect={true}
        placeholderTextColor={'rgba(0,0,0,0.25)'}
        onChangeText={onChangeText}
        style={[styles.inputStyle, borderError ? styles.borderErrorStyle : '', style]}
        {...props}
        maxFontSizeMultiplier={0}
        secureTextEntry={secureTextEntry}
      />
    );
  }

  return (
    <View mt={0} p={0} mb={mb}>
      {label &&
      <Text style={{ zIndex: 44 }} fs={10} ml={10} center w={'15%'} bg={'white'} gray={disabled}
            mb={-5}>{label}</Text>}
      {renderView()}
      {errorText ? <Text danger fs={10} mt={3} pb={4} mb={4}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#323232',
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 14,
    lineHeight: 19,
    borderRadius: 5,
    height: 45,
    // fontFamily: 'Medium',
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E8F0F2'
  },
  borderErrorStyle: {
    borderWidth: 2,
    borderColor: 'red'
  }
});
TextInputField.defaultProps = { mb: 40 };

export default TextInputField;
