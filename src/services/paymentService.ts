import type {Payment, PaymentMethod} from '../types/payment';

interface ProcessPaymentParams {
  orderId: string;
  amount: number;
  method: PaymentMethod;
}

export const processPayment = async ({
  orderId,
  amount,
  method,
}: ProcessPaymentParams): Promise<Payment> => {
  await new Promise<void>(resolve => {
    setTimeout(resolve, 1500);
  });

  // Temporary testing switch.
  // Set to true when you want to test the failure flow.
  const simulateFailure = false;

  if (simulateFailure) {
    return {
      paymentId: `PAY-${Date.now()}`,
      orderId,
      amount,
      method,
      status: 'FAILED',
      createdAt: new Date().toISOString(),
    };
  }

  return {
    paymentId: `PAY-${Date.now()}`,
    orderId,
    amount,
    method,
    status: 'SUCCESS',
    createdAt: new Date().toISOString(),
  };
};