import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Routes from '../navigation/Routes';
import styles from './LoginStyles';

const DEMO_EMPLOYEE_ID = '574839';
const DEMO_PASSWORD = 'Ntpc@123';

export default function Login({navigation}) {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleEmployeeIdChange = value => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setEmployeeId(numericValue);

    if (errors.employeeId) {
      setErrors(currentErrors => ({...currentErrors, employeeId: undefined}));
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);

    if (errors.password) {
      setErrors(currentErrors => ({...currentErrors, password: undefined}));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!employeeId) {
      validationErrors.employeeId = 'Employee ID is required';
    } else if (employeeId.length !== 6) {
      validationErrors.employeeId = 'Employee ID must be exactly 6 digits';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (employeeId === DEMO_EMPLOYEE_ID && password === DEMO_PASSWORD) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.replace(Routes.HOME);
        return;
      }

      Alert.alert('Invalid Employee ID or Password');
    } catch (error) {
      Alert.alert('Login failed', 'Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>NTPC</Text>
          </View>
          <Text style={styles.title}>Indian Coffee House</Text>
          <Text style={styles.subtitle}>Employee Food Ordering</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Employee ID</Text>
            <TextInput
              value={employeeId}
              onChangeText={handleEmployeeIdChange}
              placeholder="Employee ID"
              placeholderTextColor="#8A98A8"
              keyboardType="number-pad"
              maxLength={6}
              style={[
                styles.input,
                errors.employeeId ? styles.inputError : null,
              ]}
              editable={!isLoading}
            />
            {errors.employeeId ? (
              <Text style={styles.errorText}>{errors.employeeId}</Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.passwordInputContainer,
                errors.password ? styles.inputError : null,
              ]}>
              <TextInput
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Password"
                placeholderTextColor="#8A98A8"
                secureTextEntry={!isPasswordVisible}
                style={styles.passwordInput}
                editable={!isLoading}
              />
              <Pressable
                onPress={() => setIsPasswordVisible(isVisible => !isVisible)}
                style={styles.iconButton}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }>
                <Icon
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color="#52606D"
                />
              </Pressable>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            style={({pressed}) => [
              styles.loginButton,
              pressed || isLoading ? styles.loginButtonPressed : null,
            ]}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>LOGIN</Text>
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
