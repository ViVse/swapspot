import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification/Notification";
import {
  deleteAll,
  deleteNotification,
  readNotifications,
} from "../../store/notification-actions";
import { Button } from "flowbite-react";

const Notifications = () => {
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readNotifications());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteNotification(id));
  };

  const deleteAllHandler = () => {
    dispatch(deleteAll());
  };

  return (
    <section className="container mx-auto px-4 mb-20">
      <h1 className="font-bold text-3xl">Сповіщення</h1>
      {notifications.length === 0 && (
        <p className="mt-2">Немає нових сповіщень</p>
      )}
      {notifications.length > 0 && (
        <>
          <Button color="failure" className="mt-3" onClick={deleteAllHandler}>
            Видалити всі
          </Button>
          <div className="mt-3">
            {notifications.map((n) => (
              <Notification
                className="mt-2"
                key={n._id}
                title={n.title}
                text={n.text}
                link={n.link}
                onDelete={deleteHandler.bind(null, n._id)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Notifications;
