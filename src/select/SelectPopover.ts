import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useCreateElement } from "reakit-system/useCreateElement";
import { PopoverHTMLProps, PopoverOptions, usePopover } from "reakit";
import { useForkRef } from "reakit-utils";
import { useWarning } from "reakit-warning";

import { SELECT_POPOVER_KEYS } from "./__keys";
import { useTypeaheadShortcut } from "./helpers";
import {
  SelectListHTMLProps,
  SelectListOptions,
  useSelectList,
} from "./SelectList";
import { SelectStateReturn } from "./SelectState";

export const useSelectPopover = createHook<
  SelectPopoverOptions,
  SelectPopoverHTMLProps
>({
  name: "SelectPopover",
  compose: [useSelectList, usePopover],
  keys: SELECT_POPOVER_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);

    useTypeaheadShortcut({ options, ref });

    return {
      ref: useForkRef(ref, htmlRef),
      role: "listbox",
      ...htmlProps,
    };
  },
});

export const SelectPopover = createComponent({
  as: "div",
  useHook: useSelectPopover,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://www.w3.org/TR/wai-aria-1.1/#listbox",
    );
    return useCreateElement(type, props, children);
  },
});

export type SelectPopoverOptions = SelectListOptions &
  PopoverOptions &
  Pick<SelectStateReturn, "values" | "currentValue" | "valuesById">;

export type SelectPopoverHTMLProps = PopoverHTMLProps & SelectListHTMLProps;

export type SelectPopoverProps = SelectPopoverOptions & SelectPopoverHTMLProps;
