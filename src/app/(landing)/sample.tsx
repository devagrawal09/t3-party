"use client";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import { useEffect } from "react";

export function CodeSample(props: {}) {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight();
  }, []);

  return (
    <pre>
      <code className="language-typescript">{sample}</code>
    </pre>
  );
}

const sample = `useEffect(() => {
  const highlight = async () => {
    await Prism.highlightAll();
  };
  highlight();
}, []);`;
