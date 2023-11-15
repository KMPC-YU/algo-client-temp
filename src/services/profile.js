import { instance } from './index.js'

// 프로필 정보 조회
export function getProfileData(nickname) {
  return instance.get(`/api/v1/profiles/${nickname}`)
}

// 최근 게시글 조회
export function getLastPosts(nickname) {
  return instance.get(`/api/v1/profiles/${nickname}/posts`)
}

// 최근 댓글 조회
export function getLastComments(nickname) {
  return instance.get(`/api/v1/profiles/${nickname}/comments`)
}

// 프로필 정보 변경
// export function updateProfileData(nickname, newNickname, allergy) {
//   return instance.patch(`/api/v1/profiles/${nickname}`, {
//     nickname: newNickname,
//     allergy_type: allergy,
//   })
// }

// 프로필 이미지 변경
export function updateProfileImage(nickname) {
  return instance.patch(`/api/v1/profiles/${nickname}/change-profileImages`)
}

// 비밀번호 변경
export function changePassword(username, email, pw, pw2, authCode) {
  return instance.post(`api/v1/users/change-password`, {
      username: username,
      password: pw,
      password_confirm: pw2,
      email: email,
      code: authCode,
    })
}
