import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import getTrad from "./utils/getTrad";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: "helpme-custom-field",
      type: "text",
      private: true,
      intlLabel: {
        id: getTrad("form.label"),
        defaultMessage: "Help message",
      },
      intlDescription: {
        id: getTrad("form.description"),
        defaultMessage: "Will display an help message next to the field",
      },
      components: {
        Input: async () => {
          return await import(
            /* webpackChunkName: "helpme" */ "./components/Input"
          );
        },
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Help message",
            },
            items: [
              {
                name: "options.format",
                type: "text",
                value: "",
                intlLabel: {
                  id: "form.attribute.item",
                  defaultMessage: "Title",
                },
                description: {
                  id: "form.attribute.item.description",
                  defaultMessage:
                    "Title of the help message. If empty, the message will be displayed as is",
                },
              },
              {
                name: "options.message",
                type: "textarea",
                value: "",
                intlLabel: {
                  id: "form.attribute.item",
                  defaultMessage: "Message",
                },
                description: {
                  id: "form.attribute.item.description",
                  defaultMessage:
                    "Message of the help message. If empty, the message will not be displayed",
                },
              },
            ],
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "private",
                type: "checkbox",
                defaultValue: true,
                intlLabel: {
                  id: "form.attribute.item.privateField",
                  defaultMessage: "Private field",
                },
                description: {
                  id: "form.attribute.item.privateField.description",
                  defaultMessage:
                    "This field will not show up in the API response",
                },
              },
            ],
          },
        ],
        validator: () => {},
      },
    });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
