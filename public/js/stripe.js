/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51NJ4ZGAZBUwv1K4VxshvCd0BikLomKDhuLX1ZF3gRp0LfhV3RTdaihRg5KJ8lcSWfJ6QrbOG0wNWwhk41pGWn6qa00W5tlZRQa'
);

export const bookTour = async (tourId) => {
  try {
    //1) Get session from server
    const session = await axios({
      method: 'GET',
      url: `/api/v1/bookings/checkout-sessions/${tourId}`,
      data: session,
    });
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
