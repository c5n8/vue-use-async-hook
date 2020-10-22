import type { PromiseSnapshot, Unpacked } from './types'
import { useAsyncWithHandler } from './use-async-with-handler'

export function useAsyncAndLogError<F extends (...args: any[]) => Promise<any>>(
  fn: F
): [
  (...args: Parameters<F>) => Promise<Unpacked<ReturnType<F>> | undefined>,
  PromiseSnapshot<Unpacked<ReturnType<F>>>
] {
  return useAsyncWithHandler(fn, {
    onRejected: (error) => console.error(error),
  })
}
