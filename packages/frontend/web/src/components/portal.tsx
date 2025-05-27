import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

export default function Portal({ children }: PortalProps) {
  return createPortal(
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
