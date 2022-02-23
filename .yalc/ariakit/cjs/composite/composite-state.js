'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var array = require('ariakit-utils/array');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var collection_collectionState = require('../collection/collection-state.js');
var __utils = require('../__utils-57ccda4f.js');

/**
 * Provides state for the `Composite` component.
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 *   <CompositeItem>Item 3</CompositeItem>
 * </Composite>
 * ```
 */

function useCompositeState(_temp) {
  var _props$includesBaseEl;

  let {
    orientation = "both",
    rtl = false,
    virtualFocus = false,
    focusLoop = false,
    focusWrap = false,
    focusShift = false,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const collection = collection_collectionState.useCollectionState(props);
  const baseRef = react.useRef(null);
  const [moves, setMoves] = hooks.useControlledState(0, props.moves, props.setMoves);
  const [_activeId, setActiveId] = hooks.useControlledState(props.defaultActiveId, props.activeId, props.setActiveId);
  const activeId = react.useMemo(() => __utils.getActiveId(collection.items, _activeId), [collection.items, _activeId]);
  const initialActiveId = hooks.useInitialValue(activeId);
  const includesBaseElement = (_props$includesBaseEl = props.includesBaseElement) != null ? _props$includesBaseEl : initialActiveId === null;
  const activeIdRef = hooks.useLiveRef(activeId);
  const move = react.useCallback(id => {
    // move() does nothing
    if (id === undefined) return;
    setMoves(prevMoves => prevMoves + 1);
    setActiveId(id);
  }, []);
  const first = react.useCallback(() => {
    const firstItem = __utils.findFirstEnabledItem(collection.items);
    return firstItem == null ? void 0 : firstItem.id;
  }, [collection.items]);
  const last = react.useCallback(() => {
    const firstItem = __utils.findFirstEnabledItem(array.reverseArray(collection.items));
    return firstItem == null ? void 0 : firstItem.id;
  }, [collection.items]);
  const getNextId = react.useCallback((items, orientation, hasNullItem, skip) => {
    // RTL doesn't make sense on vertical navigation
    const isHorizontal = orientation !== "vertical";
    const isRTL = rtl && isHorizontal;
    const allItems = isRTL ? array.reverseArray(items) : items; // If there's no item focused, we just move the first one.

    if (activeIdRef.current == null) {
      var _findFirstEnabledItem;

      return (_findFirstEnabledItem = __utils.findFirstEnabledItem(allItems)) == null ? void 0 : _findFirstEnabledItem.id;
    }

    const activeItem = allItems.find(item => item.id === activeIdRef.current); // If there's no item focused, we just move to the first one.

    if (!activeItem) {
      var _findFirstEnabledItem2;

      return (_findFirstEnabledItem2 = __utils.findFirstEnabledItem(allItems)) == null ? void 0 : _findFirstEnabledItem2.id;
    }

    const isGrid = !!activeItem.rowId;
    const activeIndex = allItems.indexOf(activeItem);
    const nextItems = allItems.slice(activeIndex + 1);
    const nextItemsInRow = __utils.getItemsInRow(nextItems, activeItem.rowId); // Home, End, PageUp, PageDown

    if (skip !== undefined) {
      const nextEnabledItemsInRow = __utils.getEnabledItems(nextItemsInRow, activeIdRef.current);
      const nextItem = nextEnabledItemsInRow.slice(skip)[0] || // If we can't find an item, just return the last one.
      nextEnabledItemsInRow[nextEnabledItemsInRow.length - 1];
      return nextItem == null ? void 0 : nextItem.id;
    }

    const oppositeOrientation = __utils.getOppositeOrientation( // If it's a grid and orientation is not set, it's a next/previous
    // call, which is inherently horizontal. up/down will call next with
    // orientation set to vertical by default (see below on up/down
    // methods).
    isGrid ? orientation || "horizontal" : orientation);
    const canLoop = focusLoop && focusLoop !== oppositeOrientation;
    const canWrap = isGrid && focusWrap && focusWrap !== oppositeOrientation; // previous and up methods will set hasNullItem, but when calling next
    // directly, hasNullItem will only be true if if it's not a grid and
    // focusLoop is set to true, which means that pressing right or down keys
    // on grids will never focus the composite container element. On
    // one-dimensional composites that don't loop, pressing right or down
    // keys also doesn't focus on the composite container element.

    hasNullItem = hasNullItem || !isGrid && canLoop && includesBaseElement;

    if (canLoop) {
      const loopItems = canWrap && !hasNullItem ? allItems : __utils.getItemsInRow(allItems, activeItem.rowId);
      const sortedItems = __utils.flipItems(loopItems, activeIdRef.current, hasNullItem);
      const nextItem = __utils.findFirstEnabledItem(sortedItems, activeIdRef.current);
      return nextItem == null ? void 0 : nextItem.id;
    }

    if (canWrap) {
      const nextItem = __utils.findFirstEnabledItem( // We can use nextItems, which contains all the next items, including
      // items from other rows, to wrap between rows. However, if there is
      // a null item (the composite container), we'll only use the next
      // items in the row. So moving next from the last item will focus on
      // the composite container. On grid composites, horizontal navigation
      // never focuses on the composite container, only vertical.
      hasNullItem ? nextItemsInRow : nextItems, activeIdRef.current);
      const nextId = hasNullItem ? (nextItem == null ? void 0 : nextItem.id) || null : nextItem == null ? void 0 : nextItem.id;
      return nextId;
    }

    const nextItem = __utils.findFirstEnabledItem(nextItemsInRow, activeIdRef.current);

    if (!nextItem && hasNullItem) {
      return null;
    }

    return nextItem == null ? void 0 : nextItem.id;
  }, [focusLoop, focusWrap, includesBaseElement]);
  const next = react.useCallback(skip => {
    return getNextId(collection.items, orientation, false, skip);
  }, [getNextId, collection.items, orientation]);
  const previous = react.useCallback(skip => {
    var _findFirstEnabledItem3;

    // If activeId is initially set to null or if includesBaseElement is set
    // to true, then the composite container will be focusable while
    // navigating with arrow keys. But, if it's a grid, we don't want to
    // focus on the composite container with horizontal navigation.
    const isGrid = !!((_findFirstEnabledItem3 = __utils.findFirstEnabledItem(collection.items)) != null && _findFirstEnabledItem3.rowId);
    const hasNullItem = !isGrid && includesBaseElement;
    return getNextId(array.reverseArray(collection.items), orientation, hasNullItem, skip);
  }, [collection.items, getNextId, orientation, includesBaseElement]);
  const down = react.useCallback(skip => {
    const shouldShift = focusShift && !skip; // First, we make sure rows have the same number of items by filling it
    // with disabled fake items. Then, we reorganize the items.

    const verticalItems = __utils.verticalizeItems(array.flatten2DArray(__utils.normalizeRows(__utils.groupItemsByRows(collection.items), activeIdRef.current, shouldShift)));
    const canLoop = focusLoop && focusLoop !== "horizontal"; // Pressing down arrow key will only focus on the composite container if
    // loop is true, both, or vertical.

    const hasNullItem = canLoop && includesBaseElement;
    return getNextId(verticalItems, "vertical", hasNullItem, skip);
  }, [collection.items, getNextId, focusShift, focusLoop]);
  const up = react.useCallback(skip => {
    const shouldShift = focusShift && !skip;
    const verticalItems = __utils.verticalizeItems(array.reverseArray(array.flatten2DArray(__utils.normalizeRows(__utils.groupItemsByRows(collection.items), activeIdRef.current, shouldShift)))); // If activeId is initially set to null, we'll always focus on the
    // composite container when the up arrow key is pressed in the first row.

    const hasNullItem = includesBaseElement;
    return getNextId(verticalItems, "vertical", hasNullItem, skip);
  }, [collection.items, getNextId, focusShift]);
  const state = react.useMemo(() => ({ ...collection,
    baseRef,
    orientation,
    rtl,
    virtualFocus,
    focusLoop,
    focusWrap,
    focusShift,
    moves,
    setMoves,
    includesBaseElement,
    activeId,
    setActiveId,
    move,
    next,
    previous,
    up,
    down,
    first,
    last
  }), [collection, baseRef, orientation, rtl, virtualFocus, focusLoop, focusWrap, focusShift, moves, setMoves, includesBaseElement, activeId, setActiveId, move, next, previous, up, down, first, last]);
  return store.useStorePublisher(state);
}

exports.useCompositeState = useCompositeState;
