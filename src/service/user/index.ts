interface urlType {
  userInfoUrl: string
  updateUserUrl: string
  fileUploadUrl: string
}

const url: urlType = {
  userInfoUrl: '/user/getUserInfo',
  updateUserUrl: '/user/updateUserInfo',
  fileUploadUrl: '/file/upload',
}

export default url
