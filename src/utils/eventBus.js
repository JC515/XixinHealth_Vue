// eventBus.js

import {reactive} from 'vue';

const eventBus = reactive({
    events: new Map(),
// 注册事件监听
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
    },
// 注销事件监听
    off(event, callback) {
        if (this.events.has(event)) {
            const eventCallbacks = this.events.get(event);
            const index = eventCallbacks.indexOf(callback);
            if (index !== -1) {
                eventCallbacks.splice(index, 1);
            }
        }
    },
// 触发事件
    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(callback => callback(...args));
        }
    },
});

export default eventBus;
