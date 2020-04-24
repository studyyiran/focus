import { FocusToday } from "../pages/today";
import { TodayDone } from "../pages/todayDone";
import { HistoryPage } from "../pages/history";
import { WishList } from "../pages/wishList";
import { TargetInfoPage } from "../pages/targetPage";
import { TaiTan } from "../pages/taitan";
import {TreePage} from "../pages/tree";

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
  },
  {
    path: "/target-info",
    exact: true,
    title: "target-info",
    component: TargetInfoPage
  },
  {
    path: "/tree",
    exact: true,
    title: "growth of tree",
    component: TreePage
  },
  {
    path: "/game-taitan",
    exact: true,
    title: "game-taitan",
    component: TaiTan
  }
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
