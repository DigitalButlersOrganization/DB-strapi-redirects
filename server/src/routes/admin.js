module.exports = [
  {
    method: 'POST',
    path: '/',
    handler: 'admin.create',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: 'admin.findAll',
    config: {
      policies: [],
    },
  },
  {
    method: 'DELETE',
    path: '/:id',
    handler: 'admin.delete',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/:id',
    handler: 'admin.findOne',
    config: {
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/:id',
    handler: 'admin.update',
    config: {
      policies: [],
    },
  },
];
