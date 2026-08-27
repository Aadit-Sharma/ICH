import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {registerUser} from '../../services/authService';
import Routes from '../../navigation/Routes';
import styles from './RegisterStyles';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const getToday = () => {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
};

const formatBirthDate = date =>
  `${String(date.getDate()).padStart(2, '0')} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;

export default function Register({navigation}) {
  const insets = useSafeAreaInsets();

  const buttonScale = useRef(
    new Animated.Value(1),
  ).current;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');

  const [isDatePickerOpen, setIsDatePickerOpen] =
    useState(false);

  const [selectedBirthDate, setSelectedBirthDate] =
    useState(getToday());

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] =
    useState(false);

  const validateForm = () => {
    const validationErrors = {};

    if (!username.trim()) {
      validationErrors.username =
        'Username is required';
    }

    if (!password) {
      validationErrors.password =
        'Password is required';
    } else if (password.length < 6) {
      validationErrors.password =
        'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword =
        'Please confirm your password';
    } else if (
      password !== confirmPassword
    ) {
      validationErrors.confirmPassword =
        'Passwords do not match';
    }

    if (!fullName.trim()) {
      validationErrors.fullName =
        'Full name is required';
    }

    if (!email.trim()) {
      validationErrors.email =
        'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim(),
      )
    ) {
      validationErrors.email =
        'Enter a valid email address';
    }

   if (!age.trim()) {
  validationErrors.age =
    'Age is required';
} else {
  const numericAge = Number(age.trim());

  if (
    !/^\d+$/.test(age.trim()) ||
    numericAge < 1 ||
    numericAge > 120
  ) {
    validationErrors.age =
      'Enter a valid age between 1 and 120';
  }
}

    if (!birthDate) {
      validationErrors.birthDate =
        'Birth date is required';
    }

    if (!phone.trim()) {
      validationErrors.phone =
        'Mobile number is required';
    } else if (!/^\d{10}$/.test(phone.trim())) {
      validationErrors.phone =
        'Enter a valid 10-digit mobile number';
    }

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors).length === 0
    );
  };

  const animateButton = value => {
    Animated.spring(buttonScale, {
      toValue: value,
      friction: 6,
      tension: 180,
      useNativeDriver: true,
    }).start();
  };

  const openBirthDatePicker = () => {
    setSelectedBirthDate(
      birthDate ? selectedBirthDate : getToday(),
    );

    setIsDatePickerOpen(true);
  };

  const handleBirthDateConfirm = date => {
    const selectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    if (selectedDate <= getToday()) {
      setBirthDate(
        formatBirthDate(selectedDate),
      );

      setSelectedBirthDate(selectedDate);

      setErrors(current => ({
        ...current,
        birthDate: undefined,
      }));
    }

    setIsDatePickerOpen(false);
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const nameParts = fullName
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ');

      const firstName = nameParts[0];

      const lastName =
        nameParts.slice(1).join(' ');

      const result = await registerUser(
        username.trim(),
        password,
        {
          firstName,
          lastName,
          email: email.trim(),
          gender: gender.trim(),
          age: age.trim(),
          birthDate: birthDate.trim(),
          phone: phone.trim(),
        },
      );

      if (!result.success) {
        Alert.alert(
          'Registration Failed',
          result.data?.message ||
            'Unable to create account.',
        );
        return;
      }

      Alert.alert(
        'Registration Successful',
        'Your account has been created. Please login.',
        [
          {
            text: 'LOGIN',
            onPress: () =>
              navigation.replace(
                Routes.LOGIN,
              ),
          },
        ],
      );
    } catch (error) {
      console.log(
        'Registration API error:',
        error,
      );

      Alert.alert(
        'Registration Failed',
        'Unable to connect to ICH backend.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={
            styles.scrollContent
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>
                  NTPC
                </Text>
              </View>

              <Text style={styles.title}>
                Create Account
              </Text>

              <Text style={styles.subtitle}>
                Indian Coffee House
              </Text>
            </View>

            <View style={styles.form}>

              <Text style={styles.sectionTitle}>
                Account Information
              </Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                  Username
                </Text>

                <TextInput
                  value={username}
                  onChangeText={value => {
                    setUsername(value);

                    if (errors.username) {
                      setErrors(current => ({
                        ...current,
                        username: undefined,
                      }));
                    }
                  }}
                  placeholder="Enter Username"
                  placeholderTextColor="#8A98A8"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                  style={[
                    styles.input,
                    errors.username &&
                      styles.inputError,
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

                <TextInput
                  value={password}
                  onChangeText={value => {
                    setPassword(value);

                    if (errors.password) {
                      setErrors(current => ({
                        ...current,
                        password: undefined,
                      }));
                    }
                  }}
                  placeholder="Create Password"
                  placeholderTextColor="#8A98A8"
                  secureTextEntry
                  editable={!isLoading}
                  style={[
                    styles.input,
                    errors.password &&
                      styles.inputError,
                  ]}
                />

                {errors.password ? (
                  <Text style={styles.errorText}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                  Confirm Password
                </Text>

                <TextInput
                  value={confirmPassword}
                  onChangeText={value => {
                    setConfirmPassword(value);

                    if (
                      errors.confirmPassword
                    ) {
                      setErrors(current => ({
                        ...current,
                        confirmPassword:
                          undefined,
                      }));
                    }
                  }}
                  placeholder="Confirm Password"
                  placeholderTextColor="#8A98A8"
                  secureTextEntry
                  editable={!isLoading}
                  style={[
                    styles.input,
                    errors.confirmPassword &&
                      styles.inputError,
                  ]}
                />

                {errors.confirmPassword ? (
                  <Text style={styles.errorText}>
                    {errors.confirmPassword}
                  </Text>
                ) : null}
              </View>

              <Text style={styles.sectionTitle}>
                Personal Information
              </Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                  Full Name
                </Text>

                <TextInput
                  value={fullName}
                  onChangeText={value => {
                    setFullName(value);

                    if (errors.fullName) {
                      setErrors(current => ({
                        ...current,
                        fullName: undefined,
                      }));
                    }
                  }}
                  placeholder="Enter Full Name"
                  placeholderTextColor="#8A98A8"
                  editable={!isLoading}
                  style={[
                    styles.input,
                    errors.fullName &&
                      styles.inputError,
                  ]}
                />

                {errors.fullName ? (
                  <Text style={styles.errorText}>
                    {errors.fullName}
                  </Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                  Email
                </Text>

                <TextInput
                  value={email}
                  onChangeText={value => {
                    setEmail(value);

                    if (errors.email) {
                      setErrors(current => ({
                        ...current,
                        email: undefined,
                      }));
                    }
                  }}
                  placeholder="Enter Email"
                  placeholderTextColor="#8A98A8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                  style={[
                    styles.input,
                    errors.email &&
                      styles.inputError,
                  ]}
                />

                {errors.email ? (
                  <Text style={styles.errorText}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                  Gender
                </Text>

                <TextInput
                  value={gender}
                  onChangeText={setGender}
                  placeholder="Enter Gender"
                  placeholderTextColor="#8A98A8"
                  editable={!isLoading}
                  style={styles.input}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                  Age
                </Text>

                <TextInput
                  value={age}
                  onChangeText={value => {
                    setAge(value);

                    if (errors.age) {
                      setErrors(current => ({
                        ...current,
                        age: undefined,
                      }));
                    }
                  }}
                  placeholder="Enter Age"
                  placeholderTextColor="#8A98A8"
                  keyboardType="number-pad"
                  maxLength={3}
                  editable={!isLoading}
                  style={[
                    styles.input,
                    errors.age &&
                      styles.inputError,
                  ]}
                />

                {errors.age ? (
                  <Text style={styles.errorText}>
                    {errors.age}
                  </Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                  Birth Date
                </Text>

                <Pressable
                  onPress={openBirthDatePicker}
                  disabled={isLoading}>
                  <View
                    pointerEvents="none">
                    <TextInput
                      value={birthDate}
                      placeholder="Select Birth Date"
                      placeholderTextColor="#8A98A8"
                      editable={false}
                      style={[
                        styles.input,
                        errors.birthDate &&
                          styles.inputError,
                      ]}
                    />
                  </View>
                </Pressable>

                {errors.birthDate ? (
                  <Text style={styles.errorText}>
                    {errors.birthDate}
                  </Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                  Mobile Number
                </Text>

                <TextInput
                  value={phone}
                  onChangeText={value => {
                    setPhone(value);

                    if (errors.phone) {
                      setErrors(current => ({
                        ...current,
                        phone: undefined,
                      }));
                    }
                  }}
                  placeholder="Enter Mobile Number"
                  placeholderTextColor="#8A98A8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  editable={!isLoading}
                  style={[
                    styles.input,
                    errors.phone &&
                      styles.inputError,
                  ]}
                />

                {errors.phone ? (
                  <Text style={styles.errorText}>
                    {errors.phone}
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
                  onPress={handleRegister}
                  onPressIn={() =>
                    animateButton(0.96)
                  }
                  onPressOut={() =>
                    animateButton(1)
                  }
                  disabled={isLoading}
                  style={({pressed}) => [
                    styles.registerButton,
                    (pressed || isLoading) &&
                      styles.registerButtonPressed,
                  ]}>
                  {isLoading ? (
                    <ActivityIndicator
                      size="small"
                      color="#FFFFFF"
                    />
                  ) : (
                    <Text
                      style={
                        styles.registerButtonText
                      }>
                      CREATE ACCOUNT
                    </Text>
                  )}
                </Pressable>
              </Animated.View>

              <Pressable
                onPress={() =>
                  navigation.goBack()
                }
                disabled={isLoading}
                style={styles.loginLink}>
                <Text
                  style={styles.loginLinkText}>
                  Already have an account?{' '}
                  <Text
                    style={
                      styles.loginLinkBold
                    }>
                    LOGIN
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <DatePicker
        modal
        mode="date"
        open={isDatePickerOpen}
        date={selectedBirthDate}
        maximumDate={getToday()}
        onConfirm={handleBirthDateConfirm}
        onCancel={() =>
          setIsDatePickerOpen(false)
        }
      />
    </View>
  );
}