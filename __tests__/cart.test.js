import cartReducer, {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../src/redux/slices/cartSlice';

const burger = {
  id: 'food-1',
  name: 'Veg Burger',
  price: 100,
};

const sandwich = {
  id: 'food-2',
  name: 'Veg Sandwich',
  price: 50,
};

describe('Cart Slice', () => {
  test('adds a new item to the cart', () => {
    const state = cartReducer(
      undefined,
      addToCart(burger),
    );

    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].id).toBe('food-1');
    expect(state.cartItems[0].quantity).toBe(1);
  });

  test('adds the same item by increasing its quantity', () => {
    let state = cartReducer(
      undefined,
      addToCart(burger),
    );

    state = cartReducer(
      state,
      addToCart(burger),
    );

    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].quantity).toBe(2);
    expect(state.totalItems).toBe(2);
  });

  test('calculates total amount correctly', () => {
    let state = cartReducer(
      undefined,
      addToCart(burger),
    );

    state = cartReducer(
      state,
      addToCart(burger),
    );

    expect(state.totalAmount).toBe(200);
  });

  test('increases quantity correctly', () => {
    let state = cartReducer(
      undefined,
      addToCart(burger),
    );

    state = cartReducer(
      state,
      increaseQuantity('food-1'),
    );

    expect(state.cartItems[0].quantity).toBe(2);
    expect(state.totalItems).toBe(2);
    expect(state.totalAmount).toBe(200);
  });

  test('decreases quantity correctly', () => {
    let state = cartReducer(
      undefined,
      addToCart(burger),
    );

    state = cartReducer(
      state,
      increaseQuantity('food-1'),
    );

    state = cartReducer(
      state,
      decreaseQuantity('food-1'),
    );

    expect(state.cartItems[0].quantity).toBe(1);
    expect(state.totalItems).toBe(1);
    expect(state.totalAmount).toBe(100);
  });

  test('removes an item when quantity reaches one and decrease is pressed', () => {
    let state = cartReducer(
      undefined,
      addToCart(burger),
    );

    state = cartReducer(
      state,
      decreaseQuantity('food-1'),
    );

    expect(state.cartItems).toHaveLength(0);
    expect(state.totalItems).toBe(0);
    expect(state.totalAmount).toBe(0);
  });

  test('removes a selected item from the cart', () => {
    let state = cartReducer(
      undefined,
      addToCart(burger),
    );

    state = cartReducer(
      state,
      addToCart(sandwich),
    );

    state = cartReducer(
      state,
      removeFromCart('food-1'),
    );

    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].id).toBe('food-2');
    expect(state.totalAmount).toBe(50);
  });

  test('clears the entire cart', () => {
    let state = cartReducer(
      undefined,
      addToCart(burger),
    );

    state = cartReducer(
      state,
      addToCart(sandwich),
    );

    state = cartReducer(
      state,
      clearCart(),
    );

    expect(state.cartItems).toHaveLength(0);
    expect(state.totalItems).toBe(0);
    expect(state.totalAmount).toBe(0);
  });
});