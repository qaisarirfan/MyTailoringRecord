import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Select } from 'native-base';

const Measurements = () => {
  const [gender, setGender] = useState('Women');
  const [measurements, setMeasurements] = useState({
    shoulderWidth: '',
    chestBust: '',
    waist: '',
    hip: '',
    kameezLength: '',
    sleeveLength: '',
    armhole: '',
    upperArm: '',
    neckDepthFront: '',
    neckDepthBack: '',
    bustPoint: '',
    slitLength: '',
    salwarWaist: '',
    salwarHip: '',
    salwarLength: '',
    thigh: '',
    knee: '',
    ankle: '',
    inseam: '',
    dupattaLength: '',
    dupattaWidth: '',
  });

  const handleInputChange = (key: keyof typeof measurements, value: string) => {
    setMeasurements({ ...measurements, [key]: value });
  };

  const handleSave = () => {
    // Placeholder for saving data (e.g., to local storage or API)
    console.log('Measurements saved:', { gender, ...measurements });
  };

  const renderInput = (
    label: string,
    key: keyof typeof measurements,
    placeholder: string,
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label} (inches):</Text>
      <TextInput
        style={styles.input}
        value={measurements[key]}
        onChangeText={value => handleInputChange(key, value)}
        placeholder={placeholder}
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Salwar Kameez Measurement Form</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Gender</Text>
        <Select
          selectedValue={gender}
          style={styles.picker}
          onValueChange={itemValue => setGender(itemValue)}
        >
          <Select.Item label="Women" value="Women" />
          <Select.Item label="Men" value="Men" />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {gender === 'Women' ? 'Kameez Measurements' : 'Kurta Measurements'}
        </Text>
        {renderInput('Shoulder Width', 'shoulderWidth', 'e.g., 14')}
        {renderInput(
          gender === 'Women' ? 'Bust' : 'Chest',
          'chestBust',
          'e.g., 36',
        )}
        {renderInput('Waist', 'waist', 'e.g., 30')}
        {renderInput('Hip', 'hip', 'e.g., 38')}
        {renderInput(
          gender === 'Women' ? 'Kameez Length' : 'Kurta Length',
          'kameezLength',
          'e.g., 40',
        )}
        {renderInput('Sleeve Length', 'sleeveLength', 'e.g., 16')}
        {renderInput('Armhole', 'armhole', 'e.g., 16')}
        {renderInput('Upper Arm Circumference', 'upperArm', 'e.g., 12')}
        {renderInput('Neck Depth (Front)', 'neckDepthFront', 'e.g., 6')}
        {renderInput('Neck Depth (Back)', 'neckDepthBack', 'e.g., 4')}
        {gender === 'Women' &&
          renderInput('Bust Point', 'bustPoint', 'e.g., 10')}
        {renderInput('Slit Length', 'slitLength', 'e.g., 12')}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {gender === 'Women'
            ? 'Salwar Measurements'
            : 'Salwar/Churidar Measurements'}
        </Text>
        {renderInput('Waist', 'salwarWaist', 'e.g., 30')}
        {renderInput('Hip', 'salwarHip', 'e.g., 38')}
        {renderInput('Length', 'salwarLength', 'e.g., 38')}
        {renderInput('Thigh Circumference', 'thigh', 'e.g., 22')}
        {renderInput('Knee Circumference', 'knee', 'e.g., 14')}
        {renderInput('Ankle Circumference', 'ankle', 'e.g., 10')}
        {renderInput('Inseam', 'inseam', 'e.g., 30')}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dupatta Measurements (Optional)</Text>
        {renderInput('Dupatta Length', 'dupattaLength', 'e.g., 90')}
        {renderInput('Dupatta Width', 'dupattaWidth', 'e.g., 40')}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Save Measurements"
          onPress={handleSave}
          color="#4CAF50"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default Measurements;
