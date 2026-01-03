
/**
 * 로그인
 */
interface LoginRequest {
    /**
     * 로그인 요청할 id 값
     */
    loginId : string,

    /**
     * 계정 패스워드
     */
    password : string
}

interface LoginResponse {
    /**
     * 결과
     */
    result : string,
    
    /**
     * access Token
     */
    token : string,

    /**
     * 로그인된 유저 닉네임
     */
    nickname : string
}


/**
 * 회원가입
 */
interface CreateUserRequest {
    /**
     * 계정의 로그인용 ID
     */
    loginId : string,

    /**
     * 계정 패스워드
     */
    password : string
}

interface CreateUserResponse {
    /**
     * 결과
     */
    result : string;
    
    /**
     * 생성된 유저 닉네임
     */
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