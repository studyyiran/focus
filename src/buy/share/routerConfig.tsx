import BuyHome from "../pages/home/buy-home";
import OrderRouter from "../pages/order/orderRouter";
import ProductList from "../pages/productList";
import { productListSsrRule } from "../pages/productList/ssr";
import ProductDetail from "../pages/detail";
import UptradeProtect from "../pages/statics/uptrade-protect";
import UptradePolicy from "../pages/statics/policy";
import Home from "../pages/home";
import React from "react";
import { getLocationUrl, getProductListPath } from "../common/utils/util";
import { detailSsrRule } from "../pages/detail/ssr";
import { ourHomeSsrRule } from "../pages/home/ssr";
import BuyCheckOrder from "../pages/checkOrder/routers";
import DetailPreviewWrapper from "../pages/detail/detailPreviewWrapper";
import PersonalLogin from "../pages/personal/pages/login";
import AccountPage from "../pages/personal/pages/account";
import UserRegister from "../pages/personal/pages/register";
import UserRegisterEmail from "../pages/personal/pages/registerEmail";
import UserForgetPassword from "../pages/personal/pages/userForgetPassword";
import UserResetPassword from "../pages/personal/pages/userResetPassword";
import { FocusRouter } from "../pages/focus";

export const routerConfig = [
  {
    path: "/focus",
    exact: true,
    title: "Buy Used Cell Phones | UpTradeit.com",
    Component: FocusRouter
  },
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
