
/**
 * 로그인
 */
interface LoginRequest {
    name : string,
    password : string
}

interface LoginResponse {
    token : string,
    nickname : string
}


/**
 * 회원가입
 */
interface CreateUserRequest {
    name : string,
    password : string
}

interface CreateUserResponse {
    nickname : string
}

/**
 * 내 정보조회 : /get-my-info
 */
interface GetMyInfoResponse {
    nickname : string
}