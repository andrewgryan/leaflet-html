/**
 * Error handling utilities
 */

/**
 * @typedef {'missing_attribute'|'json_parse'|'parse_int'} Code
 */

/**
 * @typedef {Object} MissingAttributeIssue
 * @property {Code} code
 * @property {string} tag
 * @property {string} attribute
 * @property {string} message
 */

/**
 * @typedef {Object} ParseIssue
 * @property {Code} code
 * @property {string} tag
 * @property {string} attribute
 * @property {string} message
 * @property {string} error
 */

/**
 * @typedef {(MissingAttributeIssue | ParseIssue)} Issue
 */

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
 * @param {string} tag
 * @param {string} attribute
 * @returns {MissingAttributeIssue}
 */
export const missingAttributeIssue = (tag, attribute) => {
  const code = "missing_attribute";
  const message = `${tag}: missing HTML attribute ${attribute}`;
  return {
    code,
    tag,
    attribute,
    message,
  };
};

/**
 * @param {string} tag
 * @param {string} attribute
 * @param {SyntaxError} error
 * @returns {ParseIssue}
 */
export const jsonParseIssue = (tag, attribute, error) => {
  const code = "json_parse";
  const message = `${tag}: failed to JSON.parse ${attribute}`;
  return {
    code,
    tag,
    attribute,
    message,
    error: error.message,
  };
};

/**
 * @param {string} tag
 * @param {string} attribute
 * @param {string} value
 * @returns {ParseIssue}
 */
export const parseIntIssue = (tag, attribute, value) => {
  const code = "parse_int";
  const message = `${tag}: failed to parse ${attribute}`;
  return {
    code,
    tag,
    attribute,
    message,
    error: `could not parseInt ${value}`,
  };
};
