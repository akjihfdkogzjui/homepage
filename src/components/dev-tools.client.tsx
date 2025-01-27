"use client";

import { lazy, Suspense, useEffect, useState, type FC } from "react";


const shouldDisplay = Boolean(process.env.NEXT_PUBLIC_VERCEL_TOOLBAR_PROJECT_ID) && process.env.NODE_ENV === 'development';

const VercelToolbar = lazy(() => import('@vercel/toolbar/next').then(mod => ({ default: mod.VercelToolbar })));

const DevTools: FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    return () => {
      setReady(false);
    };
  }, []);

  return (
    <>
      {ready && shouldDisplay && (
        <Suspense>
          <VercelToolbar />
        </Suspense>
      )}
    </>
  );
};

export default DevTools;
