import { FocusToday } from "../pages/today";
import { TodayDone } from "../pages/todayDone";
import { HistoryPage } from "../pages/history";
import { WishList } from "../pages/pool";

export const routerConfig = [
  {
    path: "/today",
    exact: true,
    title: "Focus Today",
    component: FocusToday
  },
  {
    path: "/done",
    exact: true,
    title: "Done",
    component: TodayDone
  },
  {
    path: "/history",
    exact: true,
    title: "History",
    component: HistoryPage
  },
  {
    path: "/wish-list",
    exact: true,
    title: "wishList",
    component: WishList
  }
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
