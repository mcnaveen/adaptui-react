/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Progress Component [Progress](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/progress)
 * to work with Reakit System
 */
import { BoxHTMLProps, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { PROGRESS_KEYS } from "./__keys";
import { useProgressReturn } from "./ProgressState";

export const useProgress = createHook<useProgressReturn, BoxHTMLProps>({
  name: "Progress",
  compose: useBox,
  keys: PROGRESS_KEYS,

  useProps(options, { style: htmlStyle, ...htmlProps }) {
    return {
      ...htmlProps,
      style: { ...htmlStyle, overflow: "hidden", position: "relative" },
    };
  },
});

export const Progress = createComponent({
  as: "div",
  memo: true,
  useHook: useProgress,
});
