export interface IListItem {
  content: string;
  tag: string;
  _id: string;
  hidden: boolean;
  createTime: string;
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