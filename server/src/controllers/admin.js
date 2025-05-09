const admin = ({ strapi }) => ({
  async create(ctx) {
    ctx.body = await strapi.entityService.create('plugin::redirects.redirect', ctx.request.body);
  },

  async findAll(ctx) {
    ctx.body = await strapi.entityService.findMany('plugin::redirects.redirect');
  },

  async delete(ctx) {
    ctx.body = await strapi.entityService.delete('plugin::redirects.redirect', ctx.params.id);
  },

  async findOne(ctx) {
    ctx.body = await strapi.entityService.findOne('plugin::redirects.redirect', ctx.params.id);
  },

  async update(ctx) {
    ctx.body = await strapi.entityService.update('plugin::redirects.redirect', ctx.params.id, ctx.request.body);
  },
});

export default admin;
