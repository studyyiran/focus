export function MyTimer({
  time,
  stopTime,
  runCallBack,
  finishCallBack,
  onlyStartTime,
  minInterval
}: any) {
  // @ts-ignore
  const that: any = this as any;
  that.minInterval = minInterval || 1000;
  that.status = "stop";
  if (that.minInterval > 0) {
    that.stopTime = stopTime || true;
  } else if (that.minInterval < 0) {
    that.stopTime = stopTime || 0;
  }
  that.startTime = Date.now();
  that.currentTime = Math.abs(time);
  that.onlyStartTime = onlyStartTime ? Math.abs(onlyStartTime) : null;
  that.timeIntervalId = undefined;
  that.finishCallBack = finishCallBack;
  that.runCallBack = runCallBack;
  // 自动start
  that.start();
}

MyTimer.prototype.start = function() {
  if (this.status === "stop") {
    this.status = "start";
    this.perSecondCall(true);
    this.timeIntervalId = window.setInterval(() => {
      this.perSecondCall();
    }, Math.abs(this.minInterval));
  }
};

MyTimer.prototype.stop = function() {
  window.clearInterval(this.timeIntervalId);
};

MyTimer.prototype.perSecondCall = function(firstCall: any) {
  // 这行代码感觉多余
  if (false) {
    this.runCallBack &&
      this.runCallBack(this.format(this.currentTime), this.currentTime);
  } else if (
    // 如果还有剩余
    Math.abs(Math.abs(this.currentTime) - Math.abs(this.stopTime)) >=
      Math.abs(this.minInterval) ||
    this.stopTime === true
  ) {
    if (this.onlyStartTime) {
      // 四舍五入是为了确保计算的误差不会有影响
      // 使用Date计算是为了避免timer被kill影响计时结果
      this.currentTime =
        this.onlyStartTime +
        Number(
          (
            ((this.minInterval / Math.abs(this.minInterval)) *
              (Date.now() - this.startTime)) /
            1000
          ).toFixed(0)
        ) *
          1000;
    } else {
      this.currentTime = this.currentTime + this.minInterval;
    }
    this.runCallBack &&
      this.runCallBack(this.format(this.currentTime), this.currentTime);
  } else {
    if (this.timeIntervalId) {
      this.stop();
    }
    this.finishCallBack && this.finishCallBack(this.currentTime);
  }
};

MyTimer.prototype.format = function(second: any) {
  // d h m push(s)
  const timer = [24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000];
  timer.push(Math.abs(this.minInterval));
  let lastTime = second;
  let arr = timer.map(unit => {
    unit = Math.abs(unit);
    let result = Math.floor(lastTime / unit);
    lastTime = lastTime - result * unit;
    if (result > 9) {
      return String(result);
    } else if (result > 0) {
      return "0" + result;
    } else {
      // 补位用两个
      return "00";
    }
  });
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "00") {
      // 如果上一位也是空的话
      if (i === 0 || newArr[i - 1] === "") {
        newArr.push("");
      } else {
        newArr.push(arr[i]);
      }
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};
