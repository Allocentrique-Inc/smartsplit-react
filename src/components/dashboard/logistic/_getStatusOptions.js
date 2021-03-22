export default (props) => [
  {
    value: 'nonRequested',
    label: {
      fr: 'Non demandé',
      en: 'Non requested',
    }[props.language],
  },
  {
    value: 'requested',
    label: {
      fr: 'Demandé',
      en: 'Requested',
    }[props.language],
  },
  {
    value: 'smartSplit',
    label: {
      fr: 'En attente de SmartSplit',
      en: 'Waiting for SmartSplit',
    }[props.language],
  },
  {
    value: 'managingSociety',
    label: {
      fr: 'En attente des sociétés de gestions',
      en: 'Waiting for managing societies',
    }[props.language],
  },
  {
    value: 'completed',
    label: {
      fr: 'Complété',
      en: 'Complété',
    }[props.language],
  },
  {
    value: 'problematic',
    label: {
      fr: 'Problématique',
      en: 'Problematic',
    }[props.language],
  },
  {
    value: 'canceled',
    label: {
      fr: 'Annulé',
      en: 'Cancelled',
    }[props.language],
  },
];
