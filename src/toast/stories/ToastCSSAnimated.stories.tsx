import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastCssTemplate,
  toastCssAnimatedTemplate,
  toastCssAnimatedTemplateJs,
} from "./templates";
import "./Toast.css";
import { App as Toast } from "./ToastCSSAnimated.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Toast,
  title: "Toast/CSSAnimated",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: toastCssAnimatedTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastCssAnimatedTemplate,
      tsUtils: utilsTemplate,
      css: toastCssTemplate,
      deps: ["@chakra-ui/utils"],
    }),
  },
  decorators: [
    Story => {
      document.body.id = "toast";
      return (
        <div
          style={{
            height: "90vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
} as Meta;

export const Default = () => <Toast />;
