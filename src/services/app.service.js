import Request from '../utils/Request'
export const baseUrl = "https://dev.ownafarm.biz/api/v1/";
export const nubanApiUrl = "https://app.nuban.com.ng/api/NUBAN-OGRNOTZN399";
export const clientTypes = {
  FOOD_MART: "food_mart",
  AGGREGATOR: "aggregator",
};
// Your API Key Purchase(s)
// Your API Key is: NUBAN-OGRNOTZN399
// URL: app.nuban.com.ng/api/NUBAN-OGRNOTZN399
//AUTH ENDPOINTS
export const REGISTER_START =  `signup/start`;
export const REGISTER_COMPLETE =  `signup/complete`;
export const REQUEST_OTP =  `signup/otp/request`;
export const VERIFY_OTP =  `signup/otp/verify`;
export const LOGIN =  `auth/login`;
export const LOGOUT =  `auth/logout`;
export const PROFILE =  `auth/profile`;
export const REFRESH_TOKEN =  `auth/refresh`;
//AVATAR
export const UPDATE_AVATAR =  `account/avatar`;
//PRODUCT ENDPOINTS
export const PRODUCTS =  `order/products`;
export const RECENTLY_VIEWED_PRODUCTS = `${PRODUCTS}/recently-viewed`;
export const SINGLE_PRODUCT = (productId) => `${PRODUCTS}/${productId}`;
export const AGG_PRODUCTS =  `aggregator/products`;
export const TRASH_AGG_PRODUCTS = `${AGG_PRODUCTS}/trash`;
export const DRAFT_AGG_PRODUCTS = `${AGG_PRODUCTS}/draft`;
export const PUBLISH_AGG_PRODUCTS = `${AGG_PRODUCTS}/publish`;
export const RESTORE_AGG_PRODUCTS = `${AGG_PRODUCTS}/restore`;
export const DELETE_AGG_PRODUCTS = `${AGG_PRODUCTS}/delete`;
export const AGG_PRODUCTS_INFO = `${AGG_PRODUCTS}/info`;
export const SINGLE_AGG_PRODUCT = (productId) => `${AGG_PRODUCTS}/${productId}`;
export const TRASH_AGG_PRODUCT = (productId) => `${SINGLE_AGG_PRODUCT(productId)}/trash`;
export const PUBLISH_AGG_PRODUCT = (productId) => `${SINGLE_AGG_PRODUCT(productId)}/publish`;
export const DRAFT_AGG_PRODUCT = (productId) => `${SINGLE_AGG_PRODUCT(productId)}/draft`;
export const RESTORE_AGG_PRODUCT = (productId) => `${SINGLE_AGG_PRODUCT(productId)}/restore`;
export const EXPORT_PRODUCTS = `${AGG_PRODUCTS}/export`;
//WISHLIST ENDPOINTS
export const WISHLIST =  `order/wishlist`;
export const ADD_TO_WISH = `${WISHLIST}/add`;
export const SINGLE_WISH = (productId) => `${WISHLIST}/${productId}`;
export const WISH_BY_PRODUCT = (productId) => `${WISHLIST}/product/${productId}`;
export const WISH_ON_LIST = (productId) => `${WISHLIST}/product/${productId}/on-list`;
//ADDRESS ENDPOINTS
const address =  `address`;
export const CREATE_ADDRESS = `${address}/add`;
export const GET_ADDRESS = (addressId) => `${address}/details/${addressId}`;
export const UPDATE_ADDRESS = (addressId) => `${address}/update/${addressId}`;
export const DELETE_ADDRESS = (addressId) => `${address}/delete/${addressId}`;
export const LIST_ADDRESSES = `${address}/list`;
//BANK ACCOUNT ENDPOINTS
export const BANK_ACCOUNT =  `bank_account`;
export const CREATE_BANK_ACCOUNT = `${BANK_ACCOUNT}/add`;
export const VERIFY_ACCOUNT = (accountNumber) => `${nubanApiUrl}?acc_no=${accountNumber}`;
// "https://app.nuban.com.ng/api/YOUR-API-KEY?bank_code=3-digits-code&acc_no=10-digits-account-number";
//CATEGORIES
export const FETCH_CATEGORIES =  `order/categories`;
export const FETCH_CATEGORY = (categoryId) =>  `order/categories/${categoryId}`;
//GALLERY
export const UPLOAD_IMAGE =  `gallery/image/upload`;
export const LIST_IMAGES =  `gallery/image/list`;
export const SEARCH_IMAGES =  `gallery/image/search`;
export const DELETE_IMAGE =  `gallery/image/delete`;
//BASKET
export const CART =  `order/basket`;
export const ADD_TO_CART = `${CART}/add`;
export const SINGLE_CART_BY_PRODUCT = (productId) => `${CART}/product/${productId}`;
export const SINGLE_CART = (itemId) => `${CART}/${itemId}`;
//ORDER
export const MAKE_ORDER =  `order/make-order`;
export const ORDER =  `order/orders`;
export const SINGLE_ORDER = (orderId) => `${ORDER}/${orderId}`;
export const AGG_ORDER =  `aggregator/order/orders`;
export const SINGLE_AGG_ORDER = (orderId) => `${AGG_ORDER}/${orderId}`;
//MESSAGES
export const FOOD_MART_MSG =  `food_mart/messages`;
export const AGGREGATOR_MSG =  `aggregator/messages`;
export const FOOD_MART_UNREAD = `${FOOD_MART_MSG}/unread`;
export const AGGREGATOR_UNREAD = `${AGGREGATOR_MSG}/unread`;
export const FOOD_MART_CHAT = (chatId) => `${FOOD_MART_MSG}/chat/${chatId}`;
export const REPLY_FM_CHAT = (chatId) => `${FOOD_MART_MSG}/chat/${chatId}/reply`;
export const AGGREGATOR_CHAT = (chatId) => `${AGGREGATOR_MSG}/chat/${chatId}`;
export const REPLY_AGG_CHAT = (chatId) => `${AGGREGATOR_MSG}/chat/${chatId}/reply`;
export const FOOD_MART_CONTACTS = `${FOOD_MART_MSG}/contacts`;
export const AGGREGATOR_CONTACTS = `${AGGREGATOR_MSG}/contacts`;
//EARNINGS ENDPOINTS
export const AGGREGATOR_EARNINGS =  `aggregator/earnings`;
export const AGGREGATOR_COMMISSIONS = `${AGGREGATOR_EARNINGS}/commissions`;
export const EXPORT_AGG_COMMISSIONS = `${AGGREGATOR_EARNINGS}/export`;
//WITHDRAWAL ENDPOINTS
export const WITHDRAWAL =  `withdraw`;
export const WITHDRAWAL_HISTORY = `${WITHDRAWAL}/history`;
export const EXPORT_WITHDRAWALS = `${WITHDRAWAL}/export`;

class AppService  {
  //AVATAR
  updateAvatar = (avatarData) =>Request().post(UPDATE_AVATAR, avatarData);
  //PRODUCT SERVICES
  createAggProduct = (productData) =>Request().post(AGG_PRODUCTS, productData);
  updateProduct = (productId, productData) =>Request().patch(SINGLE_PRODUCT(productId), productData);
  updateAggProduct = (productId, productData) =>
   Request().patch(SINGLE_AGG_PRODUCT(productId), productData);
  fetchSingleProduct = (productId) =>Request().get(SINGLE_PRODUCT(productId));
  fetchSingleAggProduct = (productId) =>Request().get(SINGLE_AGG_PRODUCT(productId));
  fetchProducts = () =>Request().get(PRODUCTS);
  fetchRecentlyViewedProducts = () =>Request().get(RECENTLY_VIEWED_PRODUCTS);
  fetchAggProducts = () =>Request().get(AGG_PRODUCTS);
  fetchFilteredAggProducts = (status) =>Request().get(AGG_PRODUCTS, { params: { status } });
  deleteProduct = (productId) =>Request().delete(SINGLE_PRODUCT(productId));
  deleteAggProduct = (productId) =>Request().delete(SINGLE_AGG_PRODUCT(productId));
  publishAggProduct = (productId) =>Request().patch(PUBLISH_AGG_PRODUCT(productId));
  draftAggProduct = (productId) =>Request().patch(DRAFT_AGG_PRODUCT(productId));
  trashAggProduct = (productId) =>Request().patch(TRASH_AGG_PRODUCT(productId));
  restoreAggProduct = (productId) =>Request().patch(RESTORE_AGG_PRODUCT(productId));
  draftMultipleAggProducts = (productData) =>Request().patch(DRAFT_AGG_PRODUCTS, productData);
  deleteMultipleAggProducts = (productData) =>Request().patch(DELETE_AGG_PRODUCTS, productData);
  trashMultipleAggProducts = (productData) =>Request().patch(TRASH_AGG_PRODUCTS, productData);
  restoreMultipleAggProducts = (productData) =>Request().patch(RESTORE_AGG_PRODUCTS, productData);
  publishMultipleAggProducts = (productData) =>Request().patch(PUBLISH_AGG_PRODUCTS, productData);
  getAggProductsInfo = () =>Request().get(AGG_PRODUCTS_INFO);
  exportAggProducts = (status) =>Request().get(EXPORT_PRODUCTS, { params: { status } });
  //CATEGORIES
  fetchCategories = () =>Request().get(FETCH_CATEGORIES);
  //WISHLIST
  fetchWishes = () =>Request().get(WISHLIST);
  addToWishList = (productData) =>Request().post(ADD_TO_WISH, productData);
  removeFromWishList = (productId) =>Request().delete(SINGLE_WISH(productId));
  removeFromWishByProduct = (productId) =>Request().delete(WISH_BY_PRODUCT(productId));
  checkOnWishList = (productId) =>Request().get(WISH_ON_LIST(productId));
  //ADDRESS SERVICES
  fetchAddresses = (numPerPage = 10) =>
   Request().get(LIST_ADDRESSES, {
      params: {
        perPage: numPerPage,
      },
    });
  fetchSingleAddress = (addressId) =>Request().get(GET_ADDRESS(addressId));
  createAddress = (addressData) =>Request().post(CREATE_ADDRESS, addressData);
  updateAddress = (addressId, addressData) =>Request().patch(UPDATE_ADDRESS(addressId), addressData);
  deleteAddress = (addressId) =>Request().delete(DELETE_ADDRESS(addressId));
  //BANK ACCOUNT SERVICES
  createBankAccount = (accountData) =>Request().post(CREATE_BANK_ACCOUNT, accountData);
  fetchBankAccount = () =>Request().get(BANK_ACCOUNT);
  updateBankAccount = (accountData) =>Request().patch(BANK_ACCOUNT, accountData);
  //GALLERY
  uploadImage = (imageData) =>Request().post(UPLOAD_IMAGE, imageData);
  fetchImages = () =>Request().get(LIST_IMAGES);
  searchImages = (perPage, q) =>Request().get(SEARCH_IMAGES, {
    params: {
      perPage,
      q,
    },
  });
  deleteImage = (imageData) =>Request().delete(DELETE_IMAGE, { data: imageData });
  //BASKET
  addToBasket = (productData) =>Request().post(ADD_TO_CART, productData);
  fetchBasket = () =>Request().get(CART);
  removeFromCart = (cartId) =>Request().delete(SINGLE_CART(cartId));
  removeFromCartByProduct = (productId) =>Request().delete(SINGLE_CART_BY_PRODUCT(productId));
  //ORDER
  makeOrder = (passwordInfo) =>Request().post(MAKE_ORDER, passwordInfo);
  fetchOrders = () =>Request().get(ORDER);
  toggleOrder = (orderId, toggleInfo) =>Request().patch(SINGLE_ORDER(orderId), toggleInfo);
  fetchAggOrders = () =>Request().get(AGG_ORDER);
  toggleAggOrder = (orderId, toggleInfo) =>Request().patch(SINGLE_AGG_ORDER(orderId), toggleInfo);
  //MESSAGES
  fetchAggMessages = () =>Request().get(AGGREGATOR_MSG);
  fetchFoodmartMessages = () =>Request().get(FOOD_MART_MSG);
  fetchAggUnread = () =>Request().get(AGGREGATOR_UNREAD);
  fetchFoodmartUnread = () =>Request().get(FOOD_MART_UNREAD);
  startAggChat = (chatData) =>Request().post(AGGREGATOR_MSG, chatData);
  startFoodmartChat = (chatData) =>Request().post(FOOD_MART_MSG, chatData);
  fetchAggChatMessages = (chatId) =>Request().get(AGGREGATOR_CHAT(chatId));
  fetchFoodmartChatMessages = (chatId) =>Request().get(FOOD_MART_CHAT(chatId));
  replyAggChat = (chatId, chatData) =>Request().post(REPLY_AGG_CHAT(chatId), chatData);
  replyFoodmartChat = (chatId, chatData) =>Request().post(REPLY_FM_CHAT(chatId), chatData);
  fetchAggContacts = () =>Request().get(AGGREGATOR_CONTACTS);
  fetchFoodmartContacts = () =>Request().get(FOOD_MART_CONTACTS);
  //EARNINGS
  fetchAggEarnings = () =>Request().get(AGGREGATOR_EARNINGS);
  fetchAggCommissions = () =>Request().get(AGGREGATOR_COMMISSIONS);
  exportAggCommissions = () =>Request().get(EXPORT_AGG_COMMISSIONS);
  //WITHDRAWALS
  makeWithdrawal = (accountData) =>Request().post(WITHDRAWAL, accountData);
  fetchWithdrawals = (perPage) =>
   Request().get(WITHDRAWAL_HISTORY, { params: { perPage, }, });
  exportWithdrawals = () =>Request().get(EXPORT_WITHDRAWALS);
  getSlider = (page = 1, type='') =>Request().get(`slides?perPage=11&page=${page}${type && '&type='+ type}`);
}

export default new AppService();
