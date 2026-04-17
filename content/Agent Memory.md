---
title: Agent Memory
aliases: [short-term memory, long-term memory, RAG, agent context]
tags: [concept, AI, agents, memory, RAG]
created: 2026-04-05
updated: 2026-04-05
source: "[[ai-agents-full-course-for-laymen]]"
type: concept
---

# Agent Memory

![[Attachments/agents-memory.jpg]]

People massively overcomplicate agent memory. The reality is that most agents don't need complex memory at all, and the ones that do usually only need one of two simple forms.

## Two Types of Memory

### 1. Short-Term Memory (Conversation)

What has been said so far in the current session. This is the message history — the running log of user inputs and agent responses that the LLM reasons over.

**You already get this by default.** Most SDKs handle it automatically. Just don't reset the messages between turns.

### 2. Long-Term Memory (External Knowledge)

Information the agent can look up — your notes, PDFs, documents, databases, prior session records. This is what people usually mean when they say "RAG" (Retrieval-Augmented Generation).

**You have to build this.** It requires either file search tools or a vector database.

## Do You Actually Need Memory?

Ask these questions before adding any memory:

| Question | If yes → |
|----------|----------|
| Does the agent need to remember things across messages in the same session? | Short-term (already built in) |
| Does it need to use external documents or knowledge? | Long-term (file search or RAG) |
| Neither? | You probably don't need memory |

## The Three Options

**Option A: No memory (start here)**
Works for 70%+ of use cases. The agent reasons over the current conversation only. Simple, cheap, reliable.

**Option B: Conversation memory**
Already handled in most SDKs — just don't reset messages. The full conversation history becomes the agent's working memory.

**Option C: File-based memory (easy RAG)**
Upload documents. Attach a file search tool. The agent retrieves relevant chunks when needed. This is the right starting point for long-term memory — not vector databases.

## What Not to Do (Until You Need It)

Don't start with:
- Vector databases
- Embeddings pipelines
- Complex retrieval architectures

These are powerful but add significant complexity. The rule: **if your agent works without them, don't add them.**

Only graduate to vector search when:
- Your document corpus is too large for simple file search
- You need semantic similarity (not just keyword matching)
- Retrieval quality is measurably impacting performance

## See Also

- [[AI Agents — How They Work]]
- [[Building Your First AI Agent]]
- [[Making Your Agent Reliable]]
