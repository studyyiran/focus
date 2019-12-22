import { useCallback } from "react";
//
// export default function useReducerMiddleware(...arg: any[]) {
//   let finalReducer = (func: any) => {
//     return func;
//   };
//   arg.forEach((currentReducer: any) => {
//     finalReducer = finalReducer(currentReducer);
//   });
//   return finalReducer;
// }

export default function useReducerMiddleware<T>(arg: T): T {
  return arg
}
