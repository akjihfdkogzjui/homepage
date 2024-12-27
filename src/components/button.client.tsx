"use client";

import { type HTMLAttributes, type FC, useCallback, useState, KeyboardEventHandler } from "react";


interface IButtonProps {
  onTrigger(): void | Promise<void>;
  onFailed?(reason: Error): void;
  disabled?: boolean;
}

const Button: FC<IButtonProps & Omit<HTMLAttributes<HTMLButtonElement>, keyof IButtonProps>> = ({ onTrigger, onFailed, disabled, children, ...props }) => {
  const [busy, setBusy] = useState(false);
  const unusable = disabled || busy;
  const handleTrigger = useCallback(async () => {
    if (unusable) {
      return;
    }
    try {
      setBusy(true);
      await onTrigger();
    } catch (error) {
      onFailed?.(error instanceof Error ? error : new Error(`${error}`));
    } finally {
      setBusy(false);
    }
  }, [unusable, onTrigger, onFailed]);
  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLButtonElement>>(ev => {
    if (ev.key === " ") {
      handleTrigger();
    }
  }, [handleTrigger]);

  return (
    <button
      {...props}
      disabled={unusable}
      onClick={handleTrigger}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {children}
    </button>
  );
};


export default Button;
