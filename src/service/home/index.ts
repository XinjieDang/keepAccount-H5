interface urlType {
  loginUrl: string
  categoryUrl: string
  addAmountUrl: string
  amountInfoUrl: string
}

const url: urlType = {
  loginUrl: '/user/login',
  categoryUrl: '/category/find',
  addAmountUrl: '/amount/add',
  amountInfoUrl: '/amount/find',
}

export default url
