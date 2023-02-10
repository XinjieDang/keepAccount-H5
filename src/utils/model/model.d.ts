interface LoginRequest {
  userName: string
  passWord: string
  rememberMe: boolean
}
// interface KaType {
//    Array<{
//     label: string
//     value: number
//   }>
// }

type KaType = Array<{ label: string; value: number }>
interface Category {
  id: number
  payType: number
  categoryName: string
}

interface Amount {
  categoryId: number
  amount: number
  remark: string
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
