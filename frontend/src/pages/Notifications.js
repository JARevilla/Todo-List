import React, { useEffect } from 'react';
import { notification } from 'antd';  // Importing the Ant Design notification component
import { getNotifications, markNotificationAsRead } from "../services/taskService";

const Notifications = () => {
  
  useEffect(() => {
    const token = localStorage.getItem('auth_token');  // Ensure token consistency
  
    if (token) {
      getNotifications()
        .then((data) => {
          console.log('Fetched Notifications:', data);  // Log the data
          data.forEach(notificationData => {
            console.log("Notification ID: ", notificationData.id);
            notification.open({
              message: notificationData.message || 'New Notification',
              description: notificationData.message || 'You have a new notification.',
              placement: 'topRight',
              duration: 10,
              onClick: () => handleNotificationClick(notificationData.id),
            });
          });
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error);
        });
    } else {
      console.log('No token found, cannot fetch notifications');
    }
  }, []);

  const handleNotificationClick = (notificationId) => {
    console.log("Notification ID clicked: ", notificationId); // Log to verify ID

    if (!notificationId) {
      console.error('Notification ID is missing!');
      return;
    }
  
    markNotificationAsRead(notificationId)
    .then((data) => {
      console.log('Notification marked as read', data);
    })
    .catch((error) => {
      console.error('Error marking notification as read:', error);
    });
  };

  return (
    <div>
      {/* You can choose to display additional UI here if necessary */}
    </div>
  );
};

export default Notifications;


// import React, { useEffect } from 'react';
// import { notification } from 'antd';
// import { getNotifications, markNotificationAsRead } from '../services/taskService';

// const Notifications = () => {

//   useEffect(() => {
//     const token = localStorage.getItem('auth_token');

//     if (token) {
//       getNotifications()
//         .then((data) => {
//           console.log('Fetched Notifications:', data);  // Log the data
//           console.log(notificationData.id);
//           data.forEach((notificationData) => {
//             notification.open({
//               message: notificationData.message || 'New Notification',
//               description: notificationData.message || 'You have a new notification.',
//               placement: 'topRight',
//               duration: 10,
//               onClick: () => handleNotificationClick(notificationData.id),
//             });
//           });
//         })
//         .catch((error) => {
//           console.error('Error fetching notifications:', error);
//         });
//     } else {
//       console.log('No token found, cannot fetch notifications');
//     }
//   }, []);

//   const handleNotificationClick = (notificationId) => {
//     markNotificationAsRead(notificationId)
//       .then((data) => {
//         console.log('Notification marked as read', data);
//       })
//       .catch((error) => {
//         console.error('Error marking notification as read:', error);
//       });
//   };

//   return <div></div>;
// };

// export default Notifications;
