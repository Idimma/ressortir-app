import Request from "../utils/Request";

class BookingService {
    fetchWish = () => Request().get(`ecommerce/wish_basket`);
    fetchBookings = () => Request().get(`ecommerce/wish_basket/booking`);
    createWish = (title) => Request().post(`ecommerce/wish_basket`, {title});     fetchBasket = (uuid) => Request().get(`wish_basket/${uuid}`);
    deleteWish = (uuid) => Request().delete(`ecommerce/wish_basket/${uuid}`);
    fetchBooking = (uuid) => Request().get(`ecommerce/wish_basket/booking/${uuid}`);
    getWish = (uuid) => Request().get(`ecommerce/wish_basket/${uuid}`);

    addWishToBasket = (uuid, data) => Request().post(`ecommerce/wish_basket/${uuid}/wish`, data);
    convertToCart = (uuid) => Request().post(`ecommerce/wish_basket/${uuid}/buy`);
    convertToBooking = (uuid) => Request().patch(`ecommerce/wish_basket/${uuid}/convert-to-booking`);
    setReminder = (uuid, frequency) => Request().post(`ecommerce/wish_basket/${uuid}/reminder`,
      { frequency, time: "00:00"});


    setPickup = (uuid, distributor_id) => Request().patch(`ecommerce/wish_basket/booking/${uuid}/add-pickup`, { distributor_id });
    setDelivery = (uuid, address) => Request().patch(`ecommerce/wish_basket/booking/${uuid}/add-delivery`, { address });
    setPayment = (uuid, form_data) => Request().patch(`ecommerce/wish_basket/booking/${uuid}/add-payment`, form_data);

    addWishToBooking = (uuid, data) => Request().post(`ecommerce/wish_basket/booking/${uuid}/wish`, data);

    fetchBasketWishes = (uuid) => Request().get(`ecommerce/wish_basket/${uuid}/wishes`);
    fetchBookingItems = (uuid) => Request().get(`ecommerce/wish_basket/${uuid}/booking`);
}

export default new BookingService();