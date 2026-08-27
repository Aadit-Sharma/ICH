import billsReducer, {
  createBill,
  resetBills,
} from '../src/redux/slices/billsSlice';

const order = {
  id: 'ORD-1001',
  userId: 10,
  username: 'emilyc',
  placedAt: '2026-08-25T06:56:52.539Z',
  items: [
    {
      id: 'popular-4',
      name: 'Veg Sandwich',
      price: 50,
      quantity: 1,
    },
  ],
  subtotal: 50,
  tax: 3,
  serviceCharge: 15,
  total: 68,
  paymentStatus: 'Paid',
  razorpayPaymentId: 'pay_test123',
  address: {
    fullName: 'Emily',
    addressLine1: 'NTPC OFFICE',
    city: 'NOIDA',
    state: 'UTTAR PRADESH',
    pincode: '201023',
    phone: '9876062212',
  },
};

describe('Bills Slice', () => {
  test('creates a bill from a valid order', () => {
    const state = billsReducer(
      undefined,
      createBill({order}),
    );

    expect(state.billsByUser['10']).toHaveLength(1);
    expect(state.billsByUser['10'][0].orderId).toBe(
      'ORD-1001',
    );
  });

  test('generates the first bill number as BILL-1001', () => {
    const state = billsReducer(
      undefined,
      createBill({order}),
    );

    expect(state.billsByUser['10'][0].id).toBe(
      'BILL-1001',
    );
  });

  test('stores the correct order amount and payment status', () => {
    const state = billsReducer(
      undefined,
      createBill({order}),
    );

    const bill = state.billsByUser['10'][0];

    expect(bill.subtotal).toBe(50);
    expect(bill.tax).toBe(3);
    expect(bill.serviceCharge).toBe(15);
    expect(bill.total).toBe(68);
    expect(bill.paymentStatus).toBe('Paid');
  });

  test('stores Razorpay payment information', () => {
    const state = billsReducer(
      undefined,
      createBill({order}),
    );

    const bill = state.billsByUser['10'][0];

    expect(bill.paymentId).toBe('pay_test123');
    expect(bill.paymentMethod).toBe('Razorpay');
  });

  test('increments bill number for the same user', () => {
    let state = billsReducer(
      undefined,
      createBill({order}),
    );

    const secondOrder = {
      ...order,
      id: 'ORD-1002',
    };

    state = billsReducer(
      state,
      createBill({order: secondOrder}),
    );

    expect(state.billsByUser['10']).toHaveLength(2);
    expect(state.billsByUser['10'][0].id).toBe(
      'BILL-1002',
    );
    expect(state.billsByUser['10'][1].id).toBe(
      'BILL-1001',
    );
  });

  test('ignores an order without a user ID', () => {
    const invalidOrder = {
      ...order,
      userId: null,
    };

    const state = billsReducer(
      undefined,
      createBill({order: invalidOrder}),
    );

    expect(state.billsByUser).toEqual({});
    expect(state.latestBill).toBeNull();
  });

  test('resets all bills and bill numbering', () => {
    let state = billsReducer(
      undefined,
      createBill({order}),
    );

    state = billsReducer(state, resetBills());

    expect(state.billsByUser).toEqual({});
    expect(state.nextBillNumberByUser).toEqual({});
    expect(state.latestBill).toBeNull();
  });
});