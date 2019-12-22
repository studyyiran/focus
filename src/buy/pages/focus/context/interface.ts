export interface IListItem {
  content: string;
  tag: string;
  _id: string;
  hidden: boolean;
  createTime: string;
  finishDate: string;
  status: string;
  planStartTime: string;
}

export interface ITodayTodo {
  plane: IListItem[];
  review: IListItem[];
  delay: IListItem[];
  tomorrow: IListItem[];
}

export interface ITodoItem {
  content: string;
  tag: string;
  timeType?: string;
  _id: string;
}

export interface IHistoryFilter {
  tag?: string;
  timeTarget?: string;
  timeRangeInfo: {
    start: number,
    end: number
  }; // 'today' 'lastweek'
  hidden?: boolean; // 'today' 'lastweek'
}