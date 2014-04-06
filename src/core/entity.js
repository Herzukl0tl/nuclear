'use strict';

var nuclearEntityGenerator = new (require('./nuclearEntity-id-generator'))(0);

/**
 * The Entity constructor
 * @param {string} name   The Entity name
 * @param {Object} source The Entity config
 */
function Entity(name, source) {
  this.name = name;
  this.definition = function defaultDefinition(entity, data){
    
  };
}

Entity.generator = nuclearEntityGenerator;

/**
 * Create an entity depending on this Entity
 * @param  {object} options All the components data
 * @return {number}         The created entity
 */
Entity.prototype.create = function EntityCreate(options) {
  var id = Entity.generator.next();
  this.definition(id, options);
  
  // entity.trigger('create:' + this.name, id);
  // entity.trigger('create_entity', id, this.name);
  return id;
};

/**
 * Enhance an entity with this factory definition
 * @param  {number} entity The entity to enhance
 * @param  {object} data Data to configure components
 * @return {number}            The entity to enhance
 */
Entity.prototype.enhance = function EntityDeSerialize(entity, data) {
  this.definition(entity, data);

  return entity;
};

module.exports = Entity;