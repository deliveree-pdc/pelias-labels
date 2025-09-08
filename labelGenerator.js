const _ = require('lodash');

const getSchema = require('./getSchema');

function dedupeNameAndFirstLabelElement(labelParts) {
  // only dedupe if a result has more than a name (the first label part)
  if (labelParts.length > 1) {
    // first, dedupe the name and 1st label array elements
    //  this is used to ensure that the `name` and first admin hierarchy elements aren't repeated
    //  eg - `["Lancaster", "Lancaster", "PA", "United States"]` -> `["Lancaster", "PA", "United States"]`
    const deduped = _.uniq([labelParts.shift(), labelParts.shift()]);
    // second, unshift the deduped parts back onto the labelParts
    labelParts.unshift.apply(labelParts, deduped);

  }

  return labelParts;
}

// this can go away once geonames is no longer supported
// https://github.com/pelias/wof-admin-lookup/issues/49
function isCountry(layer) {
  return 'country' === layer;
}

function isRegion(layer) {
  return 'region' === layer;
}

function isAddress(layer) {
  return 'address' === layer;
}

function isUSAOrCAN(country_a) {
  return 'USA' === country_a || 'CAN' === country_a;
}

function isGeonamesOrWhosOnFirst(source) {
  return 'geonames' === source || 'whosonfirst' === source;

}

function isInUSAOrCAN(record) {
  return record.country_a && isUSAOrCAN(record.country_a[0]);
}

// helper function that sets a default label for non-US/CA regions and countries
function buildPrefixLabelParts(schema, record) {
  if (isRegion(record.layer) &&
    isGeonamesOrWhosOnFirst(record.source) &&
    isInUSAOrCAN(record)) {
    return [];
  }

  if (isCountry(record.layer) && !_.isEmpty(record.country)) {
    return [];
  }

  // support name aliases
  if (Array.isArray(record.name.default)) {
    return record.name.default.slice(0,1);
  }

  return [record.name.default];

}

function buildAdminLabelPart(schema, record) {
  let labelParts = [];

  // iterate the schema
  for (const field in schema.valueFunctions) {
    const valueFunction = schema.valueFunctions[field];
    labelParts.push(valueFunction(record));
  }

  return labelParts;
}

// builds a complete label by combining several components
// the parts generally follow this format
// prefix parts: the venue name or address
// admin parts: administrative information like city
function defaultBuilder(schema, record) {

  // in virtually all cases, this will be the `name` field
  const prefixParts = buildPrefixLabelParts(schema, record);
  const adminParts = buildAdminLabelPart(schema, record);

  let labelParts = _.concat(prefixParts, adminParts);

  // retain only things that are truthy
  labelParts =  _.compact(labelParts);
  return dedupeNameAndFirstLabelElement(labelParts);
}

module.exports = function( record, language ){
  const schema = getSchema(record, language);
  const separator = _.get(schema, ['meta','separator'], ', ');
  const builder = _.get(schema, ['meta', 'builder'], defaultBuilder);

  let labelParts = builder(schema, record);

  return _.trim(labelParts.join(separator));
};
