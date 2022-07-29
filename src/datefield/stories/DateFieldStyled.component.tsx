import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import {
  DateField,
  DateFieldBaseStateProps,
  DateFieldLabel,
  DateSegment,
  useDateFieldBaseState,
  useDateFieldState,
} from "../../index";

export type DateFieldStyledProps = Omit<
  DateFieldBaseStateProps,
  "locale" | "createCalendar"
> & {};

export const DateFieldStyled: React.FC<DateFieldStyledProps> = props => {
  let { locale } = useLocale();

  const state = useDateFieldBaseState({ locale, createCalendar, ...props });
  const datefield = useDateFieldState({ ...props, state });

  return (
    <div className="datefield--wrapper">
      <DateFieldLabel state={datefield} className="datefield__label">
        {props.label}
      </DateFieldLabel>
      <DateField state={datefield} className="datefield">
        {state.segments.map((segment, i) => (
          <DateSegment
            key={i}
            segment={segment}
            state={state}
            className={` datefield__date-segment ${
              segment.isPlaceholder ? "datefield__placeholder" : ""
            }`}
          >
            {segment.text}
          </DateSegment>
        ))}
      </DateField>
    </div>
  );
};

export default DateFieldStyled;
