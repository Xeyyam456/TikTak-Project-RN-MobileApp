import notifee, { AndroidImportance } from '@notifee/react-native';
import i18n from '../i18n/i18n';

const ORDERS_CHANNEL_ID = 'orders';

let channelReady: Promise<void> | undefined;

function ensureOrdersChannel(): Promise<void> {
  if (!channelReady) {
    channelReady = notifee
      .createChannel({
        id: ORDERS_CHANNEL_ID,
        name: i18n.t('notifications.channelName'),
        importance: AndroidImportance.HIGH,
      })
      .then(() => undefined);
  }
  return channelReady;
}

// Called once, right after a successful checkout — displays an immediate
// "order placed" confirmation. Silently does nothing if the user has denied notification permission
// (Android 13+ requires this at runtime); a declined permission here isn't
// an error state worth surfacing, the order still went through fine.
export async function notifyOrderPlaced(orderNumber: string): Promise<void> {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus < 1) return;

  await ensureOrdersChannel();

  await notifee.displayNotification({
    title: i18n.t('notifications.orderPlacedTitle'),
    body: i18n.t('notifications.orderPlacedBody', { orderNumber }),
    android: {
      channelId: ORDERS_CHANNEL_ID,
      smallIcon: 'ic_launcher',
      pressAction: { id: 'default' },
    },
  });
}
