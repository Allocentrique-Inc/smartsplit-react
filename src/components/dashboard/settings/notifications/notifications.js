import { useEffect } from 'react';
import MultiSelect from '../../../_/form/multiSelect/multiSelect';

export default function Notifications(props) {
  const { notifications, setField, updateUser, ...nextProps } = props;
  const isNotificationSelected = (type, value) =>
    notifications[type].includes(value);
  const toggleNotification = (type, value) => {
    const index = notifications[type].indexOf(value);
    if (index === -1) {
      notifications[type].push(value);
    } else {
      notifications[type].splice(index, 1);
    }
    setField('notifications', {
      ...notifications,
      [type]: notifications[type],
    });
    updateUser();
  };
  useEffect(() => updateUser());
  return (
    <div className="notifications" id="notifications">
      <h2>Notifications</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Courriel</th>
            <th>Mobile</th>
            <th>Texto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Interactions Générales</td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('generalInteractions', 'email')}
                onChange={() =>
                  toggleNotification('generalInteractions', 'email')
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('generalInteractions', 'push')}
                onChange={() =>
                  toggleNotification('generalInteractions', 'push')
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('generalInteractions', 'sms')}
                onChange={() =>
                  toggleNotification('generalInteractions', 'sms')
                }
              />
            </td>
          </tr>
          <tr>
            <td>Messages administratifs</td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected(
                  'administrativeMessages',
                  'email',
                )}
                onChange={() =>
                  toggleNotification('administrativeMessages', 'email')
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected(
                  'administrativeMessages',
                  'push',
                )}
                onChange={() =>
                  toggleNotification('administrativeMessages', 'push')
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected(
                  'administrativeMessages',
                  'sms',
                )}
                onChange={() =>
                  toggleNotification('administrativeMessages', 'sms')
                }
              />
            </td>
          </tr>
          <tr>
            <td>Connexion au compte</td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('accountLogin', 'email')}
                onChange={() => toggleNotification('accountLogin', 'email')}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('accountLogin', 'push')}
                onChange={() => toggleNotification('accountLogin', 'push')}
              />
            </td>
          </tr>
          <tr>
            <td>Blogue de Smartsplit</td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('smartsplitBlog', 'email')}
                onChange={() => toggleNotification('smartsplitBlog', 'email')}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('smartsplitBlog', 'push')}
                onChange={() => toggleNotification('smartsplitBlog', 'push')}
              />
            </td>
          </tr>
          <tr>
            <td>Promotions Smartsplit</td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected(
                  'smartsplitPromotions',
                  'email',
                )}
                onChange={() =>
                  toggleNotification('smartsplitPromotions', 'email')
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('smartsplitPromotions', 'push')}
                onChange={() =>
                  toggleNotification('smartsplitPromotions', 'push')
                }
              />
            </td>
          </tr>
          <tr>
            <td>Promotions partenaires</td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('partnerPromotions', 'email')}
                onChange={() =>
                  toggleNotification('partnerPromotions', 'email')
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={isNotificationSelected('partnerPromotions', 'push')}
                onChange={() => toggleNotification('partnerPromotions', 'push')}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
