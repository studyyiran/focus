import moment from "moment";

export function todayPageFilter(data: any) {
  const jsonWithFilterData = {
    plane: [],// 今日
    review: [],// 今日复习
    delay: [],// delay
    tomorrow: []// 明日
  } as any;
  data.forEach((item: any) => {
    const { tag } = item;
    let isToday = false;
    if (item && item.planStartTime) {
      // 开始时间是今天,那就是今日
      isToday = moment(item.planStartTime).isSame(moment(), "day");
    }
    if (!isToday) {
      if (moment(item.planStartTime).isSame(moment().add(1, "days"), "day")) {
        // 如果是明天的
        jsonWithFilterData.tomorrow.push(item);
      } else {
        // 如果已经不是当日的.扔到delay
        jsonWithFilterData.delay.push(item);
      }
      return;
    }
    switch (tag) {
      case "review":
        jsonWithFilterData.review.push(item);
        break;
      default:
        jsonWithFilterData.plane.push(item);
    }
  });
  return jsonWithFilterData;
}

export function decoratorTomorrow(data: any) {
  return { timeType: "tomorrow", ...data };
}

export function decoratorToday(data: any) {
  return { timeType: "today", ...data };
}

export function decoratorFinish(data: any) {
  return { ...data, status: "finish" };
}

export function decoratorTagReview(data: any) {
  return { ...data, tag: "review" };
}
