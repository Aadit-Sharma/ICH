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


export default function Login({navigation}) {
  const buttonScale = useRef(new Animated.Value(1)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = value => {
    setUserName(value);

    if (errors.username) {
      setErrors(current => ({
        ...current,
        username: undefined,
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

    if (!username.trim()) {
      validationErrors.username = 'Username is required';
    } 

    if (!password.trim()) {
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

    const result = await loginUser(
      username.trim(),
      password.trim(),
    );

    if (result.success) {
      shouldResetLoading = false;

      await AsyncStorage.setItem(
        'isLoggedIn',
        'true',
      );

      await AsyncStorage.setItem(
        'accessToken',
        result.data.accessToken,
      );

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(result.data),
      );

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
      result.data.message || 'Invalid Username or Password',
    );
  } catch (error) {
    console.log(error);

    Alert.alert(
      'Login Failed',
      'Something went wrong. Please try again.',
    );
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
                Username
              </Text>

              <TextInput
                value={username}
                onChangeText={handleUsernameChange}
                placeholder="Enter Username"
                placeholderTextColor="#8A98A8"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
                style={[
                  styles.input,
                  errors.username
                    ? styles.inputError
                    : null,
                ]}
              />

              {errors.username ? (
                <Text style={styles.errorText}>
                  {errors.username}
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
