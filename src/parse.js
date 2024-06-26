/// <reference path="./parser.d.ts" />
 
export class LeafletHTMLError extends Error {
  /** @type {Issue[]} */
  issues = [];

  /**
   * @param {Issue[]} issues
   */
  constructor(issues) {
    super();
    this.name = "LeafletHTMLError";
    this.issues = issues;
  }

  get message() {
    return JSON.stringify(this.issues, null, 2);
  }
}

/**
 * @template T
 * @param {T} value
 * @returns {Context<T>}
 */
const wrap = (value) => {
  return {
    status: "clean",
    issues: [],
    value,
  };
};

/**
 * @template T
 * @param {Context<T>} value
 * @returns {T}
 */
const unwrap = ({ value }) => value;

/**
 * @template S
 * @template T
 * @param {Parser<T, S>} schema
 * @param {T} value
 * @returns {S}
 */
export const parse = (schema, value) => {
  const result = schema(wrap(value));
  if (result.status !== "clean") {
    throw new LeafletHTMLError(result.issues);
  } else {
    return unwrap(result);
  }
};

/**
 * @template S
 * @template T
 * @param {Parser<T, S>} schema
 * @param {T} value
 * @returns {Context<S>}
 */
export const safeParse = (schema, value) => schema(wrap(value));

/**
 * @param {Object} obj
 * @returns {(ctx: Context<Object>) => Context<Object>}
 */
export const object = (obj) => (ctx) => {
  let { status, issues } = ctx;
  const result = {};
  for (const key of Object.keys(obj)) {
    if (key in ctx.value) {
      result[key] = obj[key](wrap(ctx.value[key])).value;
    } else {
      status = "abort";
      issues = [...issues, missingKeyIssue(key)];
    }
  }
  return { status, issues, value: result };
};

// CONNECTORS

/**
 * @template T
 * @param {Object} obj
 * @returns {(ctx: Context<T>) => Context<Object>}
 */
export const distribute = (obj) => (ctx) => {
  let { status, issues } = ctx;
  const result = {};
  for (const key of Object.keys(obj)) {
    let localCtx = obj[key](ctx);
    if (localCtx.status === "abort") {
      status = "abort";
      issues = [...issues, ...localCtx.issues];
    }
    result[key] = localCtx.value;
  }
  return { status, issues, value: result };
};

export const partial = (obj) => (ctx) => {
  let { issues } = ctx;
  let status = "clean"
  const result = {};
  for (const key of Object.keys(obj)) {
    let localCtx = obj[key](ctx);
    if (localCtx.status !== "clean") {
      status = localCtx.status
    }
    
    if ((localCtx.value === null) && (localCtx.status === "clean")) {
      continue
    } else {
      issues = [...issues, ...localCtx.issues];
      result[key] = localCtx.value;
    }
  }
  return { status, issues, value: result };
};

export const pipe =
  (...parsers) =>
  (ctx) => {
    for (let i = 0; i < parsers.length; i++) {
      ctx = parsers[i](ctx);
      if (ctx.status === "abort") {
        break;
      }
    }
    return ctx;
  };

export const chain = (...parsers) => (ctx) => {
  for (let i=0; i<parsers.length; i++) {
    ctx = parsers[i](ctx)
  }
  return ctx
}


// PRIMITIVES
export const nullable = (parser) => (ctx) => {
  if (ctx.value === null) {
    return ctx
  }
  return parser(ctx)
}

export const optional = (parser) => (ctx) => {
  ctx = parser(ctx)
  if (ctx.value === null) {
    return {status: "clean", issues: [], value: null}
  } else {
    return ctx
  }
}

/**
 * @param {string} attributeName
 * @returns {Parser<HTMLElement, string>}
 */
export const htmlAttribute = (attributeName) => (ctx) => {
  const el = ctx.value;
  let result = el.getAttribute(attributeName);
  if (result === null) {
    return {
      status: "abort",
      issues: [...ctx.issues, htmlAttributeIssue(el, attributeName)],
      value: null,
    };
  }
  return { ...ctx, value: result };
};

/**
 * @returns {(ctx: Context<string>) => Context<number>}
 */
export const int = () => (ctx) => {
  let result = parseInt(ctx.value);
  if (isNaN(result)) {
    return {
      status: "abort",
      issues: [...ctx.issues, intIssue(ctx.value)],
      value: result,
    };
  }
  return { ...ctx, value: result };
};

/**
 * @returns {(ctx: Context<string>) => Context<number>}
 */
export const float = () => (ctx) => {
  let result = parseFloat(ctx.value);
  if (isNaN(result)) {
    return {
      status: "abort",
      issues: [...ctx.issues, floatIssue(ctx.value)],
      value: result,
    };
  }
  return { ...ctx, value: result };
};

/**
 * @returns {(ctx: Context<string>) => Context<number>}
 */
export const json = () => (ctx) => {
  let result;
  try {
    result = JSON.parse(ctx.value);
  } catch (e) {
    return {
      status: "abort",
      issues: [...ctx.issues, jsonIssue(e)],
      value: null,
    };
  }
  return { ...ctx, value: result };
};

/**
 * @returns {(ctx: Context<string>) => Context<boolean>}
 */
export const bool = () => (ctx) => {
  return { ...ctx, value: ctx.value.toLowerCase() === "true" };
};

/**
 * @template T
 * @template S
 * @param {string} key
 * @param {Parser<T, S>[]} fns
 */
export const option = (key, ...fns) => pipe(htmlAttribute(key), ...fns);


// ISSUES

/**
 * @param {string} value
 * @returns {Issue}
 */
export const intIssue = (value) => {
  return {
    code: "parse_int",
    message: `could not parse int given: "${value}"`,
  };
};

/**
 * @param {string} value
 * @returns {Issue}
 */
export const floatIssue = (value) => {
  return {
    code: "parse_float",
    message: `could not parse float given: "${value}"`,
  };
};

/**
 * @param {SyntaxError} e
 * @returns {Issue}
 */
export const jsonIssue = (e) => {
  return {
    code: "parse_json",
    message: e.message,
  };
};

/**
 * @param {string} value
 * @returns {Issue}
 */
export const missingKeyIssue = (value) => {
  return {
    code: "missing_key",
    message: `key not found: ${value}`,
  };
};

/**
 * @param {HTMLElement} el
 * @param {string} attributeName
 * @returns {Issue}
 */
export const htmlAttributeIssue = (el, attributeName) => {
  return {
    code: "missing_attribute",
    message: `${el.tagName.toLowerCase()} missing attribute '${attributeName}'`,
  };
};
