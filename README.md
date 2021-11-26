# co-flex

[![Build Status](https://img.shields.io/github/workflow/status/cocoss-org/co-flex/Depolyment)](https://github.com/cocoss-org/co-flex/actions)&nbsp;
[![Npm package version](https://badgen.net/npm/v/co-flex)](https://npmjs.com/package/co-flex)&nbsp;
[![GitHub license](https://img.shields.io/github/license/cocoss-org/co-flex.svg)](https://github.com/cocoss-org/co-flex/blob/master/LICENSE)&nbsp;
[![Twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/BelaBohlender)

React wrapper for [yoga](https://github.com/facebook/yoga).

_use flexbox inside react_

![nested](images/nested.gif)

[_Example: Nested layout animation_](https://cocoss-org.github.io/co-flex/three-spring-virtualized)

Use it with [react-three-fiber](https://github.com/pmndrs/react-three-fiber), react-dom, or whatever works with react.

# Functionality

```typescript
//provide the parent node
<FlexNodeContextProvider />

//create a yoga node
useYogaNode()

//create a root yoga node
useYogaRootNode()
```

# Examples

## [verbose](https://cocoss-org.github.io/co-flex/verbose)

![verbose](images/verbose.gif)

## [dom](https://cocoss-org.github.io/co-flex/dom)

![dom](images/dom.gif)

## [react-spring](https://cocoss-org.github.io/co-flex/dom-spring)

![spring](images/spring.gif)

## [co-virtualize](https://cocoss-org.github.io/co-flex/dom-spring-virtualized)

![virtualized](images/virtualized.gif)

## [three](https://cocoss-org.github.io/co-flex/three-spring-virtualized)

![three](images/three.gif)
