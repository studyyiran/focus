import { FocusToday } from "../pages/today";
import { TodayDone } from "../pages/todayDone";

export const routerConfig = [
  {
    path: "/today",
    exact: true,
    title: "Buy Used Cell Phones | UpTradeit.com",
    component: FocusToday
  },
  {
    path: "/done",
    exact: true,
    title: "Buy Used Cell Phones | UpTradeit.com",
    component: TodayDone
  }
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
