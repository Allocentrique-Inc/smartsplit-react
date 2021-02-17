export default {
  topBar: {
    breadCrumb: {
      _rightSplits: { fr: 'Partage des droits', en: 'Right Split' },
      _copyright: { fr: "Droits d'auteur", en: 'Copyright' },
      _performance: { fr: 'Interpretation', en: 'Performance' },
      _recording: { fr: 'Enregistrement sonore', en: 'Recording' },
      _privacy: { fr: 'Confidentialité', en: 'Privacy' },
    },
    _saveAndQuit: { fr: 'Sauvegarder et fermer', en: 'Save And Quit' },
  },

  title: {
    _copyright: { fr: "DROITS D'AUTEUR", en: 'COPYRIGHT' },
    _performance: { fr: 'INTERPRETATION', en: 'PERFORMANCE' },
    _recording: { fr: 'ENREGISTREMENT SONORE', en: 'RECORDING' },
    _privacy: { fr: 'CONFIDENTIALITÉ', en: 'PRIVACY' },
  },

  textPresentation: {
    _copyright: { fr: 'Qui a inventé cette pièce musicale ?', en: 'COPYRIGHT' },
    _performance: {
      fr: 'Qui a joué sur l’enregistrement sonore?',
      en: 'PERFORMANCE',
    },
    _recording: { fr: 'Qui possède l’enregistrement sonore?', en: 'RECORDING' },
    _privacy: { fr: 'Veux-tu rendre ce partage public?', en: 'PRIVACY' },
  },

  textDescription: {
    _copyright: {
      fr:
        'Sépare ici les droits d’auteur entre les créateurs, c’est à dire les auteurs des <b>paroles</b>, les compositeurs et les arrangeurs de la <b>musique</b>. Il est d’usage de partager le droit d’auteur équitablement. Mais tu peux faire autrement.',
      en: 'COPYRIGHT',
    },
    _performance: {
      fr:
        'On sépare ici le droit voisin entre les interprètes, autant les musiciens que les chanteurs. Les membres d’un groupe se partagent ce droit à parts égales; Les artistes principaux et artistes invités se partagent 80%, tandis que le 20% restant est partagé parmi les artistes accompagnateurs, le cas échéant.',
      en: 'PERFORMANCE',
    },
    _recording: {
      fr:
        'On sépare ici le droit voisin des producteurs, c’est à dire ceux qui ont investi leur temps et/ou leur argent pour enregistrer et finaliser le produit afin d’être commercialisé. Il est d’usage de partager ce droit en parts égales ou au prorata de l’investissement.  En savoir plus...',
      en: 'RECORDING',
    },
    _privacy: {
      fr:
        'Expliquer ou est-ce que ça va se retrouver et que ca va etre soumis au vote.',
      en: 'PRIVACY',
    },
  },

  copyrightDividingMethod: {
    _equal: {
      fr: 'Partager de façon égale',
      en: 'COPYRIGHT',
    },
    _roles: {
      fr: 'Partager selon les rôles',
      en: 'COPYRIGHT',
    },
    _manual: {
      fr: 'Gérer manuellement',
      en: 'COPYRIGHT',
    },
  },

  copyrightRoles: {
    _autor: {
      fr: 'Auteur',
      en: 'COPYRIGHT',
    },
    _composer: {
      fr: 'Compositeur',
      en: 'COPYRIGHT',
    },
    _adaptator: {
      fr: 'Adaptateur',
      en: 'COPYRIGHT',
    },
    _mixer: {
      fr: 'Arrangeur',
      en: 'COPYRIGHT',
    },
  },

  _removeCollaborator: {
    fr: 'Retirer ce partage',
    en: 'COPYRIGHT',
  },

  // copyright: {
  //   title: "Droits d'auteur",
  //   header: 'Qui a inventé cette pièce musicale ?',
  //   description: () => (
  //     <>
  //       Sépare ici le droit d’auteur entre les créateurs, c’est à dire les
  //       auteurs des
  //       {' '}
  //       <b>paroles</b>
  //       , les compositeurs et les arrangeurs de la
  //       {' '}
  //       <b>musique</b>
  //       . Il est d’usage de partager le droit d’auteur
  //       équitablement. Mais tu peux faire autrement.
  //     </>
  //   ),
  // },

  // downBar: {
  //   goBack: {
  //     fr: 'Retour',
  //     en: 'Go Back',
  //   },
  //   continue: {
  //     fr: 'Continuer',
  //     en: 'Continue',
  //   },
  // },

  // performance: {
  //   title: 'Interprétation',
  //   header: "Qui a joué sur l'enregistrement sonore ?",
  //   description: () => (
  //     <>
  //       On sépare ici le
  //       {' '}
  //       <b>droit</b>
  //       {' '}
  //       voisin entre les
  //       {' '}
  //       <b>interprètes</b>
  //       ,
  //       autant les musiciens que les chanteurs. Les membres d'un
  //       {' '}
  //       <i>groupe</i>
  //       {' '}
  //       se partagent ce droit à parts égales. Les
  //       {' '}
  //       <i>artistes principaux</i>
  //       {' '}
  //       et
  //       {' '}
  //       <i>artistes invités</i>
  //       {' '}
  //       se partagent 80%, tantdis que les 20% restant
  //       est partagé parmi les
  //       <i>artistes accompagnateurts</i>
  //       , le cas échéant.
  //     </>
  //   ),

  //   artistTypes: {
  //     principal: {
  //       name: 'Artiste principal',
  //       desc: 'Aussi appelé « Artiste vedette » ou « Artiste solo »',
  //     },
  //     featured: {
  //       name: () => (
  //         <>
  //           Artiste invité ((
  //           <i>featuring</i>
  //           ))
  //         </>
  //       ),
  //       desc: "Artiste ou membre d'un groupe invité à collaborer",
  //     },
  //     bandMember: {
  //       name: 'Membre du groupe',
  //       desc: "Artiste prenant part à l'entité artistique",
  //     },
  //     session: {
  //       name: 'Artiste accompagnateur',
  //       desc: "Interprète engagé pendant l'enregistrement",
  //     },
  //   },
  // },
  // recording: {
  //   title: 'Enregistrement sonore',
  //   header: "Qui possède l'enregistrement sonore ?",
  //   description: () => (
  //     <>
  //       <>
  //         On sépare ici le
  //         {' '}
  //         <b>droit voisin</b>
  //         {' '}
  //         des
  //         {' '}
  //         <b>producteurs</b>
  //         , c'est à
  //         dire ceux qui ont investi leur temps et/ou leur argent pour
  //         enregistrer et finaliser le produit afin d'être commercialisé.
  //       </>
  //       <>
  //         Il est d'usage de partager ce droit en parts égales ou au prorata de
  //         l'investissement.
  //       </>
  //     </>
  //   ),
  //   functions: {
  //     producer: 'Producteur',
  //     autoProducer: 'Auto-producteur',
  //     directorProducer: 'Réalisateur-producteur',
  //     techProducer: 'Technicien-producteur',
  //     studio: "Studio d'enregistrement",
  //     illustratorDesigner: 'Illustrateur / Graphiste',
  //   },
  //   functionDefs: {
  //     producer:
  //       "Investisseur externe (n'étant pas l'artiste ni membre du groupe).",
  //     autoProducer:
  //       "Artiste ou membre du groupe s'investissant dans l'enregistrement de la pièce.",
  //     directorProducer:
  //       "Artisan s'investissant dans la réalisation et la production de la pièce.",
  //     techProducer:
  //       "Technicien s'investissant dans la production de la pièce (mixeur, preneur de son).",
  //     studio:
  //       "Entité investissant ses ressources afin d'enregistrer la pièce, contre pourcentage.",
  //     illustratorDesigner:
  //       "Personne s'investissant dans la création de matériel visuel lié à la pièce (pochette, vidéo).",
  //   },
  // },

  // radios: {
  //   equal: 'Partager de façon égale',
  //   roles: 'Partager selon les rôles',
  //   manual: 'Gérer manuellement',
  //   email: 'Par courriel',
  //   txt: 'Par texto',
  // },
  // yourself: '(toi)',
  // more: 'En savoir plus',
  // notify: "Me notifier un mois avant l'échéance...",
  // music: 'Musique',
  // lyrics: 'Paroles',
  // addCollab: 'Ajouter un collaborateur...',
  // addLabel: 'Ajouter un label...',
  // removeCollab: 'Retirer ce collaborateur',
  // status: 'Sélectionner un status...',
  // function: 'Sélectionner une fonction...',
  // agreement: "Durée de l'entente...",
  // remove: 'Retirer ce partage',
  // roles: {
  //   author: 'Auteur',
  //   composer: 'Compositeur',
  //   adapter: 'Adaptateur',
  //   mixer: 'Arrangeur',
  //   singer: 'Chanteur',
  //   musician: 'Musicien',
  // },
  // dropdowns: {
  //   duration: {
  //     oneYear: "1 an, puis renouvelable d'année en année",
  //     twoYears: "2 ans, puis renouvelable d'année en année",
  //     threeYears: "3 ans, puis renouvelable d'année en année",
  //     fourYears: "4 ans, puis renouvelable d'année en année",
  //     fiveYears: "5 ans, puis renouvelable d'année en année",
  //     renew:
  //       'Se renouvelle automatiquement, sauf avis signifié 60 jours avant.',
  //   },
  // },

  // errors: {
  //   status: 'Tu dois sélectionner un status pour cet ayant droits.',
  //   role: 'Tu dois sélectionner au moins un rôle pour cet ayant droits.',
  //   function: 'Tu dois sélectionner une fonction pour cet ayant droits.',
  //   option: 'Tu dois sélectionner une option pour cet ayant droits.',
  // },

  // tooltips: {
  //   equal:
  //     "Divise le droit d'auteur par le nombre de personnes et attribue le rôle  « Auteur-Compositeur » par défaut à tous. Cette manière de partager le droit d'auteur évite beaucoup de chicanes entre les créateurs, particulièrement lorsque les revenus se mettent à rentrer. ;)",
  //   role:
  //     "Divise le droit d'auteur en deux : 50% va à ceux qui ont composé la musique. Cette dernière partie « musique » est à son tour divisé par le nombre de rôles sélectionnés et les collaborateurs obtiennent un pourcentage selon leur implication. Par exemple: Alice compose uniquement la musique, tandis que Bob compose ET arrange la musique. Ainsi, Alice a 1/3 et Bob a 2/3 de la musique.",
  //   manual:
  //     'Te laisse déterminer le pourcentage et les rôles pour chaque collaborateurs. Pour figer un pourcentage à un collaborateur, tu peux utiliser le cadenas.',
  //   label:
  //     "Règle générale, un label prend rarement plus de 50% des droits et revenus en lien avec la propriété de l'enregistrement sonore.",
  // },
};
