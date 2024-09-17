import {
  AuthApi,
  CartsApi,
  CategoriesApi,
  DeliveryMethodsApi,
  OrdersApi,
  PagesApi,
  PaymentMethodsApi,
  ProductRatingsApi,
  ProductsApi,
  ReturnsApi,
  SettingsApi,
  UsersApi,
  WishlistsApi,
} from './client';
import { configuration } from './config/configuration';
export * from './client';

const authApi = new AuthApi(configuration);
const settingsApi = new SettingsApi(configuration);
const pagesApi = new PagesApi(configuration);
const usersApi = new UsersApi(configuration);
const categoriesApi = new CategoriesApi(configuration);
const productsApi = new ProductsApi(configuration);
const productRatingsApi = new ProductRatingsApi(configuration);
const cartsApi = new CartsApi(configuration);
const deliveryMethodsApi = new DeliveryMethodsApi(configuration);
const paymentMethodsApi = new PaymentMethodsApi(configuration);
const ordersApi = new OrdersApi(configuration);
const returnsApi = new ReturnsApi(configuration);
const wishlistsApi = new WishlistsApi(configuration);

export {
  authApi,
  settingsApi,
  pagesApi,
  usersApi,
  categoriesApi,
  productsApi,
  productRatingsApi,
  cartsApi,
  deliveryMethodsApi,
  paymentMethodsApi,
  ordersApi,
  returnsApi,
  wishlistsApi,
};
