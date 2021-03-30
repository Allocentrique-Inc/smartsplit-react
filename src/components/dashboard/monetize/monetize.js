import TopBar from './topBar/topBar';
import Copyright from './_/icons/copyright';
import Recording from './_/icons/recording';
import Performance from './_/icons/performance';

const Monetize = (props) => {
  const t_buyTitle = {
    fr: 'Bienvenue dans votre gestionnaire de monétisation.',
    en: 'Welcome into your monetization manager.',
  }[props.language];
  const t_buyDescription = {
    fr:
      'Connectez votre pièce musicale avec toutes les sociétés de gestion, d’un seul clic. Fini les tracas et les multiples connexions : retrouvez tout à la même place pour 5$ seulement.',
    en:
      'Connect your workpiece with all the managing societies with only one clic.  Stop breaking your neck : Find everything you need in one place for only 5$.',
  }[props.language];
  const t_buyAction = {
    fr: 'Acheter',
    en: 'Buy',
  }[props.language];
  const t_managingSocieties = {
    fr: 'Sociétés de gestion',
    en: 'Managing Societies',
  }[props.language];
  const t_socanTitle = {
    fr: 'SOCAN - Diffusion des oeuvres musicales',
    en: 'SOCAN - Diffusion of musical workpieces',
  }[props.language];
  const t_socanDesctiption = {
    fr: 'Société canadienne des auteurs, compositeurs et éditeurs de musique',
    en: 'Canadian society of music autor, composer and editor',
  }[props.language];
  const t_socanDrTitle = {
    fr: 'SOCAN DR - Reproduction des oeuvres musicales',
    en: 'SOCAN DR - Reproduction of musical workpiece',
  }[props.language];
  const t_socanDrDesctiption = {
    fr: 'Société canadienne des auteurs, compositeurs et éditeurs de musique',
    en: 'Canadian society of music autor, composer and editor',
  }[props.language];
  const t_soproqTitle = {
    fr: 'SOPROQ - Droit voisin des producteurs',
    en: 'SOPROQ - Neighbouring rights of productors',
  }[props.language];
  const t_soproqDesctiption = {
    fr:
      'Société de gestion collective des droits des producteurs de phonogrammes...',
    en: 'Canadian managing society of phonogram productions right...',
  }[props.language];
  const t_artistiTitle = {
    fr: 'Artisti - Droit voisin des interprètes',
    en: 'Artisti - Neighbouring rights of interpreters',
  }[props.language];
  const t_artistiDesctiption = {
    fr: 'Droits d’auteur - éxecution publique',
    en: 'Copyright - public execution',
  }[props.language];

  const t_connect = {
    fr: 'Connecter',
    en: 'Connect',
  }[props.language];

  // const shall get price from product in the DB
  const price = 5;

  const commonProps = {
    ...props,
  };
  return (
    <div className="monetize">
      <TopBar {...commonProps} />
      <div className="content">
        <div className="center">
          {/** BUY BLOCK */}
          <div className="buyBlock">
            <div className="bLeft">
              <div className="title">{t_buyTitle}</div>
              <div className="description">{t_buyDescription}</div>
              <div className="actionRow">
                <button className="btn-primary">{`${t_buyAction} ${price}$`}</button>
              </div>
            </div>
          </div>

          {/** MANAGING SOCIETIES */}
          <div className="managingSocieties">
            <div className="title">{t_managingSocieties}</div>

            {/** SOCAN */}
            <div className="society">
              <Copyright />
              <div className="text">
                <div className="title">{t_socanTitle}</div>
                <div className="description">{t_socanDesctiption}</div>
              </div>
              <button className="btn-primary action">{t_connect}</button>
            </div>

            {/** SOCANDR */}
            <div className="society">
              <Copyright />
              <div className="text">
                <div className="title">{t_socanDrTitle}</div>
                <div className="description">{t_socanDrDesctiption}</div>
              </div>
              <button className="btn-primary action">{t_connect}</button>
            </div>

            {/** SOPROQ */}
            <div className="society">
              <Recording />
              <div className="text">
                <div className="title">{t_soproqTitle}</div>
                <div className="description">{t_soproqDesctiption}</div>
              </div>
              <button className="btn-primary action">{t_connect}</button>
            </div>

            {/** ARTISTI */}
            <div className="society">
              <Performance />
              <div className="text">
                <div className="title">{t_artistiTitle}</div>
                <div className="description">{t_artistiDesctiption}</div>
              </div>
              <button className="btn-primary action">{t_connect}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monetize;
