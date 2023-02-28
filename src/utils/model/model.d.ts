// 登录对象
interface LoginRequest {
  userName: string
  passWord: string
  rememberMe: boolean
}
type KaType = Array<{ label: string; value: number }>
// 记账分类对象
interface Category {
  id: number
  payType: number
  categoryName: string
}
// 记账对象
interface Amount {
  categoryId: number
  amount: number
  remark: string
}
// 用户
interface User {
  userName: string
  avatar: string
  signature: string
}
// 定义数组的两种方式
type Foo = Array<string>
interface Bar {
  baz: Array<{ name: string; age: number }>
}
type Foo2 = string[]
interface Bar2 {
  baz: { name: string; age: number }[]
}
