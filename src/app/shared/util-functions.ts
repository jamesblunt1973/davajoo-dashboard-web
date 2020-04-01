export function AutoUnsubscribe(constructor) {

  const original = constructor.prototype.ngOnDestroy;

  constructor.prototype.ngOnDestroy = function () {
    //for (let prop in this) {
    //  const property = this[prop];
    //  if (Array.isArray(property) && property.length && property.every(item => typeof item.unsubscribe === "function")) {
    //    for (let sub of property) {
    //      sub.unsubscribe();
    //    }
    //    break;
    //  }
    //}
    if (this.subscriptions) {
      for (let sub of this.subscriptions) {
        sub.unsubscribe();
      }
    }
    original && typeof original === "function" && original.apply(this, arguments);
  };

}

export function calculateElapsed(str: string) {
    const date = new Date(str);
    const now = new Date().getTime();
    const milliseconds = date.getTime();
    var differ = now - milliseconds;
    var seconds = differ / 1000;
    if (seconds < 60)
      return seconds + ' ثانیه پیش';
    var minutes = Math.round(seconds / 60);
    if (minutes < 60)
      return minutes + ' دقیقه پیش';
    var hours = Math.round(minutes / 60);
    if (hours < 24)
      return hours + ' ساعت پیش';
    var remain = hours % 24;
    return Math.floor(hours / 24) + ' روز' + (remain > 0 ? ' و ' + remain + ' ساعت': '') + ' پیش';
  }
