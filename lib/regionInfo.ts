export const regionInfo: Record<
  string,
  {
    title: string;
    description: string[];
    info: { label: string; value: string }[];
  }
> = {
  chania: {
    title: "De regio Chania",
    description: [
      "De regio Chania vormt het groene westen van Kreta, waar ruige bergen en turquoise baaien elkaar ontmoeten.",
      "Hier wandel je door de indrukwekkende Samariakloof, ontdek je het roze zand van Elafonissi en geniet je van het charmante oude centrum van Chania-stad, vol Venetiaanse en Ottomaanse invloeden.",
    ],
    info: [
      { label: "Hoofdplaats", value: "Chania" },
      { label: "Inwoners", value: "± 156.000" },
      {
        label: "Bezienswaardigheden",
        value:
          "Samaria-kloof, Imbros-kloof, Balos-lagune, Elafonissi-strand, oude stad van Chania",
      },
    ],
  },

  heraklion: {
    title: "De regio Heraklion",
    description: [
      "De regio Heraklion vormt het hart van Kreta en combineert eeuwenoude geschiedenis met levendige tradities.",
      "Hier ontdek je het wereldberoemde Paleis van Knossos, de sfeervolle wijnvalleien rond Archanes en de zuidelijke stranden van Matala en Agia Galini.",
    ],
    info: [
      { label: "Hoofdplaats", value: "Heraklion" },
      { label: "Inwoners", value: "± 305.000" },
      {
        label: "Bezienswaardigheden",
        value:
          "Knossos, Archeologisch Museum, Peza-wijnvallei, Matala, Archanes",
      },
    ],
  },

  rethymnon: {
    title: "De regio Rethymnon",
    description: [
      "De regio Rethymnon ligt tussen Chania en Heraklion en vormt een overgangsgebied tussen het groene westen en het drogere oosten van Kreta.",
      "Het is een streek van contrasten: levendige kustplaatsen en stille bergdorpen, zandstranden en steile kloven. De oude stad van Rethymnon ademt Venetiaanse charme.",
    ],
    info: [
      { label: "Hoofdplaats", value: "Rethymno" },
      { label: "Inwoners", value: "± 85.000" },
      {
        label: "Bezienswaardigheden",
        value:
          "Moni Arkadi, Rethymno-stad, Preveli, Kourtaliotiko-kloof, Anogia, Margarites",
      },
    ],
  },

  lassithi: {
    title: "De regio Lassithi",
    description: [
      "De regio Lassithi vormt het oostelijke uiteinde van Kreta — een ruig, dor en vaak winderig landschap waar de natuur haar eigen tempo bepaalt.",
      "Langs de kust liggen sfeervolle plaatsen als Agios Nikolaos en Elounda, met uitzicht op het eiland Spinalonga, terwijl verder oostwaarts het palmenstrand van Vai ligt.",
    ],
    info: [
      { label: "Hoofdplaats", value: "Sitia" },
      { label: "Inwoners", value: "± 75.000" },
      {
        label: "Bezienswaardigheden",
        value: "Agios Nikolaos, Spinalonga, Elounda, Zakros, Vai, Gournia",
      },
    ],
  },

  cultuur: {
    title: "De Kretenzische cultuur",
    description: [
      "De Kretenzische cultuur is diep geworteld in traditie, maar leeft volop in het heden. Muziek, dans en gastvrijheid vormen er de kern van.",
      "Ambachten als pottenbakken, weven en houtbewerking blijven bewaard, vaak in familieateliers die generaties oud zijn.",
    ],
    info: [
      { label: "Belangrijk kenmerk", value: "Muziek, dans en gastvrijheid" },
      { label: "Ambachten", value: "Pottenbakken, weven, houtbewerking" },
      { label: "Feesten", value: "Panigyria (dorpsfeesten) met luitmuziek" },
    ],
  },

  geschiedenis: {
    title: "Geschiedenis van Kreta",
    description: [
      "De geschiedenis van Kreta beslaat duizenden jaren en vormt een belangrijk deel van de Europese beschaving.",
      "Het eiland was het centrum van de Minoïsche cultuur, met indrukwekkende paleizen zoals Knossos en Phaistos.",
    ],
    info: [
      { label: "Tijdperken", value: "Minoïsch, Venetiaans, Ottomaans, Modern" },
      { label: "Belangrijke sites", value: "Knossos, Phaistos, Gortys" },
      { label: "Invloeden", value: "Byzantijns, Romeins, Turks, Venetiaans" },
    ],
  },

  "eten-en-drinken": {
    title: "De Kretenzische keuken",
    description: [
      "De Kretenzische keuken is eenvoudig, puur en gezond — gebaseerd op lokale producten en het ritme van de seizoenen.",
      "Olijfolie, verse groenten, wilde kruiden, kaas en brood vormen de basis van de maaltijd.",
    ],
    info: [
      { label: "Specialiteiten", value: "Dakos, antikristo, stamnagathi, mezedes" },
      { label: "Dranken", value: "Wijn, raki" },
      { label: "Bekend om", value: "Verse en seizoensgebonden gerechten" },
    ],
  },

  "natuur-en-wandelen": {
    title: "Wandelen op Kreta",
    description: [
      "Kreta heeft een bijzonder gevarieerd landschap dat uitnodigt tot ontdekken — van hoge bergen tot kustpaden.",
      "Het langeafstandspad E4 doorkruist het eiland van west naar oost.",
    ],
    info: [
      { label: "Bekende routes", value: "Samariakloof, Imbroskloof, Zakros, E4" },
      { label: "Kenmerk", value: "Ruige natuur en bergachtige landschappen" },
      { label: "Tip", value: "Neem stevige schoenen en voldoende water mee" },
    ],
  },
};
