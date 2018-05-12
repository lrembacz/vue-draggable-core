# VueDraggableCore
DraggableCore component for VueJs. Component to make elements draggable.

It's based on https://github.com/mzabriskie/react-draggable

# Example

- Clone project.
- run `$ npm run dev`

# Usage
## NPM
```
npm install vue-draggable-core
```

## Registration
```
import VueDraggableCore from 'vue-draggable-core'
Vue.component('vue-draggable-core', VueDraggableCore)
```

# API

## Props

```
noSelection : {
    type: Boolean,
    default: true,
},
noTouchAction : {
    type: Boolean,
    default: true,
},
touchAction: {
    type: String,
    default: 'none',
}
allowAnyClick :{
    type: Boolean,
    default: false
},
cancel: {
    type: String,
    default: null
},
disabled: {
    type: Boolean,
    default: false
},
grid: {
    type: Array,
    default: () => [1,1]
},
handle: {
    type: String,
    default: null
},
onStart: {
    type: Function,
    default : () => {}
},
onDrag: {
    type: Function,
    default : () => {}
},
onStop: {
    type: Function,
    default : () => {}
},
className: {
    type: String,
    default: ''
},
```

## Description

### noSelection

Grants `user-select: none;` style to component.

### noTouchAction

If false, grants`touch-action: none;` style to component. Preventing from scrolling on mobile devices. 

Attention! : Be careful when using this prop. You can make scrolling off on mobile devices.

### touchAction

Define which touchAction are added. Default `none`;

### allowAnyClick

Allows any click to drag, default only `left-click` is allowed.

### cancel

Grants `undraggability` to given selector.

### disabled

Turn off `draggability`.

### grid

Snaps dragged element to grid, default `[1,1]`.

### handle

Grants `draggability` to given selector, others selectors inside are undraggable.

### onStart

Function called when `dragging` is started.

### onDrag

Function called when `dragging` is moved.

### onStop

Function called when `dragging` is ended.

### className

Given string is merged into css class of component.

# License
MIT