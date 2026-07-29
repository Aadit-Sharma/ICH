
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  Image,
  View,
} from 'react-native';
import {loginUser} from '../../services/authService';
import Routes from '../../navigation/Routes';
import styles from './LoginStyles';
const employeeMap = {
  574839: 'emilys',
};

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
      setErrors(current => ({
        ...current,
        employeeId: undefined,
      }));
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);

    if (errors.password) {
      setErrors(current => ({
        ...current,
        password: undefined,
      }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!employeeId) {
      validationErrors.employeeId = 'Employee ID is required';
    } else if (employeeId.length !== 6) {
      validationErrors.employeeId =
        'Employee ID must be exactly 6 digits';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const animateButton = value => {
    Animated.spring(buttonScale, {
      toValue: value,
      friction: 6,
      tension: 180,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
  if (!validateForm()) {
    return;
  }

  let shouldResetLoading = true;

  try {
    setIsLoading(true);

    // Convert Employee ID to DummyJSON username
    const username = employeeMap[employeeId];

    if (!username) {
      Alert.alert(
        'Login Failed',
        'Employee ID is not registered.',
      );
      return;
    }

    // Call DummyJSON Login API
    const result = await loginUser(username, password);

    if (result.success) {
      shouldResetLoading = false;

      // Save login state
      await AsyncStorage.setItem('isLoggedIn', 'true');

      // Save access token
      await AsyncStorage.setItem(
        'accessToken',
        result.data.accessToken,
      );

      // (Optional) Save user details
      await AsyncStorage.setItem(
        'user',
        JSON.stringify(result.data),
      );

      // Fade animation
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

    Alert.alert(
      'Login Failed',
      result.data.message || 'Invalid Employee ID or Password',
    );
  } catch (error) {
    Alert.alert(
      'Login Failed',
      'Something went wrong. Please try again.',
    );
    console.log(error);
  } finally {
    if (shouldResetLoading) {
      setIsLoading(false);
    }
  }
};
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: screenOpacity,
        },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>NTPC</Text>
            </View>

            <Text style={styles.title}>
              Indian Coffee House
            </Text>

            <Text style={styles.subtitle}>
              Employee Food Ordering
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Employee ID
              </Text>

              <TextInput
                value={employeeId}
                onChangeText={handleEmployeeIdChange}
                placeholder="Employee ID"
                placeholderTextColor="#8A98A8"
                keyboardType="number-pad"
                maxLength={6}
                editable={!isLoading}
                style={[
                  styles.input,
                  errors.employeeId
                    ? styles.inputError
                    : null,
                ]}
              />

              {errors.employeeId ? (
                <Text style={styles.errorText}>
                  {errors.employeeId}
                </Text>
              ) : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Password
              </Text>

              <View
                style={[
                  styles.passwordInputContainer,
                  errors.password
                    ? styles.inputError
                    : null,
                ]}>
                <TextInput
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder="Password"
                  placeholderTextColor="#8A98A8"
                  secureTextEntry={!isPasswordVisible}
                  editable={!isLoading}
                  style={styles.passwordInput}
                />

                <Pressable
                  onPress={() =>
                    setIsPasswordVisible(v => !v)
                  }
                  disabled={isLoading}
                  style={styles.iconButton}>
                  <Image
                    source={
                      isPasswordVisible
                        ? require('../../assets/icons/eye open.png')
                        : require('../../assets/icons/eye closed.png')
                    }
                    style={styles.passwordToggleIcon}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>

              {errors.password ? (
                <Text style={styles.errorText}>
                  {errors.password}
                </Text>
              ) : null}
            </View>

            <Animated.View
              style={{
                transform: [
                  {
                    scale: buttonScale,
                  },
                ],
              }}>
              <Pressable
                onPress={handleLogin}
                onPressIn={() => animateButton(0.96)}
                onPressOut={() => animateButton(1)}
                disabled={isLoading}
                style={({pressed}) => [
                  styles.loginButton,
                  (pressed || isLoading) &&
                    styles.loginButtonPressed,
                ]}>
                {isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />
                ) : (
                  <Text style={styles.loginButtonText}>
                    LOGIN
                  </Text>
                )}
              </Pressable>
            </Animated.View>

            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Image
                  source={require('../../assets/icons/homentpcicon.png')}
                  style={styles.infoIcon}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.infoText}>
                This app is for{"\n"}
                NTPC Employees only
              </Text>
            </View>

            <Text style={styles.poweredBy}>
              Powered by NTPC
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}
