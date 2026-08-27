const BACKEND_URL = 'http://192.168.231.143:5000';

/*
 * GET USER PROFILE
 */
export const getUserProfile = async userId => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/users/${userId}`,
    );

    const data = await response.json();

    return {
      success: response.ok,
      data,
    };
  } catch (error) {
    console.log(
      'Get user profile error:',
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

/*
 * UPDATE USER PROFILE
 */
export const updateUserProfile = async (
  userId,
  profileData,
) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      },
    );

    const data = await response.json();

    return {
      success: response.ok,
      data,
    };
  } catch (error) {
    console.log(
      'Update user profile error:',
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