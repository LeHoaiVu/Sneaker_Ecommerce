import { useEffect } from 'react';

export const useFocus = (elId) => {
    useEffect(() => {
        const el = document.getElementById(elId);
        if (!el) {
            return;
        }
        el.focus();
    }, [elId]);
};
