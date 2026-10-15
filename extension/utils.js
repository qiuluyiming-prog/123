(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.DownloadManagerUtils = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function formatBytes(bytes) {
    const value = Number(bytes) || 0;
    if (value < 1024) return `${Math.max(0, Math.round(value))} B`;
    const units = ['KB', 'MB', 'GB', 'TB'];
    let amount = value;
    let index = -1;
    do {
      amount /= 1024;
      index += 1;
    } while (amount >= 1024 && index < units.length - 1);
    const rounded = amount >= 100 ? Math.round(amount) : Math.round(amount * 10) / 10;
    return `${rounded} ${units[index]}`;
  }

  function progressPercent(bytesReceived, totalBytes) {
    const received = Number(bytesReceived) || 0;
    const total = Number(totalBytes) || 0;
    if (total <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round((received / total) * 100)));
  }

  function statusLabel(state) {
    return ({
      in_progress: '下载中',
      complete: '已完成',
      interrupted: '已中断',
    })[state] || '未知状态';
  }

  function isDownloadActionable(state) {
    return state === 'in_progress' || state === 'interrupted';
  }

  return { formatBytes, progressPercent, statusLabel, isDownloadActionable };
});
