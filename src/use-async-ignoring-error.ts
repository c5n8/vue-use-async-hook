import type { PromiseSnapshot, Unpacked } from './types'
import { useAsyncWithHandler } from './use-async-with-handler'

export function useAsyncIgnoringError<
  F extends (...args: any[]) => Promise<any>
>(
  fn: F
): [
  (...args: Parameters<F>) => Promise<Unpacked<ReturnType<F>> | undefined>,
  PromiseSnapshot<Unpacked<ReturnType<F>>>
] {
  return useAsyncWithHandler(fn, {
    onRejected: () => {},
  })
}
