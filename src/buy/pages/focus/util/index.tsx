import moment from "moment";

export function todayPageFilter(data: any) {
  const jsonWithFilterData = {
    review: [],
    plane: [],
    delay: []
  } as any;
  data.forEach((item: any) => {
    const { tag } = item;
    let isToday = false;
    if (item && item.planStartTime) {
      isToday = moment(item.planStartTime).isSame(moment(), "day");
    }
    // 如果已经不是当日的.扔到delay
    if (!isToday) {
      jsonWithFilterData.delay.push(item);
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
  return { planStartTime: moment().add(1, 'days'), ...data };
}

export function decoratorToday(data: any) {
  return { planStartTime: moment(), ...data };
}

export function decoratorFinish(data: any) {
  return { ...data, status: "finish" };
}
