import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import { BottomSheet } from '../../../components';
import { Text, TouchableOpacity, View } from '../../../widgets';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray5,
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    borderRadius: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  contentContainer: {
    padding: scale(14),
  },
  option: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(14),
    borderRadius: scale(4),
    backgroundColor: Colors.gray10,
    marginRight: scale(14),
    marginTop: scale(14),
    borderWidth: 1,
    borderColor: Colors.gray10,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
});

const Option = ({
  label,
  value,
  onPress,
}) => {
  const isSelected = label === value;
  return (

    <TouchableOpacity style={StyleSheet.flatten([
      styles.option,
      isSelected && styles.selected,
    ])} onPress={() => onPress(label)}>
      <Text color={isSelected ? 'primary' : 'gray100'}>{label}</Text>
    </TouchableOpacity>
  );
};

const WishMenu = ({
  options,
  onChange,
  renderTouchable,
  header,
  footer, render,
  params
}) => {
  const sheetRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [index, setIndex] = useState(0);
  const data = {
    onPress: () => sheetRef.current.open(),
    value: selectedValue,
    setSelectedValue,
    index
  }
  params && params(data);
  return (
    <>
      {renderTouchable && renderTouchable(data)}
      <BottomSheet sheetRef={sheetRef} onPress={() => onChange(selectedValue, index)}
                   buttonText="Confirm">
        {header && header()}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/*<View style={styles.content}>*/}
            {
              render ? render(data) :
                options.map((option, i) => (
                  <Option
                    key={option}
                    label={option}
                    value={selectedValue}
                    onPress={(v) => {
                      setSelectedValue(v);
                      setIndex(i);
                    }}
                  />
                ))}
          {/*</View>*/}
        </ScrollView>
        {footer && footer(data)}
      </BottomSheet>
    </>
  );
};

export default WishMenu;
