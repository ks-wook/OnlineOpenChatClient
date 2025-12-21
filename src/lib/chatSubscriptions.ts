// src/lib/chatSubscriptions.ts
import * as StompJs from "@stomp/stompjs";

export type ChatMessageHandler = (payload: any) => void;
export type NotificationHandler = (payload: any) => void;

export class ChatSubscriptionManager {
  private client: StompJs.Client;

  private activeChatRoomId: number | null = null;
  private chatSubscription: StompJs.StompSubscription | null = null;
  private notificationSubscription: StompJs.StompSubscription | null = null;

  constructor(client: StompJs.Client) {
    this.client = client;
  }

  /* ------------------ 알림 채널 ------------------ */

  subscribeNotification(userId: number | undefined, handler: NotificationHandler) {
    if (this.notificationSubscription) return;

    this.notificationSubscription = this.client.subscribe(
      `/sub/notification/${userId}`,
      (frame) => handler(JSON.parse(frame.body))
    );
  }

  /* ------------------ 채팅방 (단일 active) ------------------ */

  subscribeChatRoom(roomId: number, handler: ChatMessageHandler) {
    // 이미 같은 방이면 무시
    if (this.activeChatRoomId === roomId) return;

    // 기존 방 구독 해제
    this.chatSubscription?.unsubscribe();

    this.chatSubscription = this.client.subscribe(
      `/sub/chat/${roomId}`,
      (frame) => handler(JSON.parse(frame.body))
    );

    this.activeChatRoomId = roomId;
  }

  unsubscribeChatRoom() {
    this.chatSubscription?.unsubscribe();
    this.chatSubscription = null;
    this.activeChatRoomId = null;
  }

  disconnectAll() {
    this.unsubscribeChatRoom();
    this.notificationSubscription?.unsubscribe();
    this.notificationSubscription = null;
  }
}
