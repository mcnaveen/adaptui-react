import { useContext, useMemo } from 'react';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { P as PopoverContext } from '../__utils-3e6151ed.js';
import { jsx } from 'react/jsx-runtime';

const pointsMap = {
  top: "4,10 8,6 12,10",
  right: "6,4 10,8 6,12",
  bottom: "4,6 8,10 12,6",
  left: "10,4 6,8 10,12"
};
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow pointing to the popover position. It's
 * usually rendered inside the `PopoverDisclosure` component.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopoverDisclosureArrow({ state });
 * <PopoverDisclosure state={state}>
 *   Disclosure
 *   <Role {...props} />
 * </PopoverDisclosure>
 * ```
 */

const usePopoverDisclosureArrow = createHook(_ref => {
  var _state;

  let {
    state,
    ...props
  } = _ref;
  const context = useContext(PopoverContext);
  state = state || context;
  const dir = (_state = state) == null ? void 0 : _state.placement.split("-")[0];
  const points = pointsMap[dir];
  const children = useMemo(() => /*#__PURE__*/jsx("svg", {
    display: "block",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5pt",
    viewBox: "0 0 16 16",
    height: "1em",
    width: "1em",
    children: /*#__PURE__*/jsx("polyline", {
      points: points
    })
  }), [points]);
  props = {
    children,
    "aria-hidden": true,
    ...props,
    style: {
      width: "1em",
      height: "1em",
      pointerEvents: "none",
      ...props.style
    }
  };
  return props;
});
/**
 * A component that renders an arrow pointing to the popover position. It's
 * usually rendered inside the `PopoverDisclosure` component.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverDisclosure state={popover}>
 *   Disclosure
 *   <PopoverDisclosureArrow />
 * </PopoverDisclosure>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */

const PopoverDisclosureArrow = createComponent(props => {
  const htmlProps = usePopoverDisclosureArrow(props);
  return createElement("span", htmlProps);
});

export { PopoverDisclosureArrow, usePopoverDisclosureArrow };
