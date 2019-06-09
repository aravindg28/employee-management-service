/**
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    employeeName: { type: 'string', required: true, maxLength: 150, },
    employeeEmail: { type: 'string', required: true, },
    projects:{
      collection: 'ProjectDetails',
      via: 'owner'
    },

  },

};

