const contentApi = ({ strapi }) => ({
    async findAll(ctx) {
        if (ctx.request.headers['x-api-key'] !== process.env.X_API_KEY) {
            return ctx.forbidden('Access forbidden: Invalid API Key');
        }

        ctx.body = await strapi.entityService.findMany('plugin::redirects.redirect');
    },
});

export default contentApi;
