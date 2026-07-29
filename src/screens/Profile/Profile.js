import React, {useState} from 'react';
import {Alert, Image, Modal, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import employee from '../../data/employeeProfile';
import Routes from '../../navigation/Routes';
import {clearApplicationData} from '../../redux/store';
import {updateProfile} from '../../redux/slices/profileSlice';
import styles from './ProfileStyles';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const insets = useSafeAreaInsets();
  const topPadding = (Platform.OS === 'android' ? StatusBar.currentHeight || insets.top : insets.top) + 12;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [formError, setFormError] = useState('');
  const details = [['Building', employee.building], ['Floor', employee.floor], ['Room Number', employee.room], ['Seat Number', employee.seat]];

  const openEditor = () => {
    setName(profile.name);
    setPhone(profile.phone);
    setFormError('');
    setIsEditing(true);
  };

  const saveProfile = () => {
    const normalizedName = name.trim();
    const normalizedPhone = phone.replace(/\s/g, '');
    if (!normalizedName) {
      setFormError('Employee name is required.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      setFormError('Enter a valid 10-digit mobile number.');
      return;
    }
    dispatch(updateProfile({name: normalizedName, phone: normalizedPhone}));
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await clearApplicationData();
          (navigation.getParent() || navigation).reset({index: 0, routes: [{name: Routes.LOGIN}]});
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <StatusBar backgroundColor="#1565C0" barStyle="light-content" />
      <View style={[styles.header, {height: Math.max(92, topPadding + 56), paddingTop: topPadding}]}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Image source={require('../../assets/icons/back arrow.png')} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Edit profile" onPress={openEditor} style={styles.headerButton}>
          <Image source={require('../../assets/icons/edit-text.png')} style={styles.headerEditIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{employee.initials}</Text></View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.employeeId}>{employee.employeeId}</Text>
          <View style={styles.contactRow}><Text style={styles.contactText}>{employee.email}</Text></View>
          <View style={styles.contactRow}><Text style={styles.contactText}>{profile.phone}</Text></View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Employee Details</Text>
          {details.map(([label, value], index) => <View key={label} style={[styles.detailRow, index === details.length - 1 && styles.lastDetailRow]}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>)}
        </View>

        <TouchableOpacity onPress={openEditor} style={styles.actionRow} accessibilityRole="button">
          <Text style={styles.actionText}>Change Mobile Number</Text>
          <Image source={require('../../assets/icons/edit-text.png')} style={styles.mobileActionIcon} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.actionRow} accessibilityRole="button">
          <View style={styles.logoutContent}><Image source={require('../../assets/icons/logout.png')} style={styles.logoutIcon} resizeMode="contain" /><Text style={styles.logoutText}>Logout</Text></View>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={isEditing} transparent animationType="fade" onRequestClose={() => setIsEditing(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <Text style={styles.inputLabel}>Employee Name</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Employee Name" />
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" maxLength={10} />
            {!!formError && <Text style={styles.formError}>{formError}</Text>}
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.cancelButton}><Text style={styles.cancelButtonText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={saveProfile} style={styles.saveButton}><Text style={styles.saveButtonText}>Save</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
