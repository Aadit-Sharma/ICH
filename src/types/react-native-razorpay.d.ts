declare module 'react-native-razorpay' {
  interface RazorpayOptions {
    key: string;
    amount: string;
    currency: string;
    name?: string;
    description?: string;
    order_id: string;

    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };

    theme?: {
      color?: string;
    };
  }

  interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface RazorpayCheckout {
    open(
      options: RazorpayOptions,
    ): Promise<RazorpaySuccessResponse>;
  }

  const RazorpayCheckout: RazorpayCheckout;

  export default RazorpayCheckout;
}