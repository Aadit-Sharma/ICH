import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addAddress,
  deleteAddress,
  selectAddress,
} from '../../redux/slices/addressSlice';

export default function AddressBook({navigation}) {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] =
    useState('');

  const addressesByUser = useSelector(
    state => state.addresses.addressesByUser,
  );

  const selectedAddressByUser = useSelector(
    state => state.addresses.selectedAddressByUser,
  );

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser =
          await AsyncStorage.getItem('user');

        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log(
          'Error loading user in Address Book:',
          error,
        );
      }
    };

    loadUser();
  }, []);

  const userKey =
    currentUser?.id == null
      ? null
      : String(currentUser.id);

  const addresses =
    userKey
      ? addressesByUser[userKey] || []
      : [];

  const selectedAddressId =
    userKey
      ? selectedAddressByUser[userKey]
      : null;

  const clearForm = () => {
    setFullName('');
    setPhone('');
    setAddressLine1('');
    setCity('');
    setStateName('');
    setPincode('');
    setLandmark('');
    setDeliveryInstructions('');
  };

  const handleAddAddress = () => {
    if (!currentUser?.id) {
      Alert.alert(
        'Login required',
        'Please log in before adding an address.',
      );
      return;
    }

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !addressLine1.trim() ||
      !city.trim() ||
      !stateName.trim() ||
      !pincode.trim()
    ) {
      Alert.alert(
        'Incomplete address',
        'Please fill all required fields.',
      );
      return;
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      Alert.alert(
        'Invalid phone number',
        'Please enter a valid 10-digit phone number.',
      );
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      Alert.alert(
        'Invalid pincode',
        'Please enter a valid 6-digit pincode.',
      );
      return;
    }

    dispatch(
      addAddress({
        userId: currentUser.id,
        address: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          addressLine1: addressLine1.trim(),
          city: city.trim(),
          state: stateName.trim(),
          pincode: pincode.trim(),
          landmark: landmark.trim(),
          deliveryInstructions:
            deliveryInstructions.trim(),
        },
      }),
    );

    clearForm();
    setShowForm(false);
  };

  const handleDelete = addressId => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(
              deleteAddress({
                userId: currentUser.id,
                addressId,
              }),
            );
          },
        },
      ],
    );
  };

  const handleSelect = addressId => {
    dispatch(
      selectAddress({
        userId: currentUser.id,
        addressId,
      }),
    );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom']}>

      {/* HEADER */}

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          Delivery Addresses
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* SAVED ADDRESSES */}

        <Text style={styles.sectionTitle}>
          Saved Addresses
        </Text>

        {addresses.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No saved addresses
            </Text>

            <Text style={styles.emptyText}>
              Add a delivery address to make checkout
              faster.
            </Text>
          </View>
        ) : (
          addresses.map(address => {
            const selected =
              selectedAddressId === address.id;

            return (
              <Pressable
                key={address.id}
                onPress={() =>
                  handleSelect(address.id)
                }
                style={[
                  styles.addressCard,
                  selected &&
                    styles.selectedAddressCard,
                ]}>

                <View style={styles.addressHeader}>
                  <Text style={styles.addressName}>
                    {address.fullName}
                  </Text>

                  {selected && (
                    <View style={styles.selectedBadge}>
                      <Text
                        style={styles.selectedBadgeText}>
                        Selected
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.addressText}>
                  {address.addressLine1}
                </Text>

                <Text style={styles.addressText}>
                  {address.city}, {address.state} -{' '}
                  {address.pincode}
                </Text>

                {address.landmark ? (
                  <Text style={styles.addressText}>
                    Landmark: {address.landmark}
                  </Text>
                ) : null}

                <Text style={styles.phoneText}>
                  Phone: {address.phone}
                </Text>

                <View style={styles.cardActions}>
                  <Pressable
                    onPress={() =>
                      handleSelect(address.id)
                    }
                    style={styles.selectButton}>
                    <Text
                      style={styles.selectButtonText}>
                      {selected
                        ? 'Selected'
                        : 'Use This Address'}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      handleDelete(address.id)
                    }
                    style={styles.deleteButton}>
                    <Text
                      style={styles.deleteButtonText}>
                      Delete
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          })
        )}

        {/* ADD BUTTON */}

        {!showForm && (
          <Pressable
            onPress={() => setShowForm(true)}
            style={styles.addButton}>
            <Text style={styles.addButtonText}>
              + Add New Address
            </Text>
          </Pressable>
        )}

        {/* ADD ADDRESS FORM */}

        {showForm && (
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                Add New Address
              </Text>

              <Pressable
                onPress={() => {
                  clearForm();
                  setShowForm(false);
                }}>
                <Text style={styles.closeText}>
                  Cancel
                </Text>
              </Pressable>
            </View>

            <Text style={styles.inputLabel}>
              Full Name *
            </Text>

            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              style={styles.input}
            />

            <Text style={styles.inputLabel}>
              Phone Number *
            </Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="10-digit phone number"
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.input}
            />

            <Text style={styles.inputLabel}>
              Address *
            </Text>

            <TextInput
              value={addressLine1}
              onChangeText={setAddressLine1}
              placeholder="House / building / street"
              style={styles.input}
            />

            <Text style={styles.inputLabel}>
              City *
            </Text>

            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="City"
              style={styles.input}
            />

            <Text style={styles.inputLabel}>
              State *
            </Text>

            <TextInput
              value={stateName}
              onChangeText={setStateName}
              placeholder="State"
              style={styles.input}
            />

            <Text style={styles.inputLabel}>
              Pincode *
            </Text>

            <TextInput
              value={pincode}
              onChangeText={setPincode}
              placeholder="6-digit pincode"
              keyboardType="number-pad"
              maxLength={6}
              style={styles.input}
            />

            <Text style={styles.inputLabel}>
              Landmark
            </Text>

            <TextInput
              value={landmark}
              onChangeText={setLandmark}
              placeholder="Nearby landmark"
              style={styles.input}
            />

            <Text style={styles.inputLabel}>
              Delivery Instructions
            </Text>

            <TextInput
              value={deliveryInstructions}
              onChangeText={setDeliveryInstructions}
              placeholder="Any special instructions?"
              multiline
              style={[
                styles.input,
                styles.multilineInput,
              ]}
            />

            <Pressable
              onPress={handleAddAddress}
              style={styles.saveButton}>
              <Text style={styles.saveButtonText}>
                Save Address
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    height: 64,
    backgroundColor: '#005BAC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  headerButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 38,
    fontWeight: '300',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  headerSpacer: {
    width: 42,
  },

  content: {
    padding: 16,
    paddingBottom: 35,
  },

  sectionTitle: {
    color: '#102A43',
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 14,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E9F0',
  },

  emptyTitle: {
    color: '#102A43',
    fontSize: 17,
    fontWeight: '800',
  },

  emptyText: {
    marginTop: 7,
    color: '#627D98',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },

  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 17,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E4E9F0',
  },

  selectedAddressCard: {
    borderColor: '#005BAC',
    borderWidth: 2,
  },

  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  addressName: {
    flex: 1,
    color: '#102A43',
    fontSize: 16,
    fontWeight: '800',
  },

  selectedBadge: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  selectedBadgeText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '800',
  },

  addressText: {
    color: '#627D98',
    fontSize: 13,
    lineHeight: 19,
  },

  phoneText: {
    color: '#52606D',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 7,
  },

  cardActions: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },

  selectButton: {
    flex: 1,
    backgroundColor: '#005BAC',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },

  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  deleteButton: {
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#D32F2F',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButtonText: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: '800',
  },

  addButton: {
    marginTop: 6,
    borderWidth: 1.5,
    borderColor: '#005BAC',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  addButtonText: {
    color: '#005BAC',
    fontSize: 14,
    fontWeight: '800',
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E4E9F0',
  },

  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  formTitle: {
    color: '#102A43',
    fontSize: 18,
    fontWeight: '900',
  },

  closeText: {
    color: '#D32F2F',
    fontSize: 13,
    fontWeight: '700',
  },

  inputLabel: {
    color: '#334E68',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
    marginTop: 11,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    color: '#102A43',
    backgroundColor: '#FFFFFF',
    fontSize: 14,
  },

  multilineInput: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },

  saveButton: {
    marginTop: 22,
    backgroundColor: '#005BAC',
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});