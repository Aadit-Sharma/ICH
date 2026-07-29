export const loginUser = async (username, password) => {
  try {
    const response = await fetch(
      "https://dummyjson.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    return {
      success: response.ok,
      data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};