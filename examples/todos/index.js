const d      = require('global/document')
const yo     = require('yo-yo')
const app    = require('../../index')
const create = require('./create')
const reduce = require('./reduce')
const state  = require('./state')

d.body.appendChild(app(create, state, reduce))
