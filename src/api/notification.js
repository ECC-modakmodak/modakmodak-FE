import { api } from '../lib/api';

// 알림 목록 조회
export async function getNotifications() {
  try {
    const res = await api.get('/api/notifications', {
      headers: { 'X-User-Id': localStorage.getItem('myId') },
    });
    return res.data.notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

// 알림 읽음 처리
export async function markNotificationAsRead(notificationId) {
  try {
    const res = await api.patch(
      `/api/notifications/${notificationId}/read`,
      {},
      {
        headers: { 'X-User-Id': localStorage.getItem('myId') },
      },
    );
    return res.data.message;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

// 미열람 알림 개수 조회
export async function getUnreadNotificationCount() {
  try {
    const res = await api.get('/api/notifications/unread-count', {
      headers: { 'X-User-Id': localStorage.getItem('myId') },
    });
    console.log('미열람 알림 개수 API 응답: ', res.data);
    return res.data.unreadCount;
  } catch (error) {
    console.error('Error fetching unread notification count:', error);
    throw error;
  }
}
