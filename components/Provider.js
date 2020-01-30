import React, { createContext, useMemo, useState, useCallback} from 'react';
import Context from './context';

import useStack from '../hooks/useQueue';

const QueueProvider = (props) => {
    const stack = useStack();

    return <Context.Provider {...props} value={stack}/>
};

export default QueueProvider;
