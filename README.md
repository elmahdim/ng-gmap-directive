# Google Map Directive Angularjs

### [Demo](http://codepen.io/elmahdim/details/mVjMeK/)

### Required files
```
<script src="https://maps.googleapis.com/maps/api/js"></script>
<script src="path-to/1.4.*/angular.js"></script>
<script src="path-to/your-app.js"></script>
```

### Directive types

```html
<!-- 'E'lement -->
<google-map></google-map>

<!-- 'A'ttribute -->
<div google-map></div>
```

### Scope Options

```javascript
zipcode type {String}
hasSkin type {Boolean} (optional)
```

```html
<google-map class="gmap" id="gmap" zipcode="Object.ZipCode" has-skin></google-map>
```

* `id` attribute is required
* You'll need to set the height and width via `class="your-class"` or inline.
