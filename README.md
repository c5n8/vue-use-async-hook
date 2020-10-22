<p align="center"><img width="100" height="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></p>

<h2 align="center">Vue Async Hook</h2>

<p align="center">
  Wrap async function with reactive and observable promise state.
</p>

#

## News

This version is compatible with Vue 3.
If you use Vue 2, see [Vue 2 compatible version](https://github.com/c5n8/vue-use-async-hook)

## Tips

If you want similar functionality, but as component, then checkout [vue-promise-builder](https://github.com/c5n8/vue-promise-builder).

## Installation

- Using NPM
```
npm install vue-use-async-hook@next
```

- Using Yarn
```
yarn add vue-use-async-hook@next
```

## Usage
This hook take a function as argument, then returns an array which contains:
- a function that has same signature as original function as first element
- a reactive promise snapshot object that reflect the state of promise returned by original function as second element

⚠️ Do not destructure reactive promise snapshot object!

```html
<template>
  <form @submit.prevent="submit">
    <div>
      <textarea v-model="payload.text" cols="30" rows="10"></textarea>
    </div>

    <button v-if="submission.isStandby">
      Submit
    </button>
    <button v-else-if="submission.isPending" disabled>
      Submitting...
    </button>
    <button v-if="submission.isRejected">
      Retry Submit
    </button>

    <div v-if="submission.isFulfilled">
      Submitted successfully!
    </div>
    <div v-else-if="submission.isRejected">
      Failed to submit!
      <div>{{ submission.error }}</div>
    </div>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useAsync } from 'vue-use-async-hook'

export default {
  setup() {
    const payload = reactive({
      text: 'The quick brown fox jumps over the lazy dog.',
    })

    const [submit, submission] = useAsync(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // uncomment next line to simulate failure
      // throw new Error('Server Error')
    })

    return {
      payload,
      submit,
      submission,
    }
  },
}
</script>
```

## API Reference

```ts
declare function useAsync<
  F extends (...args: any[]) => Promise<any>
>(fn: F): [F, PromiseSnapshot<Unpacked<ReturnType<F>>>] {

interface PromiseSnapshot<R> {
  readonly status: 'standby' | 'pending' | 'fulfilled' | 'rejected'
  readonly result: R | undefined
  readonly error: any
  readonly isStandby: boolean
  readonly isPending: boolean
  readonly isSettled: boolean
  readonly isFulfilled: boolean | undefined
  readonly isRejected: boolean | undefined
  readonly hasResult: boolean | undefined
  readonly hasError: boolean | undefined
}
```

## License

[MIT](http://opensource.org/licenses/MIT)

tags: vue, use, async, function, promise, state, snapshot, reactive, observable, composition, hooks
