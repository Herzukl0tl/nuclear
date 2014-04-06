'use strict';

var EntityIdGenerator, entityIdGenerator, emitter;

EntityIdGenerator = require('./entity-id-generator');
entityGenerator = new EntityIdGenerator();
emitter = require('./nuclear.events');

/**
 * The Entity constructor
 * @param {string} name   The Entity name
 * @param {Object} source The Entity config
 */
function Entity(name, definition) {
  this.name = name;
  this.definition = definition || function defaultDefinition(){};
}

Entity.next = function entityNext() {
  return entityIdGenerator.next();
};

/**
 * Create an entity depending on this Entity
 * @param  {object} options All the components data
 * @return {number}         The created entity
 */
Entity.prototype.create = function entityCreate(options) {
  var id = Entity.generator.next();
  this.definition(id, options);

  emitter.trigger('entity:create:' + this.name, id);
  emitter.trigger('entity:create_entity', id, this.name);
  return id;
};

/**
 * Enhance an entity with this factory definition
 * @param  {number} entity The entity to enhance
 * @param  {object} data Data to configure components
 * @return {number}            The entity to enhance
 */
Entity.prototype.enhance = function entityEnhance(entity, data) {
  this.definition(entity, data);

  return entity;
};

module.exports = Entity;
