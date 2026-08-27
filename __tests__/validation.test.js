describe('Registration Validation Rules', () => {
  const validateAge = age => {
    if (!age.trim()) {
      return 'Age is required';
    }

    const numericAge = Number(age.trim());

    if (
      !/^\d+$/.test(age.trim()) ||
      numericAge < 1 ||
      numericAge > 120
    ) {
      return 'Enter a valid age between 1 and 120';
    }

    return null;
  };

  const validatePhone = phone => {
    if (!phone.trim()) {
      return 'Mobile number is required';
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      return 'Enter a valid 10-digit mobile number';
    }

    return null;
  };

  const validateEmail = email => {
    if (!email.trim()) {
      return 'Email is required';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Enter a valid email address';
    }

    return null;
  };

  const validatePassword = password => {
    if (!password) {
      return 'Password is required';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return null;
  };

  test('rejects empty age', () => {
    expect(validateAge('')).toBe('Age is required');
  });

  test('accepts valid age', () => {
    expect(validateAge('25')).toBeNull();
  });

  test('rejects age below 1', () => {
    expect(validateAge('0')).toBe(
      'Enter a valid age between 1 and 120',
    );
  });

  test('rejects age above 120', () => {
    expect(validateAge('121')).toBe(
      'Enter a valid age between 1 and 120',
    );
  });

  test('rejects non-numeric age', () => {
    expect(validateAge('abc')).toBe(
      'Enter a valid age between 1 and 120',
    );
  });

  test('rejects invalid phone number', () => {
    expect(validatePhone('98765')).toBe(
      'Enter a valid 10-digit mobile number',
    );
  });

  test('accepts valid 10-digit phone number', () => {
    expect(validatePhone('9876062212')).toBeNull();
  });

  test('rejects empty phone number', () => {
    expect(validatePhone('')).toBe(
      'Mobile number is required',
    );
  });

  test('accepts valid email', () => {
    expect(validateEmail('test@example.com')).toBeNull();
  });

  test('rejects invalid email', () => {
    expect(validateEmail('test@example')).toBe(
      'Enter a valid email address',
    );
  });

  test('rejects empty email', () => {
    expect(validateEmail('')).toBe('Email is required');
  });

  test('rejects password shorter than 6 characters', () => {
    expect(validatePassword('12345')).toBe(
      'Password must be at least 6 characters',
    );
  });

  test('accepts password with 6 or more characters', () => {
    expect(validatePassword('123456')).toBeNull();
  });

  test('rejects empty password', () => {
    expect(validatePassword('')).toBe(
      'Password is required',
    );
  });
});