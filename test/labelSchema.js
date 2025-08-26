'use strict';

const schemas = require('../labelSchema');

module.exports.tests = {};

module.exports.tests.supported_countries = function(test, common) {
  test('supported countries', function(t) {
    const supported_countries = Object.keys(schemas);

    t.ok(supported_countries.includes('USA'));
    t.ok(supported_countries.includes('CAN'));
    t.ok(supported_countries.includes('GBR'));
    t.ok(supported_countries.includes('AUS'));
    t.ok(supported_countries.includes('KOR'));
    t.ok(supported_countries.includes('FRA'));
    t.ok(supported_countries.includes('ITA'));
    t.ok(supported_countries.includes('default'));

    t.equals(Object.keys(schemas.USA.valueFunctions).length, 4);
    t.equals(Object.keys(schemas.CAN.valueFunctions).length, 3);
    t.equals(Object.keys(schemas.GBR.valueFunctions).length, 3);
    t.equals(Object.keys(schemas.AUS.valueFunctions).length, 3);
    t.equals(Object.keys(schemas.KOR.valueFunctions).length, 3);
    t.equals(Object.keys(schemas.FRA.valueFunctions).length, 2);
    t.equals(Object.keys(schemas.ITA.valueFunctions).length, 3);

    t.equals(schemas.KOR.meta.separator, ' ');

    t.end();

  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('schemas: ' + name, testFunction);
  }

  for( const testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
