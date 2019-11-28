import moment from "moment";

export function todayPageFilter(data: any) {
  const jsonWithFilterData = {
    review: [],
    plane: [],
    delay: []
  } as any;
  data.forEach((item: any) => {
    const { tag } = item;
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

export function decoratorToday(data: any) {
  return { planStartTime: moment(), ...data };
}
