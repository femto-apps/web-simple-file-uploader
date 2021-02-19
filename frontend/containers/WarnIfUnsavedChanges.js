import { useEffect } from 'react';
import Router from 'next/router';

function useWarnIfUnsavedChanges(unsavedChanges) {
    const message = 'Do you want to leave?';

    useEffect(() => {
        const routeChangeStart = url => {
            if (Router.asPath !== url && unsavedChanges && !confirm(message)) {
                Router.events.emit('routeChangeError');
                Router.replace(Router, Router.asPath);
                throw 'Abort route change. Please ignore this error.';
            }
        };

        const beforeunload = e => {
            if (unsavedChanges) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', beforeunload);
        Router.events.on('routeChangeStart', routeChangeStart);

        return () => {
            window.removeEventListener('beforeunload', beforeunload);
            Router.events.off('routeChangeStart', routeChangeStart);
        };
    }, [unsavedChanges]);
};

export default useWarnIfUnsavedChanges