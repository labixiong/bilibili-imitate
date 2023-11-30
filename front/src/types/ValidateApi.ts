// 约束 navbar 列表接口
export interface ValidateNavbar {
  [propName: string]: any,
  readonly _id: string,
  title: string,
  side: string
}

// 约束 channel 频道列表接口
export interface ValidateChannel {
  [propName: string]: any,
  readonly _id: string,
  title: string,
  side: string
}
