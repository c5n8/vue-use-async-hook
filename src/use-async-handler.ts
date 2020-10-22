import type { PromiseSnapshot, Unpacked } from './types'
import useAsync from './use-async'

export function useAsyncHandler<F extends (...args: any[]) => Promise<any>>(
  fn: F,
  {
    onFulfilled,
    onRejected,
    onSettled,
  }: {
    onFulfilled?: (result: any) => void
    onRejected?: (error: any) => void
    onSettled?: () => void
  }
): [
  (...args: Parameters<F>) => Promise<Unpacked<ReturnType<F>> | undefined>,
  PromiseSnapshot<Unpacked<ReturnType<F>>>
] {
  const [_call, snapshot] = useAsync(fn)

  async function call(
    ...args: Parameters<F>
  ): Promise<Unpacked<ReturnType<F>> | undefined> {
    let result

    try {
      result = await _call(...args)
    } catch (error) {
      onRejected?.(error)

      return undefined
    } finally {
      onSettled?.()
    }

    onFulfilled?.(result)

    return result
  }

  return [call, snapshot]
}
