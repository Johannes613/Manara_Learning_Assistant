import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// 1. Create a dedicated component for rendering code blocks
// Its name starts with a capital letter, so it can use Hooks.
const CodeBlock = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return match ? (
    <Box sx={{ position: "relative" }}>
      <Tooltip title={copied ? "Copied!" : "Copy code"}>
        <IconButton
          aria-label="copy code"
          onClick={handleCopy}
          sx={{ position: "absolute", top: 8, right: 8, color: "grey.300" }}
        >
          {copied ? (
            <CheckIcon fontSize="small" />
          ) : (
            <ContentCopyIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div">
        {codeString}
      </SyntaxHighlighter>
    </Box>
  ) : (
    <code className={className}>{children}</code>
  );
};

// 2. The main renderer component remains clean
const MarkdownRenderer = ({ children }) => {
  const components = {
    // Tell ReactMarkdown to use our new component for `code` elements
    code({ node, inline, className, children, ...props }) {
      return !inline ? (
        <CodeBlock className={className} {...props}>
          {children}
        </CodeBlock>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
