export interface RequestOptions {
  // Whether to process the request result
  isTransformResponse?: boolean
}

// 返回res.data的interface
export interface IResponse<T = any> {
  code: number | string
  result: T
  message: string
  status: string | number
}

/**用戶登錄 */
export interface ILogin {
  /** 賬戶名稱 */
  username: string
  /** 賬戶密碼 */
  password: string
}
