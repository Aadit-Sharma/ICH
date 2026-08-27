export const registerUser = async (
  username,
  password,
  profileData = {},
) => {
  try {
    const response = await fetch(
      'http://192.168.231.143:5000/api/auth/register',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username,
          password,

          firstName:
            profileData.firstName || '',

          lastName:
            profileData.lastName || '',

          email:
            profileData.email || '',

          gender:
            profileData.gender || '',

          age:
            profileData.age || '',

          birthDate:
            profileData.birthDate || '',

          phone:
            profileData.phone || '',
        }),
      },
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        data: data.data,
      };
    }

    return {
      success: false,
      data: {
        message:
          data.message ||
          'Unable to create account.',
      },
    };
  } catch (error) {
    console.log(
      'Registration API error:',
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

export const loginUser = async (
  username,
  password,
) => {
  try {
    const response = await fetch(
      'http://192.168.231.143:5000/api/auth/login',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username,
          password,
        }),
      },
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        data: data.data,
      };
    }

    return {
      success: false,
      data: {
        message:
          data.message ||
          'Invalid username or password.',
      },
    };
  } catch (error) {
    console.log(
      'Login API error:',
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