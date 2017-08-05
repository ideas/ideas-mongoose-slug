'use strict';

// Load external modules
var Code = require('code');
var Lab = require('lab');
var Mongoose = require('mongoose');
var MongooseSlug = require('../');

// Declare test shortcuts
var lab = exports.lab = Lab.script();
var expect = Code.expect;

lab.before(function(done) {
  var dsn = 'mongodb://127.0.0.1:27017/test';
  Mongoose.connect(dsn, done);
});

lab.beforeEach(function(done) {
  Mongoose.models = {};
  done();
});

lab.describe('Mongoose slug plugin', function() {
  lab.it('throws an error when an invalid option is passed', function(done) {
    var ArticleSchema = new Mongoose.Schema({
      title: String,
      slug: String
    });

    expect(function() {
      ArticleSchema.plugin(MongooseSlug, { invalid: true });
    }).to.throw(Error);

    done();
  });

  lab.it('adds the slug property if it does not exist', function(done) {
    var ArticleSchema = new Mongoose.Schema({
      title: String
    });

    ArticleSchema.plugin(MongooseSlug);

    expect(ArticleSchema.tree.slug).to.exist();

    done();
  });

  lab.it('creates the slug with a single property', function(done) {
    var ArticleSchema = new Mongoose.Schema({
      title: String,
      slug: String
    });

    ArticleSchema.plugin(MongooseSlug);
    var Article = Mongoose.model('Article', ArticleSchema);

    Article.create({ title: 'Árvíztűrő Tükörfúrógép' }, function(err, article) {
      expect(err).to.not.exist();
      expect(article.slug).to.equal('Arvizturo-Tukorfurogep');

      done();
    });
  });

  lab.it('creates the slug with multiple properties', function(done) {
    var UserSchema = new Mongoose.Schema({
      name: {
        first: String,
        last: String
      },
      slug: String
    });

    UserSchema.plugin(MongooseSlug, { properties: ['name.first', 'name.last'] });
    var User = Mongoose.model('User', UserSchema);

    User.create({ name: { first: 'Árvíztűrő', last: 'Tükörfúrógép' } }, function(err, article) {
      expect(err).to.not.exist();
      expect(article.slug).to.equal('Arvizturo-Tukorfurogep');

      done();
    });
  });

  lab.it('accepts options for slug generation', function(done) {
    var ArticleSchema = new Mongoose.Schema({
      title: String,
      slug: String
    });

    ArticleSchema.plugin(MongooseSlug, { slug: { lower: true } });
    var Article = Mongoose.model('Article', ArticleSchema);

    Article.create({ title: 'Árvíztűrő Tükörfúrógép' }, function(err, article) {
      expect(err).to.not.exist();
      expect(article.slug).to.equal('arvizturo-tukorfurogep');

      done();
    });
  });
});
