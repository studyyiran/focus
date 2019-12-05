import { FocusToday } from "../pages/today";
import { TodayDone } from "../pages/todayDone";
import { HistoryPage } from "../pages/history";

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
    path: "/pool",
    exact: true,
    title: "Pool任务池",
    component: HistoryPage
  }
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
