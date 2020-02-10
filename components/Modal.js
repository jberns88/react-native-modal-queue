import React, {useContext, useRef, useMemo, useEffect, useCallback} from 'react';
import {Platform} from 'react-native';
import Modal from 'react-native-modal';

import Context from './context';

const WrappedModal = (props) => {
    const {isVisible = false, onModalHide} = props;
    const context = useContext(Context);

    if (!context) {
        throw new Error('No context found. Ensure that you have added a QueueProvider.')
    }

    const {current, register, unregister} = context;

    const ref = useRef(useMemo(() => isVisible ? register() : false, []));

    useEffect(() => {
        if (isVisible && !ref.current) {
            const newId = register();
            ref.current = newId;
        }
    }, [isVisible]);

    useEffect(() => () => {
            if (ref.current) {
                // Can't see any other way. There is no feedback when it's unmounted this way so we just have to wait, guess and hope it's gone.
                setTimeout(() => unregister(ref.current), 100);
            }
        }, []);

    const wrappedOnModalHide = useCallback((...args) => {
        if (onModalHide) {
            onModalHide(...args);
        }

        unregister(ref.current);
        ref.current = false;
    }, [onModalHide]);


    if (!current || !ref || current !== ref.current) {
        return null;
    }

    return <Modal {...props} onModalHide={wrappedOnModalHide}/>;
}

export default WrappedModal;