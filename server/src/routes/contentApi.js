module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'contentApi.findAll',
    config: {
      policies: [],
      swagger: {
        summary: "Get list of redirects",
        description: "This endpoint returns all redirects stored in the system",
        responses: {
          "200": {
            description: "List of redirects",
          }
        }
      }
    },
  },
];
