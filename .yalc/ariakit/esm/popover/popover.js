import { useState, useEffect } from 'react';
import { useForkRef, useSafeLayoutEffect, useWrapElement } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useDialog } from '../dialog/dialog.js';
import { P as PopoverContext } from '../__utils-3e6151ed.js';
import { jsx } from 'react/jsx-runtime';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopover({ state });
 * <Role {...props}>Popover</Role>
 * ```
 */
const usePopover = createHook(_ref => {
  let {
    state,
    modal = false,
    portal = !!modal,
    preserveTabOrder = true,
    autoFocusOnShow = true,
    wrapperProps,
    ...props
  } = _ref;
  const popoverRef = state.popoverRef;
  const [portalNode, setPortalNode] = useState(null);
  const portalRef = useForkRef(setPortalNode, props.portalRef); // When the popover is rendered within a portal, we need to wait for the
  // portalNode to be created so we can update the popover position.

  useSafeLayoutEffect(() => {
    if (!portalNode) return;
    if (!state.mounted) return;
    state.render();
  }, [portalNode, state.mounted, state.render]); // Makes sure the wrapper element that's passed to popper has the same
  // z-index as the popover element so users only need to set the z-index
  // once.

  useSafeLayoutEffect(() => {
    const wrapper = popoverRef.current;
    const popover = state.contentElement;
    if (!wrapper) return;
    if (!popover) return;
    wrapper.style.zIndex = getComputedStyle(popover).zIndex;
  }, [popoverRef, state.contentElement]);
  const [canAutoFocusOnShow, setCanAutoFocusOnShow] = useState(false); // We can't move focus right after the popover is shown. Otherwise we may
  // see some scroll jumps (when it's absolutely positioned), or VoiceOver may
  // not move focus (even when the position is fixed). So we wait a bit so
  // Popper can finish positioning the popover before we move focus.

  useEffect(() => {
    setCanAutoFocusOnShow(state.mounted && !!state.contentElement);
  }, [state.mounted, state.contentElement]); // Wrap our element in a div that will be used to position the popover.
  // This way the user doesn't need to override the popper's position to
  // create animations.

  props = useWrapElement(props, element => /*#__PURE__*/jsx("div", {
    role: "presentation",
    ...wrapperProps,
    // Avoid the wrapper from taking space when used within a flexbox
    // container with the gap property.
    style: {
      position: "fixed",
      ...(wrapperProps == null ? void 0 : wrapperProps.style)
    },
    ref: popoverRef,
    children: element
  }), [popoverRef, wrapperProps]);
  props = useWrapElement(props, element => /*#__PURE__*/jsx(PopoverContext.Provider, {
    value: state,
    children: element
  }), [state]);
  props = { ...props,
    style: {
      position: "relative",
      ...props.style
    }
  };
  props = useDialog({
    state,
    modal,
    preserveTabOrder,
    portal,
    autoFocusOnShow: canAutoFocusOnShow && autoFocusOnShow,
    ...props,
    portalRef
  });
  return props;
});
/**
 * A component that renders a popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverDisclosure state={popover}>Disclosure</PopoverDisclosure>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */

const Popover = createComponent(props => {
  const htmlProps = usePopover(props);
  return createElement("div", htmlProps);
});

export { Popover, usePopover };
