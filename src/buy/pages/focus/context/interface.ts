export interface IListItem {
  content: string;
  tag: string;
  _id: string;
  hidden: boolean;
}

export interface ITodayTodo {
  plane: IListItem[];
  review: IListItem[];
  delay: IListItem[];
  tomorrow: IListItem[];
}
