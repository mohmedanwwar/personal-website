import { useEffect, useState } from "react";

// Types each word, pauses, deletes it, moves to the next. Shows the first word, still, when motion is reduced.
export function useTyped(words: string[], speed = 70, pause = 1800) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [text, setText] = useState(reduce ? words[0] : "");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[i % words.length];
    let t: number;
    if (!deleting && text === word) t = window.setTimeout(() => setDeleting(true), pause);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
      return;
    } else {
      t = window.setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? speed / 2 : speed,
      );
    }
    return () => window.clearTimeout(t);
  }, [text, deleting, i, words, speed, pause, reduce]);

  return text;
}
