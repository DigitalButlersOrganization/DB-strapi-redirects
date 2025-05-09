const bootstrap = ({ strapi }) => {
  if (strapi.plugin('documentation')) {
    const override = {
      info: { version: '1.0.0' },
      paths: {
        '/redirects': {
          get: {
            summary: 'Redirects list',
            description: 'Redirects list',
            responses: { 200: { description: 'success' } },
            tags: ['Redirects'],
            parameters: [
              {
                name: 'x-api-key',
                in: 'header',
                description: 'API Key for authentication',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],
          },
        },
      },
    };

    strapi.plugin('documentation').service('override').registerOverride(override);
  }
};

export default bootstrap;
