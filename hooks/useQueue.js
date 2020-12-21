import {useMemo, useState, useCallback} from 'react';

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
};

export default () => {
    const [stack, setStack] = useState([]);

    const register = useCallback(() => {
        const id = Math.random().toString(36).substr(2, 9);

        setTimeout(() => {
            setStack(fresh => {
                if (isIterable(fresh)) {
                    const newStack = [...fresh];
                    newStack.push(id);
                    return newStack;
                }
                return fresh;
            });
        }, 0);

        return id;
    }, []);

    const unregister = useCallback((id) => {
        setTimeout(() => {
            setStack(fresh => {
                const index = fresh.indexOf(id);
                if (index > -1) {
                    const newStack = [...fresh];
                    newStack.splice(index, 1);
                    return newStack;
                }
                return fresh;
            });
        }, 0);
    }, []);

    const current = stack && stack[0] ? stack[0] : false;

    return useMemo(() => ({register, unregister, current}), [register, unregister, current])
}