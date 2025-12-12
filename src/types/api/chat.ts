
/**
 * 채팅방 생성 요청
 */
export interface CreateRoomRequest {
    /**
     * 채팅방 명
     */
    roomName : string,

    /**
     * 참여자 명단(초대한 유저들)
     */
    participants : string[]
}

export interface CreateRoomResponse {
    /**
     * 결과
     */
    result : string,

    /**
     * 채팅방 명
     */
    roomName : string,

    /**
     * 생성된 채탕방 id 값
     */
    roomId : number;
}