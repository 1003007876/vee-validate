import { FormContextSymbol } from './symbols';
import { FormContext, SubmissionHandler, SubmitEvent } from './types';
import { injectWithSelf, warn } from './utils';

export function useSubmitForm<TValues extends Record<string, unknown> = Record<string, unknown>>(
  cb: SubmissionHandler<TValues>
) {
  const form = injectWithSelf(FormContextSymbol) as FormContext<TValues> | undefined;
  if (!form) {
    warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
  }

  const onSubmit = form ? form.handleSubmit(cb) : undefined;

  return function submitForm(e?: SubmitEvent) {
    if (!onSubmit) {
      return;
    }

    return onSubmit(e);
  };
}
