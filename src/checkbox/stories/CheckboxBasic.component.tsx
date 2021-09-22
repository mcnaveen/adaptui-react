import * as React from "react";

import {
  Checkbox as RenderlesskitCheckbox,
  CheckboxInitialState,
  CheckboxProps as RenderlesskitCheckboxProps,
  splitStateProps,
  USE_CHECKBOX_STATE_KEYS,
  useCheckboxState,
} from "../../index";

export type CheckboxProps = RenderlesskitCheckboxProps &
  CheckboxInitialState & {};

export const Checkbox: React.FC<CheckboxProps> = props => {
  const [stateProps, checkboxProps] = splitStateProps<
    CheckboxInitialState,
    CheckboxProps
  >(props, USE_CHECKBOX_STATE_KEYS);

  const state = useCheckboxState(stateProps);

  return <RenderlesskitCheckbox {...state} {...checkboxProps} />;
};

export default Checkbox;
