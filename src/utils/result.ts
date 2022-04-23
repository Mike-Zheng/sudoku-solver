import { Recoverable } from "repl"

// 返回統一格式的接口數據類型定義
export function successResult<T = Recoverable>(result: T, { message = 'Request success' } = {}) {
    return {
        code: 200,
        result,
        message,
        status: 'ok'
    };
};
export function errorResult(message = 'Request failed', { code = -1, result = null } = {}) {
    return {
        code,
        result,
        message,
        status: 'fail'
    };
};

//返回分頁數據
export function pageSuccessResult<T = any>(
    page: number,
    pageSize: number,
    list: T[],
    { message = 'ok' } = {},
) {
    const pageData = pagination(page, pageSize, list);
    return {
        ...successResult({
            items: pageData,
            total: list.length
        }),
        message
    }
}

// 封裝分頁數據
export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
    const offset = (pageNo - 1) * Number(pageSize);
    const res =
        offset + Number(pageSize) >= array.length
            ? array.slice(offset, array.length)
            : array.slice(offset, offset + Number(pageSize));
    return res;
}

// 返回參數類型定義
export interface requestParams {
    method: string;
    body: any;
    headers?: { authorization?: string };
    query: any
}

/**
 * @name  getRequestToken
 * @description 通過request數據中獲取token，具體情況根據接口規範修改
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
    return headers?.authorization;
}