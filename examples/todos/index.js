const d = require('global/document')
const app = require('../../index')
const create = require('./create')
const reduce = require('./reduce')
const state = require('./state')

d.body.appendChild(app(create, state, reduce))
