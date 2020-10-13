<p align="center"><img width="100" height="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></p>

<h2 align="center">Vue Async Hook</h2>

<p align="center">
  Wrap async function with reactive and observable promise state.
</p>

#

## News

This version is compatible with Vue 2 using `@vue/composition-api` plugin.

## Tips

If you want similar functionality, but as component, then checkout [vue-promise-builder](https://github.com/c5n8/vue-promise-builder).

## Installation

- Using NPM
```
npm install vue-use-async-hook
```

- Using Yarn
```
yarn add vue-use-async-hook
```

## Usage

You must install `@vue/composition-api` as a plugin via `Vue.use()` beforehand.

See [@vue/composition-api](https://github.com/vuejs/composition-api).

This hook leverage [vue-extend-reactive](https://github.com/c5n8/vue-extend-reactive), so you don't have to worry about whether to use `.value` or not to acces reactive value, with one caveat that you don't destructure returned object to preserve reactivity.

⚠️ Do not destructure returned object!

```html
<template>
  <div>
    <div v-if="generation.isStandby">
      <div>Generate number 1-1000</div>
      <button @click="generate()">Start</button>
    </div>
    <div v-else-if="generation.isPending">
      Generating...
    </div>
    <div v-else-if="generation.isSettled">
      <div v-if="generation.isFulfilled">
        {{ generation.result }}
      </div>
      <div v-else-if="generation.isRejected">
        {{ generation.error }}
      </div>

      <button @click="generate()">Retry</button>
    </div>
  </div>
</template>

<script>
import { useAsync } from 'vue-use-async-hook'

export default {
  setup() {
    const generation = useAsync(async (min, max) => {
      await new Promise((resolve) => setTimeout(resolve, random(200, 2000)))
     
      if (random(0, 1)) {
        throw new Error('Failed to generate')
      }
     
      return random(min, max)
    })

    async function generate() {
      try {
        await generation.start(1, 1000)
      } catch (error) {
        //
      }
    }

    return {
      generation,
      generate,
    }
  },
}

function random(min, max) {
  return Math.floor(Math.random() * Math.floor(max - min + 1)) + min
}
</script>
```

## API Reference

```ts
declare function useAsync<
  F extends (...args: any[]) => Promise<Unpacked<ReturnType<F>>>
>(fn: F): PromiseSnapshot<F> {

interface PromiseSnapshot<F extends (...args: any[]) => Promise<unknown>> {
  readonly error: any
  readonly result: Unpacked<ReturnType<F>> | undefined
  readonly status: 'standby' | 'pending' | 'fulfilled' | 'rejected'
  readonly isStandby: boolean
  readonly isPending: boolean
  readonly isSettled: boolean
  readonly isFulfilled: boolean | undefined
  readonly isRejected: boolean | undefined
  readonly hasResult: boolean | undefined
  readonly hasError: boolean | undefined
  start(...args: Parameters<F>): ReturnType<F>
}
```

## License

[MIT](http://opensource.org/licenses/MIT)

tags: vue, use, async, function, promise, state, snapshot, reactive, observable, composition, hooks
