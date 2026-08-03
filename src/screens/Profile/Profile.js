import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import Routes from '../../navigation/Routes';
import {clearApplicationData} from '../../redux/store';
import {updateProfile} from '../../redux/slices/profileSlice';
import styles from './ProfileStyles';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const formatBirthDate = date =>
  `${String(date.getDate()).padStart(2, '0')} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

const parseBirthDate = value => {
  if (!value) {
    return null;
  }

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const normalized = new Date(Number(year), Number(month) - 1, Number(day));
    return normalized.getFullYear() === Number(year) &&
      normalized.getMonth() === Number(month) - 1 &&
      normalized.getDate() === Number(day)
      ? normalized
      : null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const normalized = new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate(),
  );

  return formatBirthDate(normalized) === value ? normalized : null;
};

const getToday = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

export default function Profile({navigation}) {
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  const topPadding =
    (Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top) + 12;

  const [user, setUser] = useState(null);

  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isMobileEditing, setIsMobileEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [selectedBirthDate, setSelectedBirthDate] = useState(getToday());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');

      if (savedUser) {
        const userData = JSON.parse(savedUser);

        setUser(userData);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const details = [
    ['Username', user?.username || '-'],
    ['Gender', user?.gender || '-'],
    ['Age', user?.age || '-'],
    ['Birth Date', user?.birthDate || '-'],
  ];

  const openProfileEditor = () => {
    setFullName(user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '');
    setEmail(user?.email || '');
    setGender(user?.gender || '');
    setAge(user?.age === undefined || user?.age === null ? '' : String(user.age));
    const savedBirthDate = parseBirthDate(user?.birthDate);
    setBirthDate(savedBirthDate ? formatBirthDate(savedBirthDate) : '');
    setFormError('');
    setIsProfileEditing(true);
  };

  const openBirthDatePicker = () => {
    const savedBirthDate = parseBirthDate(birthDate);
    const today = getToday();
    setSelectedBirthDate(
      savedBirthDate && savedBirthDate <= today ? savedBirthDate : today,
    );
    setIsDatePickerOpen(true);
  };

  const handleBirthDateConfirm = date => {
    const selectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const today = getToday();

    if (selectedDate <= today) {
      setBirthDate(formatBirthDate(selectedDate));
      setFormError('');
    }

    setIsDatePickerOpen(false);
  };

  const openMobileEditor = () => {
    setNewPhone(user?.phone || '');
    setFormError('');
    setIsMobileEditing(true);
  };

  const saveProfile = async () => {
  const normalizedName = fullName.trim().replace(/\s+/g, ' ');
  const normalizedEmail = email.trim();
  const normalizedAge = age.trim();
  const normalizedBirthDate = birthDate.trim();

  if (!normalizedName) {
    setFormError('Full name is required.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    setFormError('Enter a valid email address.');
    return;
  }

  if (!/^\d+$/.test(normalizedAge)) {
    setFormError('Age must be numeric.');
    return;
  }

  if (normalizedBirthDate) {
    const parsedBirthDate = parseBirthDate(normalizedBirthDate);
    if (!parsedBirthDate || parsedBirthDate > getToday()) {
      setFormError('Birth date cannot be a future date.');
      return;
    }
  }

  try {
    const nameParts = normalizedName.split(' ');

    const updatedUser = {
      ...user,
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' ') || '',
      email: normalizedEmail,
      gender: gender.trim(),
      age: normalizedAge,
      birthDate: normalizedBirthDate,
    };

    await AsyncStorage.setItem(
      'user',
      JSON.stringify(updatedUser),
    );

    setUser(updatedUser);

    dispatch(
      updateProfile({
        name: normalizedName,
        email: normalizedEmail,
        gender: gender.trim(),
        age: normalizedAge,
        birthDate: normalizedBirthDate,
      }),
    );

    setIsProfileEditing(false);
    setFormError('');
  } catch (error) {
    console.log('Error updating profile:', error);
  }
};

  const saveMobileNumber = async () => {
    const normalizedPhone = newPhone.trim().replace(/\s/g, '');

    if (!/^\d{10}$/.test(normalizedPhone)) {
      setFormError('Enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const updatedUser = {...user, phone: normalizedPhone};
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      dispatch(updateProfile({phone: normalizedPhone}));
      setIsMobileEditing(false);
      setFormError('');
    } catch (error) {
      console.log('Error updating mobile number:', error);
    }
  };

  

const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await clearApplicationData();

          (navigation.getParent() || navigation).reset({
            index: 0,
            routes: [
              {
                name: Routes.LOGIN,
              },
            ],
          });
        },
      },
    ],
  );
};
return (
  <SafeAreaView style={styles.safeArea} edges={[]}>
    <StatusBar
      backgroundColor="#1565C0"
      barStyle="light-content"
    />

    <View
      style={[
        styles.header,
        {
          height: Math.max(92, topPadding + 56),
          paddingTop: topPadding,
        },
      ]}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/icons/back arrow.png')}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        Profile
      </Text>

      <TouchableOpacity
        style={styles.headerButton}
        onPress={openProfileEditor}>
        <Image
          source={require('../../assets/icons/edit-text.png')}
          style={styles.headerEditIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>

    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
          {user
            ? `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`
            : 'U'}
        </Text>
        </View>

        <Text style={styles.name}>
          {user
            ? `${user.firstName} ${user.lastName}`
            : 'Loading...'}
        </Text>

        <Text style={styles.employeeId}>
          @{user?.username || '-'}
        </Text>

        <View style={styles.contactRow}>
          <Text style={styles.contactText}>
            {user?.email || '-'}
            
          </Text>
        </View>

        <View style={styles.contactRow}>
          <Text style={styles.contactText}>
            {user?.phone || '-'}
          </Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>
          Employee Details
        </Text>

        {details.map(([label, value], index) => (
          <View
            key={label}
            style={[
              styles.detailRow,
              index === details.length - 1 &&
                styles.lastDetailRow,
            ]}>
            <Text style={styles.detailLabel}>
              {label}
            </Text>

            <Text style={styles.detailValue}>
              {value}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={openMobileEditor}
        style={styles.actionRow}>
        <Text style={styles.actionText}>
          Change Mobile Number
        </Text>

        <Image
          source={require('../../assets/icons/edit-text.png')}
          style={styles.mobileActionIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={styles.actionRow}>
        <View style={styles.logoutContent}>
          <Image
            source={require('../../assets/icons/logout.png')}
            style={styles.logoutIcon}
            resizeMode="contain"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>

    <Modal
      visible={isProfileEditing}
      transparent
      animationType="fade"
      onRequestClose={() => setIsProfileEditing(false)}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>
            Edit Profile
          </Text>

          <Text style={styles.inputLabel}>
            Full Name
          </Text>

          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholder="Full Name"
          />

          <Text style={styles.inputLabel}>
            Email
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Gender</Text>
          <TextInput value={gender} onChangeText={setGender} style={styles.input} placeholder="Gender" />

          <Text style={styles.inputLabel}>Age</Text>
          <TextInput value={age} onChangeText={setAge} style={styles.input} placeholder="Age" keyboardType="number-pad" />

          <Text style={styles.inputLabel}>Birth Date</Text>
          <TouchableOpacity activeOpacity={1} onPress={openBirthDatePicker}>
            <TextInput
              value={birthDate}
              style={styles.input}
              placeholder="Select Birth Date"
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>

          {!!formError && (
            <Text style={styles.formError}>
              {formError}
            </Text>
          )}

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsProfileEditing(false)}>
              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveProfile}>
              <Text style={styles.saveButtonText}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

    <DatePicker
      modal
      mode="date"
      open={isDatePickerOpen}
      date={selectedBirthDate}
      maximumDate={getToday()}
      onConfirm={handleBirthDateConfirm}
      onCancel={() => setIsDatePickerOpen(false)}
    />

    <Modal
      visible={isMobileEditing}
      transparent
      animationType="fade"
      onRequestClose={() => setIsMobileEditing(false)}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Change Mobile Number</Text>

          <Text style={styles.inputLabel}>Current Mobile Number</Text>
          <TextInput value={user?.phone || ''} style={styles.input} editable={false} />

          <Text style={styles.inputLabel}>New Mobile Number</Text>
          <TextInput
            value={newPhone}
            onChangeText={setNewPhone}
            style={styles.input}
            placeholder="New Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
          />

          {!!formError && <Text style={styles.formError}>{formError}</Text>}

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsMobileEditing(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveMobileNumber}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </SafeAreaView>
);
}
