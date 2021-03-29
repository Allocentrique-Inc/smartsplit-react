export default {
  locale: 'fr',
  header:
    '<h1>ENTENTE DE PARTAGE DE DROITS</h1><p><i>Droit d’auteur sur l’oeuvre & Droits voisins des artistes-interprètes et producteurs</i></p>',
  sections: {
    generalInformations:
      '<h2>Entente concernant la pièce musicale originale :</h2><p><strong>Monsieur Poirier (feat. Claude Poirier)</strong> interprétée par <i>Luminol</i>, ci-après la <b>«pièce»</b> musicale.</p>',
    rightHolders: {
      title: '<h2>Entente intervenue entre les contributeurs suivants :</h2>',
      list: [
        "<column><rank>1</rank></column><column><p><b>Claude Poirier</b> portant le nom portant le nom d’artiste <i>«Claude Poirier»</i><strong>- IPI #518507355</strong></p><p>Domicilié au 54 Place Calais, Candiac, Québec, Canada, J5R 4K6 \nEt joignable par téléphone au (514) 594-2424 et par courriel au <a href='mailto:claudep38@icloud.com'>claudep38@icloud.com</a>.</p></column>",
        "<column><rank>2</rank></column><column><p><b>Claudetee Poirierer</b> portant le nom portant le nom d’artiste <strong>- IPI #518507355</strong></p><p>Domicilié au 54 Place Calais, Candiac, Québec, Canada, J5R 4K6 \nEt joignable par téléphone au (514) 594-2424 et par courriel au <a href='mailto:claudep38@icloud.com'>claudep38@icloud.com</a>.</p></column>",
        '<p><i>Tous ci-dessus collectivement nommés les «contributeurs» ou les «parties»</i></p>',
      ],
    },
    rightSplit: {
      title:
        '<h2>Les contributeurs s’entendent sur ces partages de droits en lien avec la «pièce» :</h2>',
      copyrightDividingMethod: 'role',

      copyright: {
        title: "<h3>DROITS D'AUTEUR</h3>",
        rightHolders: [
          {
            artistName: "L'artiste",
            firstName: 'FRANCOIS-X',
            lastName: 'DUEYMES',
            roles: ['author'],
            shares: 25,
            vote: 'accepted',
            rightHolder_id: 'fd8c3947-5e2b-4200-8f4f-1b738cb6acc6',
          },
          {
            roles: ['author', 'adapter'],
            artistName: 'ARTIST 1',
            firstName: 'FX1',
            lastName: 'DUMS',
            shares: 41.6666,
            vote: 'accepted',
            rightHolder_id: '0d8f03c7-f1d8-4c1c-a984-0af19db04b0f',
          },
          {
            roles: ['composer'],
            artistName: 'ARTIST 2',
            firstName: 'FX2',
            lastName: 'DUDUMS',
            shares: 16.6666,
            vote: 'accepted',
            rightHolder_id: 'ba68e3ea-b6ad-4aa3-96d5-a7c0143fb6a4',
          },
          {
            roles: ['composer'],
            firstName: 'FX3',
            lastName: 'DUDUDUMS',
            shares: 16.6666,
            vote: 'refused',
            rightHolder_id: 'e5e002a5-e7d8-4355-9dda-03d44fede714',
          },
        ],
      },
      performance: {
        title: '<h3>INTERPRÉTATION</h3>',
        rightHolders: [
          {
            avatar: 'unUrlAvatarValide',
            displayRoles: ['Musicien'],
            roles: ['musician'],
            artistName: 'ARTIST 1',
            firstName: 'FX1',
            lastName: 'DUMS',
            status: 'principal',
            shares: 80,
            vote: 'accepted',
            rightHolder_id: '0d8f03c7-f1d8-4c1c-a984-0af19db04b0f',
          },
          {
            displayRoles: ['Chanteur'],
            roles: ['singer'],
            artistName: 'ARTIST 2',
            firstName: 'FX2',
            lastName: 'DUDUMS',
            status: 'session',
            shares: 20,
            vote: 'accepted',
            rightHolder_id: 'ba68e3ea-b6ad-4aa3-96d5-a7c0143fb6a4',
          },
        ],
      },
      recording: {
        title: '<h3>ENREGISTREMENT SONORE</h3>',
        rightHolders: [
          {
            function: 'label',
            artistName: "L'artiste",
            firstName: 'FRANCOIS-X',
            lastName: 'DUEYMES',
            shares: 72,
            vote: 'refused',
            rightHolder_id: 'fd8c3947-5e2b-4200-8f4f-1b738cb6acc6',
          },
          {
            function: 'producer',
            artistName: 'ARTIST 3',
            firstName: 'FX3',
            lastName: 'DUDUDUMS',
            shares: 28,
            vote: 'accepted',
            rightHolder_id: 'e5e002a5-e7d8-4355-9dda-03d44fede714',
          },
        ],
        label: {
          rightHolder_id: 'e5e002a5-e7d8-4355-9dda-03d44fede714',
          artistName: 'LABEL',
          firstName: 'FX3',
          lastName: 'DUDUDUMS',
          agreementDuration: '2YearsOrIdunno',
          notifViaEmail: true,
          notifViaText: false,
          shares: 38,
        },
      },
    },
    agreementConditions: {
      description:
        '<h2>Conditions de l’entente</h2><p>La présente entente est en vigueur pour la durée des droits de chacun des contributeurs relativement à la pièce musicale.</p><p>Par la présente, les contributeurs acceptent les différents partages de droits présentés à la page précédente, soit le partage relatif au droit d’auteur sur l’oeuvre musicale, au droit voisin lié aux prestations ainsi que le droit voisin lié à l’enregistrement sonore de la pièce musicale <strong>Monsieur Poirier (feat. Claude Poirier)</strong>.</p>',
      copyright: {
        title: "<h3>DROITS D'AUTEUR</h3>",
        content:
          "<li><row>Chaque contributeur ayant participé à la <i>création</i> de l’oeuvre <strong>Monsieur Poirier (feat. Claude Poirier)</strong> :</row><nol><li>représente et garantit que l’oeuvre est originale et qu’elle n’enfreint pas les droits de tiers, incluant tout droit de propriété intellectuelle;</li><li>comprend qu’il peut, à sa discrétion, céder, concéder une licence sur ou faire administrer sa portion respective des droits d’auteur sur l’oeuvre à des tiers de son choix (p. ex. éditeurs, administrateur d’éditions, co-éditeurs, sous-éditeurs);</li><li>représente et garantit qu'il a le droit et la capacité de conclure et respecter la présente entente et qu’il n'a aucune restriction contractuelle ou autre l’empêchant de conclure et respecter la présente entente.</li></nol></li>",
      },
      performance: {
        title: '<h3>INTERPRÉTATION</h3>',
        content:
          "<li>Chaque contributeur ayant participé à la prestation fixée sur l’enregistrement sonore de l’oeuvre Monsieur Poirier (feat. Claude Poirier) :<nol><li>représente et garantit que la prestation dont il se prétend l’artiste-interprète a bel et bien été effectuée par lui, et qu’elle n’enfreint pas les droits de tiers, incluant tout droit de propriété intellectuelle;</li><li>comprend qu’il peut, à sa discrétion, céder, concéder une licence sur ou faire administrer sa portion respective des droits voisins sur la prestation fixée sur l’enregistrement sonore à des tiers de son choix (p. ex. producteur de l’enregistrement sonore);</li><li>représente et garantit qu'il a le droit et la capacité de conclure et respecter la présente entente, et qu’il n'a aucune restriction contractuelle ou autre l’empêchant de conclure et respecter la présente entente.</li></nol></li>",
      },
      recording: {
        title: '<h3>ENREGISTREMENT SONORE</h3>',
        content:
          "<li><row>Chaque contributeur ayant participé à la production de l’enregistrement sonore de l’oeuvre <strong>Monsieur Poirier (feat. Claude Poirier)</strong> :</row><nol><li>représente et garantit que l’enregistrement sonore n’enfreint pas les droits de tiers, incluant tout droit de propriété intellectuelle;</li><li>comprend qu’il peut, à sa discrétion, céder, concéder une licence sur ou faire administrer sa portion respective des droits voisins sur l’enregistrement sonore à des tiers de son choix;</li><li>représente et garantit qu'il a le droit et la capacité de conclure et respecter la présente entente, et qu’il n'a aucune restriction contractuelle ou autre l’empêchant de conclure et respecter la présente entente.</li></nol</li>",
      },
    },
    recommendations:
      '<h2>Prochaines étapes recommandées</h2><p>Cette entente se limite à la définition du partage de droits entre les contributeurs et quelques aspects connexes. Sans s’y limiter, les contributeurs sont par ailleurs responsables de :</p><aol><li>définir entre eux toute autre modalité relative à l’exploitation de l’oeuvre et au partage des revenus (incluant le paiement de toute avance);</li><li>procéder à la déclaration des partages de droits sur l’oeuvre, la prestation et l’enregistrement sonore de la pièce musicale aux Sociétés de gestion de collective droits pertinentes (comme la SOCAN, la SOPROQ, ARTISTI au Canada);</li><li>s’assurer de respecter toute entente collective applicable ou toute obligation découlant d’une loi relative au statut des artistes; et honorer ses propres ententes préalablement signées avec des tiers  (p. ex. éditeurs, administrateur d’éditions, co-éditeurs, sous-éditeurs).</li></aol>',
    moralRights:
      '<h2>Droits moraux</h2><p>La notice de titularité suivante doit obligatoirement accompagner toute exploitation de la pièce musicale : <i><strong>«Monsieur Poirier (feat. Claude Poirier)»</strong> par Luminol</i>. Cette notice doit être reproduite telle quelle sur toutes communications en lien avec la pièce musicale, et en lien avec toute exploitation de la pièce musicale, selon les standards de l’industrie.</p><p>Chaque contributeur comprend que la présente entente n’emporte aucune renonciation au droit moral, et qu’il ne pourra déformer, mutiler ou autrement modifier l’œuvre ou la prestation, ou les utiliser en liaison avec un produit, un service, une cause ou une institution d’une manière préjudiciable à l’honneur ou à la réputation des contributeurs ayant des droits relatifs à l’œuvre ou la prestation sans leur accord préalable.</p>',
    otherConditions:
      "<h2>Autres conditions</h2><p>Toute modification à la présente entente sera sans effet si elle n’est pas explicitement acceptée par écrit et signée par les l’ensemble des contributeurs. Pour plus de certitude, le fait pour un contributeur de céder, concéder une licence ou faire administrer sa portion respective des droits ne constitue pas une modification pour laquelle l’accord des autres contributeurs est requis.</p><p>Sauf avis contraire unanime des contributeurs, cette entente doit demeurer confidentielle (à l’exception de toute divulgation requise par toute loi, règlement ou ordonnance, ou pour l’administration de la portion respective des droits de chacun par un tiers comme une société de gestion collective, un éditeur, un co-éditeur ou un sous-éditeur). Dans le cas où les contributeurs s’entendent de manière unanime pour rendre publics les détails sur le partage de leurs droits, alors IPtoki Inc., les sociétés membres de son groupe ainsi que leurs successeurs, ayants-droit, et cessionnaires respectifs (ci-après collectivement <i>«Smartsplit»</i>) seront réputés être en droit de pouvoir utiliser ces données, les noms d’artiste des contributeurs et leur image afin de présenter et promouvoir publiquement ce partage de droits en guise d’exemple dans toute communication et sur la plateforme <i>Smartsplit</i>.</p><p>Chaque contributeur comprend que la présente entente lie seulement et uniquement les contributeurs. Chaque contributeur accepte et reconnaît que <i>Smartsplit</i> n’est pas partie à la présente entente.</p><p>Chaque contributeur s'engage à indemniser, défendre et tenir à couvert les autres contributeurs de toutes pertes, réclamations, dommages, frais ou responsabilités, incluant tout honoraire d’avocat raisonnable, que ceux-ci pourraient subir ou encourir en raison de tout manquement, défaut ou violation de tout terme, obligation, représentation ou garantie de la présente entente.</p><p>Toute décision d’un tribunal à l’effet que l’une des dispositions de la présente entente est nulle ou non exécutoire n’affectera aucunement les autres dispositions ou leur validité ou leur force exécutoire.</p><p>La présente entente lie et est exécutoire non seulement à l'égard des contributeurs mais également de leurs héritiers, successeurs, ayants droit et représentants légaux.</p><p>La présente entente contient l'énoncé intégral et unique de l'entente intervenue entre les contributeurs relativement à l'objet des présentes. Les contributeurs reconnaissent qu'aucune autre promesse ou représentation ne leur a été faite et qu'aucune convention verbale ou autre n'est intervenue entre elles relativement à l'objet de la présente entente. La présente entente annule et remplace toute entente, représentation ou proposition antérieure à la signature des présentes.</p><p>Peu importe son lieu d’application, la présente entente doit être interprétée et appliquée selon les lois applicables dans la province de Québec. En cas de litige découlant de la présente entente, les parties accordent juridiction aux cours du district judiciaire de Montréal.</p><p>Pour plus de certitude, le terme “interprétation”, tel qu’utilisé dans le contexte de cette entente, a le même sens que le terme “prestation” (art. 2 de la <i>Loi sur le droit d’auteur</i>, L.R.C. (1985), ch. C-42).</p><p>Les contributeurs reconnaissent avoir lu, compris et accepté les termes et conditions et la politique de confidentialité de <i>Smartsplit</i>.</p>",
    signatures: {
      text:
        '<p>En foi de quoi les parties ont signé à Montréal, Province de Québec, ce 18 juillet 2020.</p>',
      signatories: [
        'Claude Poirier',
        'Frédéric Desjardins',
        'Claude Poirier',
        'Frédéric Desjardins',
      ],
    },
  },
  footer: '<b>Entente de partage de droits</b>',
};
