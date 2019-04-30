// @flow
import firebase from 'react-native-firebase';
import configureStore from '../redux/store/ConfigureStore';
export const store = configureStore();
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

import { showPushNotification } from '../redux/modules/Feed';

export default async (message: RemoteMessage) => {
    store.dispatch(showPushNotification(message));

    // initiate channel
    const channel = new firebase.notifications.Android.Channel('Movez', 'Movez', firebase.notifications.Android.Importance.Max) // channelId, Name, Importance
    .setDescription('Movez, Inc Notification');

    // Create the channel
    firebase.notifications().android.createChannel(channel);

    // setup for displaying notification
    const notification = new firebase.notifications.Notification()
        .setNotificationId('Movez')
        .setTitle(message.data.title)
        .setBody(message.data.body)
        .android.setChannelId('Movez')
        .android.setSmallIcon('ic_launcher')
        .android.setPriority(firebase.notifications.Android.Priority.High);

    // display notification in tray
    firebase.notifications().displayNotification(notification);

    return Promise.resolve(message);
}