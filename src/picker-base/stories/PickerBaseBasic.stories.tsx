import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/PickerBaseBasicJsx";
import ts from "./templates/PickerBaseBasicTsx";
import { PickerBase } from "./PickerBaseBasic.component";

export default {
  component: PickerBase,
  title: "PickerBase/Basic",
  parameters: { preview: createPreviewTabs({ js, ts }) },
} as Meta;

export const Default: Story = args => <PickerBase {...args} />;

export const AlwaysVisible = Default.bind({});
AlwaysVisible.args = {
  visible: true,
};
