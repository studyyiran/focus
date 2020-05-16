import React, { useContext, useEffect } from "react";
import "./index.less";
import { tagArr } from "../../config/tagArrConfig";
import { IListItem } from "../../context/interface";
import moment from "moment";

interface ITodoLine extends IListItem {
  onClickButton1?: any;
  haveDone?: boolean;

  todoFinishDate?: string;
  todoPlanStartTime?: string;
  todoRelateTargetTime?: string;
  todoCreateTime?: string;
}

export function TodoLine(props: ITodoLine) {
  const {
    tag,
    content,
    onClickButton1,
    _id,
    createTime,
    finishDate,
    planStartTime,
    haveDone,
    relatedTargetName,

    todoFinishDate,
    todoPlanStartTime,
    todoRelateTargetTime,
    todoCreateTime
  } = props;
  const findTarget = (tagArr as any).find((tagItem: any) => {
    return tagItem.value === tag;
  });
  // 这部的目的是？
  const tagName = findTarget ? findTarget.name : tag;

  function returnFormatTime(time?: string) {
    moment.locale('fr', {
      months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
      monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
      weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
      weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
      monthsParseExact : true,
      weekdaysParseExact : true,
      longDateFormat : {
        LT : 'Ah点mm分',
        LTS : 'Ah点m分s秒',
        L : 'YYYY-MM-DD',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日Ah点mm分',
        LLLL : 'YYYY年MMMD日ddddAh点mm分',
        l : 'YYYY-MM-DD',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日Ah点mm分',
        llll : 'YYYY年MMMD日ddddAh点mm分'
      },
      calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
      },
      relativeTime : {
        future : '%s内',
        past : '%s前',
        s : '几秒',
        m : '1 分钟',
        mm : '%d 分钟',
        h : '1 小时',
        hh : '%d 小时',
        d : '1 天',
        dd : '%d 天',
        M : '1 个月',
        MM : '%d 个月',
        y : '1 年',
        yy : '%d 年'
      },
      dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
      ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
      },
      meridiemParse : /PD|MD/,
      isPM : function (input) {
        return input.charAt(0) === 'M';
      },
      // 如果子午线单位未在12左右分开，则实现此函数（以 locale/id.js 为例）。
      // meridiemHour : function (hour, meridiem) {
      //     return /* 0-23 小时，给定的子午线令牌和 1-12小时 */ ;
      // },
      meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
      },
      week : {
        dow : 1, // 星期一是一周的第一天。
        doy : 4  // 用于判断一年中的第一周。
      }
    });
    return moment(time).calendar(moment(), {
      sameDay: "[今天]",
      nextDay: "[明天]",
      nextWeek: "[下个] dddd",
      lastDay: "[昨天]",
      // lastWeek: "[上个] dddd",
      lastWeek: "dddd",
      // lastWeek: "MM/DD",
      sameElse: "DD/MM/YYYY"
    });
  }
  function moreContent(content: string) {
    let string = "";
    for (let i = 0; i < 1; i++) {
      string += content;
    }
    return string;
  }

  function calcTime() {
    if (todoRelateTargetTime) {
      return returnFormatTime(
        todoFinishDate ||
          todoPlanStartTime ||
          todoRelateTargetTime ||
          todoCreateTime
      );
    } else {
      return returnFormatTime(finishDate || planStartTime || createTime);
    }
  }

  return (
    <div className={`l-task-bg todo-line ${haveDone ? "task-checked" : ""}`}>
      <div className="left">
        <input
          checked={haveDone ? true : false}
          className="checkbox-button"
          type="checkbox"
          onChange={() => {
            onClickButton1 && onClickButton1(_id);
          }}
        />
        <p>{moreContent(content)}</p>
      </div>
      <div className="right">
        <div className="tag-container">{tagName}</div>
        <div className="target-container">{relatedTargetName}</div>
        <div className="date">{calcTime()}</div>
      </div>
    </div>
  );
}
