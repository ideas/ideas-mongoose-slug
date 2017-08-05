# Mongoose Slug

A Mongoose plugin that generates a slug on save.

[![Build Status](https://travis-ci.org/nesive/mongoose-slug.svg)](https://travis-ci.org/nesive/mongoose-slug)

## Installation

```bash
npm install --save @nesive/mongoose-slug
```

## Usage

Require the plugin and use `Mongoose.Schema.plugin()` to include it.

```js
var Mongoose = require('mongoose');
var MongooseSlug = require('@nesive/mongoose-slug');

var ArticleSchema = new Mongoose.Schema({
  title: String,
  slug: String
});

ArticleSchema.plugin(MongooseSlug);
```

## Configuration

* `properties`: Document properties that are used to generate the slug. Can be a single string, or an array of strings. Default is `title`.

```js
ArticleSchema.plugin(MongooseSlug, { properties: 'author' });
ArticleSchema.plugin(MongooseSlug, { properties: ['author', 'title'] });
```

* `slug`: An object of rules to generate the slug.
  * `mode`: Set mode to `pretty` or `rfc3986`. Default is `pretty`.
  * `replacement`: Replace spaces with replacement.
  * `symbols`: Replace unicode symbols or not.
  * `remove`: Regex to remove characters.
  * `lower`: Result in lower case.
  * `charmap`: Replace special characters.
  * `multicharmap`: Replace multi-characters.

```js
ArticleSchema.plugin(MongooseSlug, { slug: { lower: true } });
```
