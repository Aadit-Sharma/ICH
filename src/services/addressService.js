const BACKEND_URL = 'http://192.168.231.143:5000';

export const getAddresses = async userId => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/addresses/user/${userId}`,
    );

    const data = await response.json();

    return {
      success: response.ok,
      data,
    };
  } catch (error) {
    console.log(
      'Get addresses error:',
      error,
    );

    return {
      success: false,
      data: {
        message:
          'Unable to connect to ICH backend.',
      },
    };
  }
};

export const createAddress = async addressData => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/addresses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      },
    );

    const data = await response.json();

    return {
      success: response.ok,
      data,
    };
  } catch (error) {
    console.log(
      'Create address error:',
      error,
    );

    return {
      success: false,
      data: {
        message:
          'Unable to connect to ICH backend.',
      },
    };
  }
};

export const deleteAddressApi = async addressId => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/addresses/${addressId}`,
      {
        method: 'DELETE',
      },
    );

    const data = await response.json();

    return {
      success: response.ok,
      data,
    };
  } catch (error) {
    console.log(
      'Delete address error:',
      error,
    );

    return {
      success: false,
      data: {
        message:
          'Unable to connect to ICH backend.',
      },
    };
  }
};