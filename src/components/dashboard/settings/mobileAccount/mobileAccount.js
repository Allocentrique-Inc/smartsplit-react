import Tabs, { Tab } from '../../_/tabs/tabs';
import Account from '../account/account';
import ProfessionalIdentity from '../professionalIdentity/professionalIdentity';

export default function MobileAccount(props) {
  const { translations, language } = props;
  const tabNames = [
    translations.settings.mobileAccount._accountInformations[language],
    translations.settings.mobileAccount._professionalIdentity[language],
  ];
  return (
    <div className="mobileAccount">
      <Tabs options={tabNames}>
        <Tab key={tabNames[0]}>
          <Account {...props} />
        </Tab>
        <Tab key={tabNames[1]}>
          <ProfessionalIdentity {...props} />
        </Tab>
      </Tabs>
    </div>
  );
}
