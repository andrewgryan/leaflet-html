+++
title = "Pane"
+++

HTML equivalent to `map.createPane(name)` function.

## Example

A standard way to initialise is inside a `<l-map>`.

```html
<l-map ...>
  <l-pane name="countries">
    ...
  </l-pane>
</l-map>
```

## Related elements

- [l-map](@/api/l-map.md)

## Parameters

Mandatory HTML properties to successfully instantiate.

| Attribute | Example   | Description              |
| --        | --        | --                       |
| name      | countries | Name to give custom pane |

## Properties

| Attribute | Type    | Description |
| --        | --      | --          |
|           |         |             |

## Events

| Event key        | Detail  | Description                          |
| --               | --      | --                                   |
| l:pane:connected |         | Triggered when connected to document |



