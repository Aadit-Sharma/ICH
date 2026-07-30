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
import {useDispatch} from 'react-redux';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import Routes from '../../navigation/Routes';
import {clearApplicationData} from '../../redux/store';
import {updateProfile} from '../../redux/slices/profileSlice';
import styles from './ProfileStyles';

export default function Profile({navigation}) {
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  const topPadding =
    (Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top) + 12;

  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');

  const [phone, setPhone] = useState('');

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

        setName(
          `${userData.firstName} ${userData.lastName}`,
        );

        setPhone(userData.phone || '');
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

  const openEditor = () => {
    setName(
      user
        ? `${user.firstName} ${user.lastName}`
        : '',
    );

    setPhone(user?.phone || '');

    setFormError('');

    setIsEditing(true);
  };
  const saveProfile = async () => {
  const normalizedName = name.trim();
  const normalizedPhone = phone.trim().replace(/\s/g, '');

  if (!normalizedName) {
    setFormError('Employee name is required.');
    return;
  }

  if (!normalizedPhone) {
    setFormError('Mobile number is required.');
    return;
  }

  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    setFormError('Enter a valid 10-digit mobile number.');
    return;
  }

  try {
    const nameParts = normalizedName.split(' ');

    const updatedUser = {
      ...user,
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' ') || '',
      phone: normalizedPhone,
    };

    await AsyncStorage.setItem(
      'user',
      JSON.stringify(updatedUser),
    );

    setUser(updatedUser);

    dispatch(
      updateProfile({
        name: normalizedName,
        phone: normalizedPhone,
      }),
    );

    setIsEditing(false);
    setFormError('');
  } catch (error) {
    console.log('Error updating profile:', error);
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
        onPress={openEditor}>
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
        onPress={openEditor}
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
      visible={isEditing}
      transparent
      animationType="fade"
      onRequestClose={() => setIsEditing(false)}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>
            Edit Profile
          </Text>

          <Text style={styles.inputLabel}>
            Full Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Full Name"
          />

          <Text style={styles.inputLabel}>
            Mobile Number
          </Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
          />

          {!!formError && (
            <Text style={styles.formError}>
              {formError}
            </Text>
          )}

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}>
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
  </SafeAreaView>
);
}