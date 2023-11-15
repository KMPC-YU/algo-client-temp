import { instance } from './index.js'

// 아이디 중복확인
export function usernameDuplicateCheck(username) {
    return instance.get(`/api/v1/users/check-username?username=${username}`)
}

// 이메일 중복확인
export function emailDuplicateCheck(email) {
    return instance.get(`/api/v1/users/check-email?email=${email}`)
}

// 이메일 인증코드 요청
export function sendVerifyEmailCode(email, username) {
    return instance.post('/api/v1/users/emails', {
        email: email,
        username: username,
    })
}

// 이메일 인증코드 검증
export function verifyEmailCode(email, code) {
    return instance.post('/api/v1/users/validate', {
        email: email,
        code: code,
    })
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