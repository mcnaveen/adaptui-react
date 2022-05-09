import { useNumberFormatter } from "@react-aria/i18n";
import { SliderState, useSliderState } from "@react-stately/slider";
import { SliderProps } from "@react-types/slider";

export function useSliderBaseState(
  props: SliderBaseStateProps = {},
): SliderBaseState {
  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });

  return state;
}

export type SliderBaseState = SliderState & {};

export type SliderBaseStateProps = SliderProps & {
  /**
   * The display format of the value label.
   */
  formatOptions?: Intl.NumberFormatOptions;
};
