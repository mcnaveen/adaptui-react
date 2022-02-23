import { As, Props } from "ariakit-utils/types";
import { HovercardDismissOptions } from "../hovercard/hovercard-dismiss";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that hides a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuDismiss({ state });
 * <Menu state={state}>
 *   <Role {...props} />
 * </Menu>
 * ```
 */
export declare const useMenuDismiss: import("ariakit-utils/types").Hook<MenuDismissOptions<"button">>;
/**
 * A component that renders a button that hides a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <Menu state={menu}>
 *   <MenuDismiss />
 * </Menu>
 * ```
 */
export declare const MenuDismiss: import("ariakit-utils/types").Component<MenuDismissOptions<"button">>;
export declare type MenuDismissOptions<T extends As = "button"> = Omit<HovercardDismissOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuState` hook. If not provided, the parent
     * `Menu` component's context will be used.
     */
    state?: MenuState;
};
export declare type MenuDismissProps<T extends As = "button"> = Props<MenuDismissOptions<T>>;
