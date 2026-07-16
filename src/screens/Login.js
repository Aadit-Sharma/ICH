/*
-----------------------------------------
File: Login.js

Purpose:
Shows the employee login form and handles demo authentication.

Concepts Used:
- React component
- Hooks: useRef, useState
- React Native UI components
- Animated API
- AsyncStorage
- Form validation
- React Navigation

Flow:
Splash -> Login -> Home
-----------------------------------------
*/

// AsyncStorage
// AsyncStorage stores small persistent values on the device.
// We use it to save "isLoggedIn" after successful login.
import AsyncStorage from '@react-native-async-storage/async-storage';

// React + Hooks
// useRef stores animation values without re-rendering.
// useState stores form values and UI state that must re-render.
import React, {useRef, useState} from 'react';

// React Native imports
// These are built-in UI components and APIs from the react-native package.
import {
  // ActivityIndicator shows a loading spinner.
  ActivityIndicator,
  // Alert opens a native popup message.
  Alert,
  // Animated creates animation values and animation functions.
  Animated,
  // Image displays PNG assets.
  Image,
  // KeyboardAvoidingView moves content when the keyboard appears.
  KeyboardAvoidingView,
  // Platform detects Android or iOS.
  Platform,
  // Pressable handles button/touch interactions.
  Pressable,
  // Text displays text.
  Text,
  // TextInput receives typed input.
  TextInput,
  // View is a layout container.
  View,
} from 'react-native';

// Navigation constants
// Routes.HOME is used after successful login.
import Routes from '../navigation/Routes';

// StyleSheet object for this screen.
import styles from './LoginStyles';

// JavaScript constant
// Demo employee ID used for local fake authentication.
const DEMO_EMPLOYEE_ID = '574839';

// JavaScript constant
// Demo password used for local fake authentication.
const DEMO_PASSWORD = 'Ntpc@123';

// React component
// navigation is provided by React Navigation.
// This component returns the full Login screen UI.
export default function Login({navigation}) {
  // React Hook + Animated API
  // buttonScale controls the press scale animation of the LOGIN button.
  // useRef is chosen because animation values should persist without re-rendering.
  const buttonScale = useRef(new Animated.Value(1)).current;

  // React Hook + Animated API
  // screenOpacity controls fade-out animation before navigating to Home.
  const screenOpacity = useRef(new Animated.Value(1)).current;

  // React State
  // employeeId stores what the user types in the Employee ID field.
  const [employeeId, setEmployeeId] = useState('');

  // React State
  // password stores what the user types in the Password field.
  const [password, setPassword] = useState('');

  // React State
  // isPasswordVisible decides whether password text is hidden or shown.
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // React State + JavaScript object
  // errors stores validation messages for form fields.
  const [errors, setErrors] = useState({});

  // React State
  // isLoading controls the spinner and disables inputs while login is running.
  const [isLoading, setIsLoading] = useState(false);

  // Function
  // Purpose: keep Employee ID numeric and max 6 digits.
  // Parameter: value is the latest text from TextInput.
  // Return value: none; it updates state.
  // Called when the Employee ID TextInput changes.
  const handleEmployeeIdChange = value => {
    // JavaScript string methods + regex
    // replace(/\D/g, '') removes all non-digit characters.
    // slice(0, 6) keeps only the first 6 digits.
    const numericValue = value.replace(/\D/g, '').slice(0, 6);

    // React State setter
    // Updates employeeId and re-renders the input.
    setEmployeeId(numericValue);

    // JavaScript if statement
    // If there is an Employee ID error, clear it after user starts typing.
    if (errors.employeeId) {
      // React State setter + spread operator
      // ...currentErrors copies existing errors.
      // employeeId: undefined clears only this field error.
      setErrors(currentErrors => ({...currentErrors, employeeId: undefined}));
    }
  };

  // Function
  // Purpose: update password state and clear password errors.
  // Parameter: value is the latest password text.
  // Return value: none.
  // Called when the Password TextInput changes.
  const handlePasswordChange = value => {
    // React State setter
    // Stores the password text.
    setPassword(value);

    // JavaScript if statement
    // Clears password error when user edits the password.
    if (errors.password) {
      setErrors(currentErrors => ({...currentErrors, password: undefined}));
    }
  };

  // Function
  // Purpose: validate form fields before login.
  // Parameters: none.
  // Return value: boolean; true means valid, false means invalid.
  // Called by handleLogin.
  const validateForm = () => {
    // JavaScript object
    // validationErrors temporarily collects field error messages.
    const validationErrors = {};

    // JavaScript condition
    // Checks if employeeId is empty.
    if (!employeeId) {
      validationErrors.employeeId = 'Employee ID is required';
    // JavaScript condition
    // Checks exact 6 digit length.
    } else if (employeeId.length !== 6) {
      validationErrors.employeeId = 'Employee ID must be exactly 6 digits';
    }

    // JavaScript condition
    // Checks if password is empty.
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    // React State setter
    // Stores validation errors so messages appear on screen.
    setErrors(validationErrors);

    // JavaScript Object.keys
    // Object.keys returns an array of error field names.
    // length === 0 means no errors.
    return Object.keys(validationErrors).length === 0;
  };

  // Async Function
  // Purpose: validate credentials, simulate login, store session, navigate to Home.
  // Parameters: none.
  // Return value: Promise because async functions always return a Promise.
  // Called when LOGIN button is pressed.
  const handleLogin = async () => {
    // Guard clause
    // Stops the login process if validation fails.
    if (!validateForm()) {
      return;
    }

    // JavaScript let
    // let allows this value to change later inside try/finally.
    let shouldResetLoading = true;

    // JavaScript try/catch/finally
    // Used to handle async login safely.
    try {
      // React State setter
      // Shows loading spinner and disables fields.
      setIsLoading(true);

      // Promise + await
      // Simulates a 1 second network request.
      await new Promise(resolve => setTimeout(resolve, 1000));

      // JavaScript condition
      // Checks demo credentials.
      if (employeeId === DEMO_EMPLOYEE_ID && password === DEMO_PASSWORD) {
        // JavaScript assignment
        // Prevents loading reset because screen is about to navigate away.
        shouldResetLoading = false;

        // AsyncStorage API
        // Stores login state as a string on the device.
        await AsyncStorage.setItem('isLoggedIn', 'true');

        // Animated API
        // Fades Login screen out before navigation.
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        // Callback
        // Runs after fade animation finishes.
        }).start(({finished}) => {
          // If animation completed, replace Login with Home.
          if (finished) {
            // React Navigation
            // replace removes Login from stack and opens Home.
            navigation.replace(Routes.HOME);
          }
        });
        return;
      }

      // React Native Alert
      // Shows native error popup when credentials are wrong.
      Alert.alert('Invalid Employee ID or Password');
    } catch (error) {
      // Error handling
      // Shows fallback message if storage or login logic fails.
      Alert.alert('Login failed', 'Please try again.');
    } finally {
      // finally always runs after try/catch.
      // Resets loading only if we are staying on Login.
      if (shouldResetLoading) {
        setIsLoading(false);
      }
    }
  };

  // Function
  // Purpose: animate login button scale.
  // Parameter: toValue is the target scale number.
  // Return value: none.
  // Called on button press in/out.
  const animateButton = toValue => {
    // Animated spring
    // Makes the button shrink/grow with a natural spring movement.
    Animated.spring(buttonScale, {
      toValue,
      friction: 6,
      tension: 180,
      useNativeDriver: true,
    }).start();
  };

  return (
    // Animated.View
    // Root screen container with fade-out opacity.
    <Animated.View style={[styles.container, {opacity: screenOpacity}]}>
      {/* KeyboardAvoidingView
          React Native component that helps prevent keyboard overlap. */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
      {/* View
          White login card container. */}
      <View style={styles.card}>
        <View style={styles.header}>
          {/* View
              Circular NTPC logo placeholder. */}
          <View style={styles.logo}>
            <Text style={styles.logoText}>NTPC</Text>
          </View>
          <Text style={styles.title}>Indian Coffee House</Text>
          <Text style={styles.subtitle}>Employee Food Ordering</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            {/* Text label for Employee ID input. */}
            <Text style={styles.label}>Employee ID</Text>
            {/* TextInput
                Receives numeric employee ID from user. */}
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
            {/* View
                Groups password input and visibility icon. */}
            <View
              style={[
                styles.passwordInputContainer,
                errors.password ? styles.inputError : null,
              ]}>
              {/* TextInput
                  secureTextEntry hides password unless toggled. */}
              <TextInput
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Password"
                placeholderTextColor="#8A98A8"
                secureTextEntry={!isPasswordVisible}
                style={styles.passwordInput}
                editable={!isLoading}
              />
              {/* Pressable
                  Taps toggle password visibility. */}
              <Pressable
                onPress={() => setIsPasswordVisible(isVisible => !isVisible)}
                style={styles.iconButton}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }>
                {/* Image
                    Uses eye-open or eye-closed PNG based on state. */}
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

          {/* Animated.View
              Applies scale animation to the login button. */}
          <Animated.View style={{transform: [{scale: buttonScale}]}}>
            {/* Pressable
                LOGIN button that starts handleLogin. */}
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
                /* ActivityIndicator
                   Shows spinner while fake login is running. */
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>LOGIN</Text>
              )}
            </Pressable>
          </Animated.View>

          {/* View
              Information card for employee-only message. */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              {/* Image
                  Displays the custom NTPC home icon asset. */}
              <Image
                source={require('../assets/icons/homentpcicon.png')}
                style={styles.infoIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.infoText}>
              This app is for{'\n'}NTPC Employees only
            </Text>
          </View>

          {/* Text
              Footer ownership label. */}
          <Text style={styles.poweredBy}>Powered by NTPC</Text>
        </View>
      </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}
