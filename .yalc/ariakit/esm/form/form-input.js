import { useCallback } from 'react';
import { useEventCallback } from 'ariakit-utils/hooks';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { F as FormContext } from '../__utils-6eda8bb9.js';
import { useFormField } from './form-field.js';
import { useFocusable } from '../focusable/focusable.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a form input. Unline `useFormField`, this hook
 * returns the `value` and `onChange` props that can be passed to a native
 * input, select or textarea elements.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { email: "" } });
 * const props = useFormInput({ state, name: state.names.email });
 * <Form state={state}>
 *   <FormLabel name={state.names.email}>Email</FormLabel>
 *   <Role as="input" {...props} />
 * </Form>
 * ```
 */
const useFormInput = createHook(_ref => {
  var _state2, _state3;

  let {
    state,
    name: nameProp,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = useStore(state || FormContext, ["setValue", useCallback(s => s.getValue(name), [name])]);
  const onChangeProp = useEventCallback(props.onChange);
  const onChange = useCallback(event => {
    var _state;

    onChangeProp(event);
    if (event.defaultPrevented) return;
    (_state = state) == null ? void 0 : _state.setValue(name, event.target.value);
  }, [onChangeProp, (_state2 = state) == null ? void 0 : _state2.setValue, name]);
  const value = (_state3 = state) == null ? void 0 : _state3.getValue(name);
  props = {
    value,
    ...props,
    onChange
  };
  props = useFocusable(props);
  props = useFormField({
    state,
    name,
    ...props
  });
  return props;
});
/**
 * A component that renders a form input. Unline `FormField`, this component
 * passes the `value` and `onChange` props down to the underlying element that
 * can be a native input, select or textarea elements.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { email: "" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.email}>Email</FormLabel>
 *   <FormInput name={form.names.email} />
 * </Form>
 * ```
 */

const FormInput = createMemoComponent(props => {
  const htmlProps = useFormInput(props);
  return createElement("input", htmlProps);
});

export { FormInput, useFormInput };
