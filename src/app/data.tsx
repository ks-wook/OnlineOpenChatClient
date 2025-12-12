// export const userData = [];

export const loggedInUserData = {
  id: 5,
  avatar: "/LoggedInUser.jpg",
  name: "Jakob Hoeg",
};

export type LoggedInUserData = typeof loggedInUserData;

/**
 * 메시지 형태 (Deprecated)
 */
export interface Message {
  to: string;
  from: string;
  message: string;
}

/**
 * 메시지 형태2
 */
export interface Message2 {
  roomId: string; // 방 번호
  senderUserId: string; // 보낸이의 아이디(닉네임)
  message: string; // 메시지 내용
}


export type User = {
  messages: Message[];
  name: string;
};


/**
 * 채팅방 데이터 형식
 */

export interface Room {
  /**
   * 방 ID
   */
  id : number;

  /**
   * 채팅방명
   */
  name : string
}

/**
 * 친구 데이터 형식
 */
export interface Friend {
  /**
   * table의 ID 값
   */
  id : number;

  /**
   * 유저 닉네임
   */
  nickname : string;
}