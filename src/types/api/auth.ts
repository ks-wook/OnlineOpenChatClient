
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
    /**
     * 결과
     */
    result : string
    
    /**
     * 유저 ID 값(UID)
     */
    userId : number;

    /**
     * 유저 닉네임
     */
    nickname : string
}