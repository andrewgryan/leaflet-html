// @vitest-environment happy-dom
import { it, expect } from "vitest";
import { LeafletHTMLError } from "./error.js";

/**
 * @typedef {'clean'|'abort'} Status
 */

/**
 * @typedef {Object} Issue
 * @property {string} code
 * @property {string} message
 */
 
/**
 * @template T
 * @typedef {Object} Context
 * @property {T} value
 * @property {Status} status
 * @property {Issue[]} issues
 */

/**
 * @template T
 * @param {T} value
 * @returns {Context<T>}
 */
const wrap = (value) => {
  return {
    status: "clean",
    issues: [],
    value
  }
}

/**
 * @template T
 * @param {Context<T>} value
 * @returns {T}
 */
const unwrap = ({ value }) => value


/**
 * @template S
 * @template T
 * @param {(ctx: Context<T>) => Context<S>} schema
 * @param {T} value
 * @returns {S}
 */
const parse = (schema, value) => {
  const result = schema(wrap(value))
  if (result.issues.length > 0) {
    throw new LeafletHTMLError(result.issues)
  } else {
    return unwrap(result)
  }
}

/**
 * @template S
 * @template T
 * @param {(ctx: Context<T>) => Context<S>} schema
 * @param {T} value
 * @returns {Context<S>}
 */
const safeParse = (schema, value) => schema(wrap(value))

/**
 * @param {Object} obj
 * @returns {(ctx: Context<Object>) => Context<Object>}
 */
const object = (obj) => (ctx) => {
  let { status, issues } = ctx
  const result = {}
  for (const key of Object.keys(obj)) {
    if (key in ctx.value) {
      result[key] = obj[key](wrap(ctx.value[key])).value
    } else {
      status = "abort"
      issues = [...issues, missingKeyIssue(key)]
    }
  }
  return { status, issues, value: result }
}

const partial = (obj) => (ctx) => {
  let { issues } = ctx
  const result = {}
  for (const key of Object.keys(obj)) {
    let localCtx = obj[key](ctx)
    if (localCtx.status === "abort") {
      continue
    } else {
      result[key] = localCtx.value
    }
  }
  return {...ctx, issues, value: result}
}

const pipe = (...parsers) => (ctx) => {
  for (let i=0; i<parsers.length; i++) {
    ctx = parsers[i](ctx)
    if (ctx.status === "abort") {
      break
    }
  }
  return ctx
}

/** @param {string} attributeName */
const htmlAttribute = (attributeName) => (ctx) => {
  const el = ctx.value
  let result = el.getAttribute(attributeName)
  if (result === null) {
    return {
      status: "abort",
      issues: [...ctx.issues, "missing attr"],
      value: null
    }
  }
  return {...ctx, value: result }
}

/**
 * @returns {(ctx: Context<string>) => Context<number>}
 */
const int = () => (ctx) => {
  let result = parseInt(ctx.value)
  if (isNaN(result)) {
    return {
      status: "abort",
      issues: [...ctx.issues, intIssue(ctx.value)],
      value: result
    }
  }
  return {...ctx, value: result }
}

/**
 * @returns {(ctx: Context<string>) => Context<boolean>}
 */
const bool = () => (ctx) => {
  return {...ctx, value: ctx.value.toLowerCase() === "true"}
}

const option = (key, ...fns) => pipe(htmlAttribute(key), ...fns)

/**
 * @param {string} value
 * @returns {Issue}
 */
const intIssue = (value) => {
  return {
    code: "parse_int",
    message: `could not parse int given: "${value}"`
  }
}

/**
 * @param {string} value
 * @returns {Issue}
 */
const missingKeyIssue = (value) => {
  return {
    code: "missing_key",
    message: `key not found: "${value}"`
  }
}

it("should parse a HTMLElement attribute", () => {
  // Arrange
  const el = document.createElement("div")
  el.setAttribute("hello-world", "42")
  el.setAttribute("hello-alice", "false")

  // Act
  const schema = partial({
    helloAlice: option("hello-alice", bool()),
    helloBob: option("hello-world", int()),
  })
  const actual = parse(schema, el)

  // Assert
  expect(actual).toEqual({
    helloBob: 42,
    helloAlice: false
  });
})

it("should report issues", () => {
  const schema = int()
  let issues = []
  try {
    parse(schema, "cat")
  } catch(e) {
    issues = e.issues
  }
  expect(issues).toEqual([intIssue("cat")])
  
})

it("should safeParse int", () => {
  expect(safeParse(int(), "42")).toEqual({ status: "clean", issues: [], value: 42 })
})

it("should safeParse object given existing key", () => {
  expect(safeParse(object({ key: int()}), {key: "42"})).toEqual({ status: "clean", issues: [], value: {key: 42} })
})

it("should safeParse object given missing key", () => {
  expect(safeParse(object({ key: int()}), {})).toEqual({ status: "abort", issues: [missingKeyIssue("key")], value: {} })
})

it("should safeParse HTMLElement", () => {
  const schema = partial({
    foo: pipe(htmlAttribute("foo"), int())
  })
  const el = document.createElement("div")
  const actual = safeParse(schema, el)
  expect(actual).toEqual({status: "clean", issues: [], value: {}})
})
