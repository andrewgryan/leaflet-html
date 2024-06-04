/**
 * Error handling utilities
 */

export class LeafletHTMLError extends Error {
  issues = [];

  /**
   * @param {string} message
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

export const missingAttributeIssue = ({ tag, attribute }) => {
  const code = "missing_attribute";
  const message = `${tag}: missing HTML attribute ${attribute}`;
  return {
    code,
    tag,
    attribute,
    message,
  };
};

export const jsonParseIssue = ({ tag, attribute, error }) => {
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

export const parseIntIssue = ({ tag, attribute, value }) => {
  const code = "parse_int";
  const message = `${tag}: failed to parse ${attribute}`;
  return {
    code,
    tag,
    attribute,
    message,
    value,
  };
};
