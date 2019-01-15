import Vue, { ComponentOptions } from 'vue'
import { VueClass } from './declarations'
import { componentFactory, $internalHooks } from './component'

export { createDecorator, VueDecorator, mixins } from './util'

function Component <V extends Vue>(options: ComponentOptions<V> & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC
function Component <VC extends VueClass<Vue>>(target: VC): VC
function Component (options: ComponentOptions<Vue> | VueClass<Vue>): any {
  if (typeof options === 'function') {
    return componentFactory(options)
  }
  return function (Component: VueClass<Vue>) {
    return componentFactory(Component, options)
  }
}

Component.registerHooks = function registerHooks (keys: string[]): void {
  $internalHooks.push(...keys)
}

export default Component

// re-exports for additional extensibility
export { componentFactory, VueClass };
