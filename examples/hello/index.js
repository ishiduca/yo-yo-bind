const d      = require('global/document')
const yo     = require('yo-yo')
const app    = require('../../index')
const create = state => yo `<h1>${state}</h1>`
const state  = 'hello'

d.body.appendChild(app(create, state))
