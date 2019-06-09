/**
 * ProjectDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    projectName: { type: 'string', maxLength: 200, },
    role: {type: 'string'},
    owner:{model:'Employee'},
  },

};

