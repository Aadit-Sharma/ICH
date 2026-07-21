import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
 
import Routes from '../navigation/Routes';
import styles from './LoginStyles';

const DEMO_EMPLOYEE_ID = '574839';
const DEMO_PASSWORD = 'Ntpc@123';

export default function Login({navigation}) {
  const buttonScale = useRef(new Animated.Value(1)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
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

    let shouldResetLoading = true;

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (employeeId === DEMO_EMPLOYEE_ID && password === DEMO_PASSWORD) {
        shouldResetLoading = false;
        await AsyncStorage.setItem('isLoggedIn', 'true');
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }).start(({finished}) => {
          if (finished) {
            navigation.replace(Routes.HOME);
          }
        });
        return;
      }

      Alert.alert('Invalid Employee ID or Password');
    } catch (error) {
      Alert.alert('Login failed', 'Please try again.');
    } finally {
      if (shouldResetLoading) {
        setIsLoading(false);
      }
    }
  };

  const animateButton = toValue => {
    Animated.spring(buttonScale, {
      toValue,
      friction: 6,
      tension: 180,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, {opacity: screenOpacity}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
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
                <Image
                  source={
                    isPasswordVisible
                      ? require('../assets/icons/eye open.png')
                      : require('../assets/icons/eye closed.png')
                  }
                  style={styles.passwordToggleIcon}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <Animated.View style={{transform: [{scale: buttonScale}]}}>
            <Pressable
              onPress={handleLogin}
              onPressIn={() => animateButton(0.96)}
              onPressOut={() => animateButton(1)}
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
          </Animated.View>
        </View>
      </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}
