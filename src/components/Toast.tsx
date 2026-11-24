import { useCallback, useState } from "react";
import { CloseIcon } from "./Icons";

type Kind = "success" | "error" | "info";
type Item = { id: number; kind: Kind; text: string };
export type ToastFn = (kind: Kind, text: string) => void;

export function useToasts() {
  const [items, setItems] = useState<Item[]>([]);
  const dismiss = useCallback((id: number) => setItems((l) => l.filter((t) => t.id !== id)), []);
  const toast: ToastFn = useCallback(
    (kind, text) => {
      const id = Date.now() + Math.random();
      setItems((l) => [...l, { id, kind, text }]);
      window.setTimeout(() => dismiss(id), 6000);
    },
    [dismiss],
  );
  const view = (
    <div className="toasts" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.kind}`}>
          <p>{t.text}</p>
          <button aria-label="Dismiss" onClick={() => dismiss(t.id)}><CloseIcon size={16} /></button>
        </div>
      ))}
    </div>
  );
  return { toast, view };
}
