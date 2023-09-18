import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  // register the custom field
  strapi.customFields.register({
    name: "helpme-custom-field",
    pluginId: "helpme-custom-field",
    // @ts-expect-error
    plugin: "helpme-custom-field",
    type: "json",
    inputSize: {
      default: 4,
      isResizable: true,
    },
  });
};
