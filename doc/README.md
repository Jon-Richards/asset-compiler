# @jon-richards/asset-compiler (Internal Docs)

## Objective
Create a tool with **simple** configuration for building assets that can be used across multiple projects, allowing me to start working faster.

## General Approach

* Abstract more complex tools down to my most common use cases and create a project-agnostic implementation of those tools.
* Strict separation of concerns, CSS compiler **only** compiles CSS, likewise for JavaScript etc.
* Provide sane out-of-the-box configuration that can be overwritten easily.
* Project should be self contained, avoid peer dependency conflicts if at all possible.  (Consider version locking everything.)

## Detailed Approach

Index.js acts as an entry point to various compilers.  Compilers should not be called directly.

Each compiler is concerned only with compilation of a single instance of its asset type.  E.g. the JS compiler ONLY cares about its input and output node (with additional settings for source maps etc.) for JavaScript.

Common utilities, e.g. resolving paths or formatted console output should be delegated to utility classes.

The project should provide both script and CLI support.  The entry point for CLI support can be placed in the /bin directory, but should still funnel commands through index.js for compilation.

All documentation for code should be placed within the file itself.  At minimum, all functions should be documented with an overview, parameters and returns.

## TODO
* Add command to compile TypeScript specifically.