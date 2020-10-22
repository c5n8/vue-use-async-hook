import { Getters } from './Getters'
import { State } from './State'

export interface PromiseSnapshot<R> extends Readonly<State<R>>, Getters {}
