import {
  registerUser,
  loginUser,
} from '../src/services/authService';

describe('Authentication Service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('registers a user successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          id: 10,
          username: 'emilyc',
        },
      }),
    });

    const result = await registerUser(
      'emilyc',
      'emily123',
      {
        firstName: 'Emily',
        lastName: 'Test',
        email: 'emily@example.com',
        gender: 'Female',
        age: '25',
        birthDate: '2001-01-01',
        phone: '9876062212',
      },
    );

    expect(result.success).toBe(true);
    expect(result.data.username).toBe('emilyc');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('handles duplicate username during registration', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        message: 'Username already exists.',
      }),
    });

    const result = await registerUser(
      'emilyc',
      'emily123',
    );

    expect(result.success).toBe(false);
    expect(result.data.message).toBe(
      'Username already exists.',
    );
  });

  test('handles backend connection failure during registration', async () => {
    fetch.mockRejectedValueOnce(
      new Error('Network error'),
    );

    const result = await registerUser(
      'emilyc',
      'emily123',
    );

    expect(result.success).toBe(false);
    expect(result.data.message).toBe(
      'Unable to connect to ICH backend.',
    );
  });

  test('logs in successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          id: 10,
          username: 'emilyc',
          firstName: 'Emily',
        },
      }),
    });

    const result = await loginUser(
      'emilyc',
      'emily123',
    );

    expect(result.success).toBe(true);
    expect(result.data.username).toBe('emilyc');
    expect(result.data.firstName).toBe('Emily');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('rejects invalid login credentials', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        message: 'Invalid username or password.',
      }),
    });

    const result = await loginUser(
      'emilyc',
      'wrongpassword',
    );

    expect(result.success).toBe(false);
    expect(result.data.message).toBe(
      'Invalid username or password.',
    );
  });

  test('handles backend connection failure during login', async () => {
    fetch.mockRejectedValueOnce(
      new Error('Network error'),
    );

    const result = await loginUser(
      'emilyc',
      'emily123',
    );

    expect(result.success).toBe(false);
    expect(result.data.message).toBe(
      'Unable to connect to ICH backend.',
    );
  });
});