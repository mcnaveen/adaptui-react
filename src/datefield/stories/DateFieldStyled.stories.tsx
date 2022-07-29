import React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/DateFieldStyledJsx";
import ts from "./templates/DateFieldStyledTsx";
import { DateFieldStyled } from "./DateFieldStyled.component";

import "./DateFieldStyled.css";

type Meta = ComponentMeta<typeof DateFieldStyled>;
// type Story = ComponentStoryObj<typeof DateFieldStyled>;

export default {
  title: "DateField/Styled",
  component: DateFieldStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default = () => {
  return <DateFieldStyled label="DateField" />;
};
