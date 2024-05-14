import {PubSubEngine} from 'graphql-subscriptions';
import {PubSubAsyncIterator} from './pubsubAsyncIterator.js';
import { logger } from '../logger.js'
const log = logger.child({componant:"logpubsub"});
type OnMessage<T> = (message: T) => void;

export interface LogPubSubOptions {

}


export class LogPubSub implements PubSubEngine {
    private readonly subscriptionMap: { [subId: number]: [string, OnMessage<any>] };
    private readonly subsRefsMap: Map<string, Set<number>>;
    private currentSubscriptionId: number;

    constructor(options:LogPubSubOptions) {
        this.subscriptionMap = {};
        this.subsRefsMap = new Map<string, Set<number>>();
        this.currentSubscriptionId = 0;
        log.info('LogPubSub.constructor', options)
    }

    public async publish<T>(trigger: string, payload: T): Promise<void> {
        //await this.redisPublisher.publish(trigger, this.serializer ? this.serializer(payload) : JSON.stringify(payload));
        log.info('TODO', 'publish', trigger, payload)
        return Promise.resolve();
    }
    public asyncIterator<T>(triggers: string | string[], options?: object): AsyncIterator<T> {
        return new PubSubAsyncIterator<T>(this, triggers, options);
    }

    public subscribe<T = any>(triggerName: string, onMessage: OnMessage<T>, options?: Object): Promise<number> {
        //const [namespace, pod_name, name] = triggerName.split('|');
        const id = this.currentSubscriptionId++;
        this.subscriptionMap[id] = [triggerName, onMessage];
        if (!this.subsRefsMap.has(triggerName)) {
            this.subsRefsMap.set(triggerName, new Set());
        }
        const refs = this.subsRefsMap.get(triggerName);
        log.info('LogPubSub.subscribe', triggerName, options, id, this.subscriptionMap, this.subsRefsMap)
        if (refs != undefined && refs.size > 0) {
            refs.add(id);
            return Promise.resolve(id);
        } else {
            return new Promise<number>((resolve, reject) => {
                log.info('TODO', 'Create the source for', triggerName, reject)
                resolve(id);
            })
        }
    }
    public unsubscribe(subId: number) {
        const [triggerName = null] = this.subscriptionMap[subId] || [];
        if (triggerName == null) throw new Error(`There is no subscription of id "${subId}"`);
        const refs = this.subsRefsMap.get(triggerName);
        if (!refs) throw new Error(`There is no subscription of id "${subId}"`);
        if (refs.size === 1) {
            log.info('TODO', 'Deleting stream source for', triggerName)
            this.subsRefsMap.delete(triggerName);
        } else {
            refs.delete(subId);
        }
        delete this.subscriptionMap[subId];
    }
}