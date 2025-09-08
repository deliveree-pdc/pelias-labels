var generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generator, 'function', 'valid function');
    t.end();
  });
};

module.exports.tests.south_korea = function(test, common) {
  test('venue', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'kor'),'South Korea region name county name venue name');
    t.end();
  });

  test('address', function(t) {
    var doc = {
      'name': { 'default': '123 street name' },
      'layer': 'address',
      'housenumber': '123',
      'street': 'street name',
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'kor'),'South Korea region name county name street name 123');
    t.end();
  });

  test('address should always use county even if locality and localadmin are available', function(t) {
    var doc = {
      'name': { 'default': 'house number street name' },
      'layer': 'address',
      'housenumber': '123',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'kor'),'South Korea region name county name street name 123');
    t.end();
  });

  test('neighbourhood', function(t) {
    var doc = {
      'name': { 'default': 'neighbourhood name' },
      'layer': 'neighbourhood',
      'neighbourhood': ['neighbourhood name'],
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'kor'),'South Korea region name county name neighbourhood name');
    t.end();
  });

  test('locality', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'layer': 'locality',
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'kor'),'South Korea region name county name locality name');
    t.end();
  });

  test('localadmin', function(t) {
    var doc = {
      'name': { 'default': 'localadmin name' },
      'layer': 'localadmin',
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'kor'),'South Korea region name county name localadmin name');
    t.end();
  });

  test('county', function(t) {
    var doc = {
      'name': { 'default': 'county name' },
      'layer': 'county',
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'kor'),'South Korea region name county name');
    t.end();
  });

  test('region', function(t) {
    var doc = {
      'name': { 'default': 'region name' },
      'layer': 'region',
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'kor'),'South Korea region name');
    t.end();
  });

  test('country', function(t) {
    var doc = {
      'name': { 'default': 'South Korea' },
      'layer': 'country',
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'kor'),'South Korea');
    t.end();
  });

  test('full address', function (t) {
    var doc = {
      'layer': 'address',
      'name': { 'default': '27 모세로' },
      'label': ['한국 서울 모세로 27'],
      'county': ['용산구'],
      'continent': ['아시아'],
      'housenumber': '27',
      'postalcode': ['14230'],
      'region': ['서울'],
      'country_a': ['KOR'],
      'neighbourhood': ['구로본동'],
      'locality': ['서울'],
      'street': '모세로',
      'country': ['한국']
    };
    t.equal(generator(doc, 'kor'),'한국 서울 용산구 모세로 27');
    t.end();
  });
};

// when the requested language is english, fields are returned in the order
// specified by the default generator.
module.exports.tests.south_korea_lang_venue_eng = function(test, common) {
  test('venue', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc, 'eng'),'venue name, localadmin name, South Korea');
    t.end();
  });
};

// when the requested language is unspecified, fields are returned in the order
// specified by the default generator.
module.exports.tests.south_korea_venue_lang_default = function(test, common) {
  test('venue', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'venue name, localadmin name, South Korea');
    t.end();
  });
};

// when the requested language is unspecified, fields are returned in the order
// specified by the default generator.
module.exports.tests.south_korea_admin_lang_default = function(test, common) {
  test('venue', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'layer': 'locality',
      'locality': ['locality name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc), 'locality name, South Korea');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('label generator (KOR): ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
