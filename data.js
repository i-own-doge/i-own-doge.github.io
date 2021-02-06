const langsAndCountries = {
  am: {
    full: 'aramaic',
    country: 'sy',
    countries: ['sy'],
    greek_langs: []
  },
  ar: {
    full: 'arabic',
    country: 'sa',
    countries: ['sa'],
    greek_langs: ['hi']
  },
  cs: {
    full: 'czech',
    country: 'cz',
    countries: ['cz'],
    greek_langs: ['es']
  },
  el: {
    full: 'greek',
    country: 'gr',
    countries: ['gr'],
    greek_langs: ['ar', 'zh']
  },
  en: {
    full: 'english',
    country: 'gb',
    countries: ['gb'],
    greek_langs: ['el']
  },
  es: {
    full: 'spanish',
    country: 'es',
    countries: ['es'],
    greek_langs: ['el', 'zh']
  },
  fa: {
    full: 'persian',
    country: 'ir',
    countries: ['ir'],
    greek_langs: ['el', 'ja']
  },
  fi: {
    full: 'finnish',
    country: 'fi',
    countries: ['fi'],
    greek_langs: ['he']
  },
  fr: {
    full: 'french',
    country: 'fr',
    countries: ['fr'],
    greek_langs: ['he', 'jv', 'zh']
  },
  gl: {
    full: 'heavenly script',
    country: 'uv',
    countries: ['uv'],
    greek_langs: []
  },
  he: {
    full: 'hebrew',
    country: 'il',
    countries: ['il'],
    greek_langs: ['zh']
  },
  hi: {
    full: 'hindi',
    country: 'in',
    countries: ['in'],
    greek_langs: []
  },
  hr: {
    full: 'croatian',
    country: 'hr',
    countries: ['hr'],
    greek_langs: ['es']
  },
  hu: {
    full: 'hungarian',
    country: 'hu',
    countries: ['hu'],
    greek_langs: ['zh']
  },
  it: {
    full: 'italian',
    country: 'it',
    countries: ['it'],
    greek_langs: ['am', 'ar']
  },
  ja: {
    full: 'japanese',
    country: 'jp',
    countries: ['jp'],
    greek_langs: []
  },
  jv: {
    full: 'javanese',
    country: 'id',
    countries: ['id'],
    greek_langs: []
  },
  lv: {
    full: 'latvian',
    country: 'lv',
    countries: ['lv'],
    greek_langs: ['zh']
  },
  lt: {
    full: 'lithuanian',
    country: 'lt',
    countries: ['lt'],
    greek_langs: ['zh']
  },
  mk: {
    full: 'macedonian',
    country: 'mk',
    countries: [],
    greek_langs: ['es']
  },
  nl: {
    full: 'dutch',
    country: 'nl',
    countries: ['nl'],
    greek_langs: ['zh']
  },
  no: {
    full: 'norwegian',
    country: 'no',
    countries: ['no'],
    greek_langs: ['el']
  },
  pl: {
    full: 'polish',
    country: 'pl',
    countries: ['pl'],
    greek_langs: ['zh']
  },
  pt: {
    full: 'portuguese',
    country: 'pt',
    countries: ['pt'],
    greek_langs: ['el', 'zh']
  },
  ro: {
    full: 'romanian',
    country: 'ro',
    countries: ['ro'],
    greek_langs: ['tr']
  },
  ru: {
    full: 'russian',
    country: 'ru',
    countries: ['ru'],
    greek_langs: ['zh']
  },
  si: {
    full: 'sinhala',
    country: 'lk',
    countries: ['lk'],
    greek_langs: ['te']
  },
  sv: {
    full: 'swedish',
    country: 'se',
    countries: ['se'],
    greek_langs: ['el']
  },
  te: {
    full: 'telugu',
    country: 'in',
    countries: ['in'],
    greek_langs: []
  },
  tr: {
    full: 'turkish',
    country: 'tr',
    countries: ['tr'],
    greek_langs: ['fr']
  },
  yi: {
    full: 'yiddish',
    country: 'il',
    countries: ['il'],
    greek_langs: ['am']
  },
  zh: {
    full: 'chinese',
    country: 'cn',
    countries: ['cn'],
    greek_langs: ['gl']
  }
}

const contryCoords = {
  "sy":{"x":38.996815,"y":34.80207499999999},
  "sa":{"x":45.079162,"y":23.885942},
  "cz":{"x":15.472962,"y":49.81749199999999},
  "gr":{"x":21.824312,"y":39.074208},
  "gb":{"x":-3.435973,"y":55.378051},
  "es":{"x":-3.74922,"y":40.46366700000001},
  "ir":{"x":53.688046,"y":32.427908},
  "fi":{"x":25.748151,"y":61.92410999999999},
  "fr":{"x":2.213749,"y":46.227638},
  "il":{"x":34.851612,"y":31.046051},
  "in":{"x":78.96288,"y":20.593684},
  "hr":{"x":15.2,"y":45.1},
  "hu":{"x":19.503304,"y":47.162494},
  "it":{"x":12.56738,"y":41.87194},
  "jp":{"x":138.252924,"y":36.204824},
  "id":{"x":113.921327,"y":-0.789275},
  "lv":{"x":24.603189,"y":56.879635},
  "lt":{"x":23.881275,"y":55.169438},
  "mk":{"x":21.745275,"y":41.608635},
  "nl":{"x":5.291265999999999,"y":52.132633},
  "no":{"x":8.468945999999999,"y":60.47202399999999},
  "pl":{"x":19.145136,"y":51.919438},
  "pt":{"x":-8.224454,"y":39.39987199999999},
  "ro":{"x":24.96676,"y":45.943161},
  "ru":{"x":105.318756,"y":61.52401},
  "lk":{"x":80.77179699999999,"y":7.873053999999999},
  "se":{"x":18.643501,"y":60.12816100000001},
  "tr":{"x":35.243322,"y":38.963745},
  "cn":{"x":104.195397,"y":35.86166},
  "uv": {"x": 135, "y": 90}
}

var coordPairs = {};
for(var lang in langsAndCountries) {
  var config = langsAndCountries[lang];
  var fromCountry = contryCoords[config.country];
  if(!fromCountry) {
    continue;
  }
  config.greek_langs.forEach(function(gl) {
    var key = lang + '-' + gl;
    var toConfig = langsAndCountries[gl];
    if(toConfig) {
      var toCountry = contryCoords[toConfig.country];
      if(toCountry) {
        coordPairs[key] = {
          from: fromCountry,
          to: toCountry
        }
      }
    }
  })
}