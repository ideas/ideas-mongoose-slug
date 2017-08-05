'use strict';

// Load external modules
var Joi = require('joi');
var _ = require('lodash');

// Load external functions
var slug = require('slug');

// Declare internals
var internals = {};

internals.validate = function(options) {
  var schema = {
    properties: Joi.array().items(Joi.string()).single().default(['title']),
    slug: {
      mode: Joi.string().valid('pretty', 'rfc3986'),
      replacement: Joi.string(),
      symbols: Joi.boolean(),
      remove: Joi.object().type(RegExp),
      lower: Joi.boolean(),
      charmap: Joi.object(),
      multicharmap: Joi.object()
    }
  };

  var result = Joi.validate(options, schema);

  if (result.error) {
    throw result.error;
  }

  return result.value;
}

module.exports = exports = function(schema, options) {
  options = internals.validate(options || {});

  if (!schema.tree.slug) {
    schema.add({
      slug: String
    });
  }

  schema.pre('save', function(next) {
    var self = this;

    var value = options.properties.map(function(property) {
      return _.get(self, property)
    }).join(' ');

    this.slug = slug(value, options.slug);

    next();
  });
};
