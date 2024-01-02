"use client";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import { useEffect } from "react";

export function CodeSample1() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className="language-jsx">{sample1}</code>
    </pre>
  );
}

export function CodeSample2() {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight();
  }, []);

  return (
    <pre>
      <code className="language-typescript">{sample2}</code>
    </pre>
  );
}

const sample1 = `<Plug on="dashboard">
</Plug>`;
const sample2 = `"use server"
revalidatePlug("dashboard")`;
