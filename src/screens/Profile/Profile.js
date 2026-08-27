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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Routes from '../../navigation/Routes';
import {clearApplicationData} from '../../redux/store';
import {updateProfile} from '../../redux/slices/profileSlice';
import styles from './ProfileStyles';

import {
  getUserProfile,
  updateUserProfile,
} from '../../services/userService';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/*
 * FORMAT DATE
 *
 * Converts a JS Date into:
 * 21 Jan 2003
 */
const formatBirthDate = date => {
  return `${String(date.getDate()).padStart(2, '0')} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
};

/*
 * PARSE BIRTH DATE
 *
 * Supported formats:
 *
 * 21 Jan 2003
 * 21 Jan 2003
 * 2003-01-21
 *
 * We do NOT use new Date("21 Jan 2003")
 * because JS date-string parsing can behave
 * differently across environments.
 */
const parseBirthDate = value => {
  if (!value) {
    return null;
  }

  const cleanValue = String(value).trim();

  /*
   * Format:
   * YYYY-MM-DD
   */
  const isoMatch = cleanValue.match(
    /^(\d{4})-(\d{2})-(\d{2})$/,
  );

  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);

    const date = new Date(
      year,
      month - 1,
      day,
    );

    if (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      return date;
    }

    return null;
  }

  /*
   * Format:
   * DD Mon YYYY
   *
   * Example:
   * 21 Jan 2003
   */
  const displayMatch = cleanValue.match(
    /^(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})$/,
  );

  if (displayMatch) {
    const day = Number(displayMatch[1]);
    const monthIndex = MONTHS.indexOf(
      displayMatch[2],
    );
    const year = Number(displayMatch[3]);

    if (monthIndex === -1) {
      return null;
    }

    const date = new Date(
      year,
      monthIndex,
      day,
    );

    if (
      date.getFullYear() === year &&
      date.getMonth() === monthIndex &&
      date.getDate() === day
    ) {
      return date;
    }

    return null;
  }

  return null;
};

/*
 * TODAY WITHOUT TIME
 */
const getToday = () => {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
};

export default function Profile({navigation}) {
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  const topPadding =
    (Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top) + 12;

  const [user, setUser] = useState(null);

  const [isProfileEditing, setIsProfileEditing] =
    useState(false);

  const [isMobileEditing, setIsMobileEditing] =
    useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [selectedBirthDate, setSelectedBirthDate] =
    useState(getToday());

  const [isDatePickerOpen, setIsDatePickerOpen] =
    useState(false);

  const [newPhone, setNewPhone] = useState('');

  const [formError, setFormError] = useState('');

  /*
   * LOAD USER
   */
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser =
        await AsyncStorage.getItem('user');

      if (!savedUser) {
        setUser(null);
        return;
      }

      const localUser = JSON.parse(savedUser);

      /*
       * Show locally saved information immediately.
       */
      setUser(localUser);

      /*
       * Keep Redux synchronized with local user.
       */
      dispatch(
        updateProfile({
          name: `${localUser.firstName || ''} ${
            localUser.lastName || ''
          }`.trim(),

          firstName:
            localUser.firstName || '',

          lastName:
            localUser.lastName || '',

          email:
            localUser.email || '',

          gender:
            localUser.gender || '',

          age:
            localUser.age || '',

          birthDate:
            localUser.birthDate || '',

          phone:
            localUser.phone || '',
        }),
      );

      /*
       * Fetch latest profile from backend.
       */
      if (localUser?.id != null) {
        const result = await getUserProfile(
          localUser.id,
        );

        if (
          result.success &&
          result.data?.data
        ) {
          const latestUser = {
            ...localUser,
            ...result.data.data,

            /*
             * Preserve token because the
             * user profile API doesn't return it.
             */
            accessToken:
              localUser.accessToken,
          };

          /*
           * Update local storage.
           */
          await AsyncStorage.setItem(
            'user',
            JSON.stringify(latestUser),
          );

          /*
           * Update screen.
           */
          setUser(latestUser);

          /*
           * Update Redux.
           */
          dispatch(
            updateProfile({
              name: `${latestUser.firstName || ''} ${
                latestUser.lastName || ''
              }`.trim(),

              firstName:
                latestUser.firstName || '',

              lastName:
                latestUser.lastName || '',

              email:
                latestUser.email || '',

              gender:
                latestUser.gender || '',

              age:
                latestUser.age || '',

              birthDate:
                latestUser.birthDate || '',

              phone:
                latestUser.phone || '',
            }),
          );
        }
      }
    } catch (error) {
      console.log(
        'Error loading user profile:',
        error,
      );
    }
  };

  /*
   * EMPLOYEE DETAILS
   */
  const details = [
    [
      'Username',
      user?.username || '-',
    ],
    [
      'Gender',
      user?.gender || '-',
    ],
    [
      'Age',
      user?.age || '-',
    ],
    [
      'Birth Date',
      user?.birthDate || '-',
    ],
  ];

  /*
   * OPEN PROFILE EDITOR
   */
  const openProfileEditor = () => {
    const savedName = user
      ? `${user.firstName || ''} ${
          user.lastName || ''
        }`.trim()
      : '';

    setFullName(savedName);

    setEmail(user?.email || '');

    setGender(user?.gender || '');

    setAge(
      user?.age === undefined ||
        user?.age === null
        ? ''
        : String(user.age),
    );

    /*
     * Convert stored birth date into
     * our controlled display format.
     */
    const savedBirthDate = parseBirthDate(
      user?.birthDate,
    );

    if (savedBirthDate) {
      setBirthDate(
        formatBirthDate(savedBirthDate),
      );

      setSelectedBirthDate(savedBirthDate);
    } else {
      setBirthDate('');
      setSelectedBirthDate(getToday());
    }

    setFormError('');

    setIsProfileEditing(true);
  };

  /*
   * OPEN DATE PICKER
   */
  const openBirthDatePicker = () => {
    const savedBirthDate =
      parseBirthDate(birthDate);

    const today = getToday();

    if (
      savedBirthDate &&
      savedBirthDate <= today
    ) {
      setSelectedBirthDate(
        savedBirthDate,
      );
    } else {
      setSelectedBirthDate(today);
    }

    setIsDatePickerOpen(true);
  };

  /*
   * DATE PICKER CONFIRM
   */
  const handleBirthDateConfirm = date => {
    const selectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const today = getToday();

    if (selectedDate <= today) {
      const formattedDate =
        formatBirthDate(selectedDate);

      setBirthDate(formattedDate);

      setSelectedBirthDate(selectedDate);

      setFormError('');
    }

    setIsDatePickerOpen(false);
  };

  /*
   * OPEN MOBILE EDITOR
   */
  const openMobileEditor = () => {
    setNewPhone(user?.phone || '');

    setFormError('');

    setIsMobileEditing(true);
  };

  /*
   * SAVE PROFILE
   */
  const saveProfile = async () => {
    const normalizedName = fullName
      .trim()
      .replace(/\s+/g, ' ');

    const normalizedEmail =
      email.trim();

    const normalizedAge =
      age.trim();

    const normalizedBirthDate =
      birthDate.trim();

    const normalizedGender =
      gender.trim();

    /*
     * NAME
     */
    if (!normalizedName) {
      setFormError(
        'Full name is required.',
      );
      return;
    }

    /*
     * EMAIL
     */
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizedEmail,
      )
    ) {
      setFormError(
        'Enter a valid email address.',
      );
      return;
    }

    /*
     * AGE
     */
   const numericAge = Number(normalizedAge);

    if (
      !/^\d+$/.test(normalizedAge) ||
      numericAge < 1 ||
      numericAge > 120
    ) {
      setFormError(
        'Enter a valid age between 1 and 120.',
      );
      return;
    }

    /*
     * BIRTH DATE
     */
    if (normalizedBirthDate) {
      const parsedBirthDate =
        parseBirthDate(
          normalizedBirthDate,
        );

      if (!parsedBirthDate) {
        setFormError(
          'Enter a valid birth date.',
        );
        return;
      }

      /*
       * Compare date-only values.
       */
      const today = getToday();

      const selectedDateOnly =
        new Date(
          parsedBirthDate.getFullYear(),
          parsedBirthDate.getMonth(),
          parsedBirthDate.getDate(),
        );

      if (selectedDateOnly > today) {
        setFormError(
          'Birth date cannot be a future date.',
        );
        return;
      }
    }

    try {
      /*
       * Split full name.
       */
      const nameParts =
        normalizedName.split(' ');

      const profileData = {
        firstName:
          nameParts[0],

        lastName:
          nameParts
            .slice(1)
            .join(' '),

        email:
          normalizedEmail,

        gender:
          normalizedGender,

        age:
          normalizedAge,

        birthDate:
          normalizedBirthDate,
      };

      /*
       * Make sure we know which
       * user is being updated.
       */
      if (user?.id == null) {
        setFormError(
          'User information is unavailable.',
        );
        return;
      }

      /*
       * Send update to backend.
       */
      const result =
        await updateUserProfile(
          user.id,
          profileData,
        );

      if (!result.success) {
        setFormError(
          result.data?.message ||
            'Unable to update profile.',
        );
        return;
      }

      /*
       * Prefer backend response when available.
       */
      const backendUser =
        result.data?.data;

      const updatedUser = {
        ...user,

        ...(backendUser || profileData),
      };

      /*
       * Keep the ID safe.
       */
      updatedUser.id =
        user.id;

      /*
       * Preserve access token.
       */
      updatedUser.accessToken =
        user.accessToken;

      /*
       * Save locally.
       */
      await AsyncStorage.setItem(
        'user',
        JSON.stringify(updatedUser),
      );

      /*
       * Update screen.
       */
      setUser(updatedUser);

      /*
       * Update Redux.
       */
      dispatch(
        updateProfile({
          name: normalizedName,

          firstName:
            updatedUser.firstName || '',

          lastName:
            updatedUser.lastName || '',

          email:
            updatedUser.email || '',

          gender:
            updatedUser.gender || '',

          age:
            updatedUser.age || '',

          birthDate:
            updatedUser.birthDate || '',

          phone:
            updatedUser.phone || '',
        }),
      );

      /*
       * Close editor.
       */
      setIsProfileEditing(false);

      setFormError('');
    } catch (error) {
      console.log(
        'Error updating profile:',
        error,
      );

      setFormError(
        'Unable to update profile. Please try again.',
      );
    }
  };

  /*
   * SAVE MOBILE NUMBER
   */
  const saveMobileNumber = async () => {
    const normalizedPhone =
      newPhone
        .trim()
        .replace(/\s/g, '');

    if (
      !/^\d{10}$/.test(
        normalizedPhone,
      )
    ) {
      setFormError(
        'Enter a valid 10-digit mobile number.',
      );
      return;
    }

    try {
      if (user?.id == null) {
        setFormError(
          'User information is unavailable.',
        );
        return;
      }

      const result =
        await updateUserProfile(
          user.id,
          {
            phone: normalizedPhone,
          },
        );

      if (!result.success) {
        setFormError(
          result.data?.message ||
            'Unable to update mobile number.',
        );
        return;
      }

      const backendUser =
        result.data?.data;

      const updatedUser = {
        ...user,

        ...(backendUser || {
          phone: normalizedPhone,
        }),
      };

      updatedUser.id = user.id;

      updatedUser.accessToken =
        user.accessToken;

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(updatedUser),
      );

      setUser(updatedUser);

      dispatch(
        updateProfile({
          phone:
            updatedUser.phone || '',
        }),
      );

      setIsMobileEditing(false);

      setFormError('');
    } catch (error) {
      console.log(
        'Error updating mobile number:',
        error,
      );

      setFormError(
        'Unable to update mobile number. Please try again.',
      );
    }
  };

  /*
   * LOGOUT
   */
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

            (
              navigation.getParent() ||
              navigation
            ).reset({
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
    <SafeAreaView
      style={styles.safeArea}
      edges={[]}>
      <StatusBar
        backgroundColor="#1565C0"
        barStyle="light-content"
      />

      {/* HEADER */}

      <View
        style={[
          styles.header,
          {
            height: Math.max(
              92,
              topPadding + 56,
            ),

            paddingTop:
              topPadding,
          },
        ]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() =>
            navigation.goBack()
          }>
          <Image
            source={require('../../assets/icons/back arrow.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text
          style={styles.headerTitle}>
          Profile
        </Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={
            openProfileEditor
          }>
          <Image
            source={require('../../assets/icons/edit-text.png')}
            style={
              styles.headerEditIcon
            }
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }>

        {/* PROFILE CARD */}

        <View
          style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text
              style={
                styles.avatarText
              }>
              {user
                ? `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}` ||
                  user.username?.charAt(0)?.toUpperCase() ||
                  'U'
                : 'U'}
            </Text>
          </View>

          <Text
            style={styles.name}>
            {user
              ? `${user.firstName || ''} ${
                  user.lastName || ''
                }`.trim() ||
                user.username ||
                'User'
              : 'Loading...'}
          </Text>

          <Text
            style={
              styles.employeeId
            }>
            @{user?.username || '-'}
          </Text>

          <View
            style={styles.contactRow}>
            <Text
              style={
                styles.contactText
              }>
              {user?.email || '-'}
            </Text>
          </View>

          <View
            style={styles.contactRow}>
            <Text
              style={
                styles.contactText
              }>
              {user?.phone || '-'}
            </Text>
          </View>
        </View>

        {/* DETAILS CARD */}

        <View
          style={styles.detailsCard}>
          <Text
            style={
              styles.sectionTitle
            }>
            Employee Details
          </Text>

          {details.map(
            ([label, value], index) => (
              <View
                key={label}
                style={[
                  styles.detailRow,

                  index ===
                    details.length - 1 &&
                    styles.lastDetailRow,
                ]}>
                <Text
                  style={
                    styles.detailLabel
                  }>
                  {label}
                </Text>

                <Text
                  style={
                    styles.detailValue
                  }>
                  {value}
                </Text>
              </View>
            ),
          )}
        </View>

        {/* MOBILE */}

        <TouchableOpacity
          onPress={
            openMobileEditor
          }
          style={
            styles.actionRow
          }>
          <Text
            style={
              styles.actionText
            }>
            Change Mobile Number
          </Text>

          <Image
            source={require('../../assets/icons/edit-text.png')}
            style={
              styles.mobileActionIcon
            }
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* ADDRESSES */}

        <TouchableOpacity
          onPress={() =>
            navigation
              .getParent()
              ?.navigate(
                Routes.ADDRESS_BOOK,
              )
          }
          style={
            styles.actionRow
          }>
          <Text
            style={
              styles.actionText
            }>
            Delivery Addresses
          </Text>

          <Text
            style={
              styles.addressArrow
            }>
            ›
          </Text>
        </TouchableOpacity>

        {/* LOGOUT */}

        <TouchableOpacity
          onPress={handleLogout}
          style={
            styles.actionRow
          }>
          <View
            style={
              styles.logoutContent
            }>
            <Image
              source={require('../../assets/icons/logout.png')}
              style={
                styles.logoutIcon
              }
              resizeMode="contain"
            />

            <Text
              style={
                styles.logoutText
              }>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* EDIT PROFILE MODAL */}

      <Modal
        visible={
          isProfileEditing
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setIsProfileEditing(false)
        }>
        <View
          style={
            styles.modalBackdrop
          }>
          <View
            style={
              styles.modalCard
            }>
            <Text
              style={
                styles.modalTitle
              }>
              Edit Profile
            </Text>

            <Text
              style={
                styles.inputLabel
              }>
              Full Name
            </Text>

            <TextInput
              value={fullName}
              onChangeText={
                setFullName
              }
              style={styles.input}
              placeholder="Full Name"
            />

            <Text
              style={
                styles.inputLabel
              }>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={
                setEmail
              }
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text
              style={
                styles.inputLabel
              }>
              Gender
            </Text>

            <TextInput
              value={gender}
              onChangeText={
                setGender
              }
              style={styles.input}
              placeholder="Gender"
            />

            <Text
              style={
                styles.inputLabel
              }>
              Age
            </Text>

            <TextInput
              value={age}
              onChangeText={
                setAge
              }
              style={styles.input}
              placeholder="Age"
              keyboardType="number-pad"
            />

            <Text
              style={
                styles.inputLabel
              }>
              Birth Date
            </Text>

            <TouchableOpacity
              activeOpacity={1}
              onPress={
                openBirthDatePicker
              }>
              <TextInput
                value={birthDate}
                style={
                  styles.input
                }
                placeholder="Select Birth Date"
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            {!!formError && (
              <Text
                style={
                  styles.formError
                }>
                {formError}
              </Text>
            )}

            <View
              style={
                styles.modalActions
              }>
              <TouchableOpacity
                style={
                  styles.cancelButton
                }
                onPress={() => {
                  setFormError('');
                  setIsProfileEditing(
                    false,
                  );
                }}>
                <Text
                  style={
                    styles.cancelButtonText
                  }>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.saveButton
                }
                onPress={
                  saveProfile
                }>
                <Text
                  style={
                    styles.saveButtonText
                  }>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* DATE PICKER */}

      <DatePicker
        modal
        mode="date"
        open={
          isDatePickerOpen
        }
        date={
          selectedBirthDate
        }
        maximumDate={
          getToday()
        }
        onConfirm={
          handleBirthDateConfirm
        }
        onCancel={() =>
          setIsDatePickerOpen(
            false,
          )
        }
      />

      {/* MOBILE MODAL */}

      <Modal
        visible={
          isMobileEditing
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setIsMobileEditing(false)
        }>
        <View
          style={
            styles.modalBackdrop
          }>
          <View
            style={
              styles.modalCard
            }>
            <Text
              style={
                styles.modalTitle
              }>
              Change Mobile Number
            </Text>

            <Text
              style={
                styles.inputLabel
              }>
              Current Mobile Number
            </Text>

            <TextInput
              value={
                user?.phone || ''
              }
              style={styles.input}
              editable={false}
            />

            <Text
              style={
                styles.inputLabel
              }>
              New Mobile Number
            </Text>

            <TextInput
              value={newPhone}
              onChangeText={
                setNewPhone
              }
              style={styles.input}
              placeholder="New Mobile Number"
              keyboardType="phone-pad"
              maxLength={10}
            />

            {!!formError && (
              <Text
                style={
                  styles.formError
                }>
                {formError}
              </Text>
            )}

            <View
              style={
                styles.modalActions
              }>
              <TouchableOpacity
                style={
                  styles.cancelButton
                }
                onPress={() => {
                  setFormError('');
                  setIsMobileEditing(
                    false,
                  );
                }}>
                <Text
                  style={
                    styles.cancelButtonText
                  }>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.saveButton
                }
                onPress={
                  saveMobileNumber
                }>
                <Text
                  style={
                    styles.saveButtonText
                  }>
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