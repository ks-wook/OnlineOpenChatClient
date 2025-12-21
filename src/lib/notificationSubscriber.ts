// src/lib/notificationSubscriber.ts
import * as StompJs from "@stomp/stompjs";

export type NotificationMessageCallback = (
  message: StompJs.IFrame
) => void;

/**
 * 알림 채널 구독
 */
export const subscribeNotificationChannel = (
  client: StompJs.Client,
  myId: number | undefined,
  onMessage: NotificationMessageCallback
) => {
  console.log("[subscribe] 알림 채널 구독 요청 전송");

  return client.subscribe(
    `/sub/notification/${myId}`,
    (receivedMessage: StompJs.IFrame) => {
      onMessage(receivedMessage);
    }
  );
};
