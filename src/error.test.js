// @vitest-environment happy-dom
import { it, expect } from "vitest";
import {
  partial,
  int,
  float,
  bool,
  option,
  safeParse,
  object,
  htmlAttribute,
  pipe,
  parse,
  intIssue,
  missingKeyIssue,
} from "./parse.js";

it("should parse a HTMLElement attribute", () => {
  // Arrange
  const el = document.createElement("div");
  el.setAttribute("hello-world", "42");
  el.setAttribute("hello-alice", "false");

  // Act
  const schema = partial({
    helloAlice: option("hello-alice", bool()),
    helloBob: option("hello-world", int()),
  });
  const actual = parse(schema, el);

  // Assert
  expect(actual).toEqual({
    helloBob: 42,
    helloAlice: false,
  });
});

it("should report issues", () => {
  const schema = int();
  let issues = [];
  try {
    parse(schema, "cat");
  } catch (e) {
    issues = e.issues;
  }
  expect(issues).toEqual([intIssue("cat")]);
});

it("should safeParse int", () => {
  expect(safeParse(int(), "42")).toEqual({
    status: "clean",
    issues: [],
    value: 42,
  });
});

it("should safeParse object given existing key", () => {
  expect(safeParse(object({ key: int() }), { key: "42" })).toEqual({
    status: "clean",
    issues: [],
    value: { key: 42 },
  });
});

it("should safeParse object given missing key", () => {
  expect(safeParse(object({ key: int() }), {})).toEqual({
    status: "abort",
    issues: [missingKeyIssue("key")],
    value: {},
  });
});

it("should safeParse HTMLElement", () => {
  const schema = partial({
    foo: pipe(htmlAttribute("foo"), int()),
  });
  const el = document.createElement("div");
  const actual = safeParse(schema, el);
  expect(actual).toEqual({ status: "clean", issues: [], value: {} });
});

it.each([
  ["4", int(), {status: "clean", issues: [], value: 4}],
  ["true", bool(), {status: "clean", issues: [], value: true}],
  ["3.14", float(), {status: "clean", issues: [], value: 3.14}],
  ["", int(), {status: "abort", issues: [{code: "parse_int", message: "could not parse int given: \"\""}], value: NaN}],
  ["", bool(), {status: "clean", issues: [], value: false}],
  ["", float(), {status: "abort", issues: [{code: "parse_float", message: "could not parse float given: \"\""}], value: NaN}],
  [document.createElement("div"), htmlAttribute("foo"), {status: "abort", issues: [{code: "missing_attribute", message: "div missing attribute 'foo'"}], value: null}],
])("should safeParse %s", (value, schema, expected) => {
  const actual = safeParse(schema, value);
  expect(actual).toEqual(expected);
})
