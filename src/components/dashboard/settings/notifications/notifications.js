import { useEffect } from 'react';
import MultiSelect from '../../../_/form/multiSelect/multiSelect';
import Checkbox from '../../../_/form/checkbox/checkbox';

export default function Notifications(props) {
  const { notifications, setField, updateUser, translations, language } = props;
  const t_title = translations.titles._notifications[language];
  const t_fields = translations.fields;
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
      <h2>{t_title}</h2>
      <table>
        <thead>
          <tr>
            <th>{t_fields.notifications.types._name[language]}</th>
            <th>{t_fields.notifications.types._email[language]}</th>
            <th>{t_fields.notifications.types._mobile[language]}</th>
            <th>{t_fields.notifications.types._text[language]}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="title">
                {t_fields.notifications.generalInteractions._name[language]}
              </div>
              <div className="description">
                {
                  t_fields.notifications.generalInteractions._description[
                    language
                  ]
                }
              </div>
            </td>
            <td>
              <Checkbox
                checked={isNotificationSelected('generalInteractions', 'email')}
                onChange={() =>
                  toggleNotification('generalInteractions', 'email')
                }
                disabled
              />
            </td>
            <td>
              <Checkbox
                checked={isNotificationSelected('generalInteractions', 'push')}
                onChange={() =>
                  toggleNotification('generalInteractions', 'push')
                }
              />
            </td>
            <td>
              <Checkbox
                checked={isNotificationSelected('generalInteractions', 'sms')}
                onChange={() =>
                  toggleNotification('generalInteractions', 'sms')
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              {' '}
              <div className="title">
                {t_fields.notifications.administrativeMessages._name[language]}
              </div>
              <div className="description">
                {
                  t_fields.notifications.administrativeMessages._description[
                    language
                  ]
                }
              </div>
            </td>
            <td>
              <Checkbox
                checked={isNotificationSelected(
                  'administrativeMessages',
                  'email',
                )}
                onChange={() =>
                  toggleNotification('administrativeMessages', 'email')
                }
                disabled
              />
            </td>
            <td>
              <Checkbox
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
              <Checkbox
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
            <td>
              {' '}
              <div className="title">
                {t_fields.notifications.accountLogin._name[language]}
              </div>
              <div className="description">
                {t_fields.notifications.accountLogin._description[language]}
              </div>
            </td>
            <td>
              <Checkbox
                checked={isNotificationSelected('accountLogin', 'email')}
                onChange={() => toggleNotification('accountLogin', 'email')}
              />
            </td>
            <td>
              <Checkbox
                checked={isNotificationSelected('accountLogin', 'push')}
                onChange={() => toggleNotification('accountLogin', 'push')}
              />
            </td>
          </tr>
          <tr>
            <td>
              {' '}
              <div className="title">
                {t_fields.notifications.smartsplitBlog._name[language]}
              </div>
              <div className="description">
                {t_fields.notifications.smartsplitBlog._description[language]}
              </div>
            </td>
            <td>
              <Checkbox
                checked={isNotificationSelected('smartsplitBlog', 'email')}
                onChange={() => toggleNotification('smartsplitBlog', 'email')}
              />
            </td>
            <td>
              <Checkbox
                checked={isNotificationSelected('smartsplitBlog', 'push')}
                onChange={() => toggleNotification('smartsplitBlog', 'push')}
              />
            </td>
          </tr>
          <tr>
            <td>
              {' '}
              <div className="title">
                {t_fields.notifications.smartsplitPromotions._name[language]}
              </div>
              <div className="description">
                {
                  t_fields.notifications.smartsplitPromotions._description[
                    language
                  ]
                }
              </div>
            </td>
            <td>
              <Checkbox
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
              <Checkbox
                checked={isNotificationSelected('smartsplitPromotions', 'push')}
                onChange={() =>
                  toggleNotification('smartsplitPromotions', 'push')
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              {' '}
              <div className="title">
                {t_fields.notifications.partnerPromotions._name[language]}
              </div>
              <div className="description">
                {
                  t_fields.notifications.partnerPromotions._description[
                    language
                  ]
                }
              </div>
            </td>
            <td>
              <Checkbox
                checked={isNotificationSelected('partnerPromotions', 'email')}
                onChange={() =>
                  toggleNotification('partnerPromotions', 'email')
                }
              />
            </td>
            <td>
              <Checkbox
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
