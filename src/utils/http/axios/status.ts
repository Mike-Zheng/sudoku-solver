export const showMessage = (status: number | string): string => {
  let message = ''
  switch (status) {
    case 400:
      message = '請求錯誤(400)'
      break
    case 401:
      message = '未授權，請重新登錄(401)'
      break
    case 403:
      message = '拒絕訪問(403)'
      break
    case 404:
      message = '請求出錯(404)'
      break
    case 408:
      message = '請求超時(408)'
      break
    case 500:
      message = '服務器錯誤(500)'
      break
    case 501:
      message = '服務未實現(501)'
      break
    case 502:
      message = '網絡錯誤(502)'
      break
    case 503:
      message = '服務不可用(503)'
      break
    case 504:
      message = '網絡超時(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `連接出錯(${status})!`
  }
  return `${message}，請檢查網絡或聯系管理員！`
}
