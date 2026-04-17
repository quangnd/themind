---
title: TypeScript for JS and C# Developers
aliases: [TypeScript Guide, TS for JS Developers, TS for CSharp Developers]
tags: [typescript, programming, learning]
created: 2026-04-12
updated: 2026-04-12
type: concept
---

# TypeScript for JS and C# Developers

A practical guide for developers who already know JavaScript and C#. TypeScript sits at the intersection of both — you already understand more than you think.

## What You Already Know

### From C#
- Static typing, interfaces, generics, `async`/`await`
- Nullable types (`?` operator)
- Class-based OOP, access modifiers
- LINQ (maps roughly to array methods)

### From JavaScript
- The runtime (event loop, closures, prototypes)
- `const`/`let`, arrow functions, destructuring
- Promises, modules (ESM/CJS), npm ecosystem
- DOM APIs, JSON handling

TypeScript is essentially **C#'s type system bolted onto JavaScript's runtime**. You're not learning a new language — you're learning a type layer.

---

## The Six Things TypeScript Does Differently

### 1. Structural Typing (not Nominal)

This is the biggest mental shift from C#. In C#, two classes with identical fields are different types. In TypeScript, **shape is all that matters**:

```typescript
interface Dog { name: string; bark(): void }
interface Robot { name: string; bark(): void }

// A Robot IS a Dog if it has the same shape
const r: Robot = { name: "Bender", bark: () => console.log("beep") };
const d: Dog = r; // ✅ No error — same shape
```

> [!tip] C# Mental Model
> Think of every TypeScript interface as an implicit `where T : has these members` constraint. There's no `implements` requirement — if the shape fits, it works.

### 2. Union and Literal Types

C# has enums. TypeScript has something more powerful — **union types** that can be any combination of types, including literal values:

```typescript
// Literal types — the variable can only be these exact values
type Direction = "north" | "south" | "east" | "west";

// Union types — the variable can be different types
type Result = string | number | null;

// Discriminated unions — C#'s pattern matching equivalent
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;  // TS knows it's a circle here
    case "rect": return s.width * s.height;          // TS knows it's a rect here
  }
}
```

Discriminated unions replace what you'd use inheritance + pattern matching for in C#. They're TypeScript's killer feature.

### 3. Type Inference — Let the Compiler Work

Unlike C#'s `var` (which only works for local variables), TypeScript infers types **almost everywhere**:

```typescript
// You rarely need to annotate
const name = "hello";          // TypeScript knows: string
const nums = [1, 2, 3];       // TypeScript knows: number[]
const doubled = nums.map(n => n * 2);  // TypeScript knows: number[]

// Only annotate when inference can't reach
function greet(name: string): string {  // parameter types needed
  return `Hello, ${name}`;              // return type inferred (but explicit is fine)
}
```

> [!tip] Rule of Thumb
> Annotate function parameters. Let TypeScript infer everything else. Add return types on public APIs or when the inferred type is too wide.

### 4. Type Utilities — Built-in Type Transformations

TypeScript has built-in generics that transform types. These have no C# equivalent — they operate on the type level like functions operate on values:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Make all fields optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string }

// Pick specific fields
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Make all fields readonly
type FrozenUser = Readonly<User>;

// Record: typed dictionary
type Scores = Record<string, number>;
// { [key: string]: number }
```

The most-used utilities: `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`, `Readonly<T>`.

### 5. `type` vs `interface` — Use Both

In C#, interfaces and classes are very different. In TypeScript, `type` and `interface` are nearly interchangeable:

```typescript
// Interface — extendable, good for object shapes
interface Animal {
  name: string;
  speak(): void;
}

interface Dog extends Animal {
  breed: string;
}

// Type — composable, good for unions and computed types
type StringOrNumber = string | number;  // Can't do this with interface
type Point = { x: number; y: number };
type LabeledPoint = Point & { label: string };  // Intersection
```

**Practical rule:** use `interface` for objects you expect to extend. Use `type` for everything else (unions, intersections, utility types). Don't overthink it — they're mostly interchangeable for object shapes.

### 6. `any`, `unknown`, and `never`

Three special types that trip up newcomers:

```typescript
// any — opts out of type checking entirely (avoid this)
let x: any = "hello";
x.nonExistent.method(); // No error at compile time, crash at runtime

// unknown — "I don't know what this is, but I'll check before using it"
let y: unknown = "hello";
if (typeof y === "string") {
  console.log(y.toUpperCase()); // ✅ Safe after narrowing
}

// never — "this can never happen" (exhaustiveness checking)
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`);
}
```

> [!note] The Golden Rule
> Use `unknown` where you'd use `any`. It forces you to narrow the type before using it — same safety as C#'s type checking, but opt-in.

---

## What to Skip (For Now)

- **Decorators** — experimental, mostly for Angular. Skip unless you need them.
- **`.d.ts` authoring** — only matters when publishing libraries. Consumer-side TS doesn't need it.
- **Namespaces** — legacy feature. Use ES modules instead.
- **Triple-slash directives** (`/// <reference ...>`) — replaced by `tsconfig.json`. Ignore these.
- **`enum`** — surprisingly problematic in TS. Use union types instead: `type Color = "red" | "blue" | "green"`.

---

## Fastest Path to Productive

1. **Install:** `npm install -g typescript`, then `tsc --init` in any project
2. **Read:** [TypeScript in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) — official quick start
3. **Handbook sections** (in order): Everyday Types → Narrowing → Functions → Object Types → Generics
4. **Build something small** — a CLI tool, a simple API, a utility script
5. **Read real code** — study [[Pi (Coding Agent)]]'s TypeScript source to see how a production agent uses TS

---

## C# → TypeScript Cheat Sheet

| C# | TypeScript |
|---|---|
| `string`, `int`, `bool` | `string`, `number`, `boolean` |
| `object` | `unknown` (safe) or `any` (unsafe) |
| `var` | `const` / `let` (inferred) |
| `List<T>` | `T[]` or `Array<T>` |
| `Dictionary<K,V>` | `Record<K,V>` or `Map<K,V>` |
| `T?` (nullable) | `T \| null` or `T \| undefined` |
| `interface IFoo` | `interface Foo` (no `I` prefix convention) |
| `enum Color { Red, Blue }` | `type Color = "red" \| "blue"` |
| `async Task<T>` | `async (): Promise<T>` |
| `(int x, string y)` tuples | `[number, string]` |
| `where T : IComparable` | `<T extends Comparable>` |
| Pattern matching (`switch`) | Discriminated unions + `switch` |
| LINQ `.Select()` | `.map()` |
| LINQ `.Where()` | `.filter()` |
| LINQ `.Aggregate()` | `.reduce()` |

---

## See Also

- [[Pi (Coding Agent)]] — a real-world TypeScript agent to study
- [[Self-Extending Agents]] — the design philosophy behind Pi's TS architecture
- [[CLI Tools Pattern]] — TypeScript CLI tools as agent interfaces
- [[Vault Gap Analysis — 2026-04-11]] — agent-building as one of three personal goals
