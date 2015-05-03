# circlespinjs
Mouse spinning jquery plugin.

Working example: http://sitepro.ga/circlespinjs/

# Installation
Basic installation example:

```javascript
var spin = $('#spin').circlespin();
```

Example with added rotation and refreshing on resize event:

```javascript
var spin = $('#spin').circlespin({preangle: 51.5, autoupdate: true}).setAngle(51.5);

```

### Options
Put an options object in *circlespin()*  function argument

+ **width** - width of spinning element **(defines automaticly)**
+ **height** - height of spinning element **(defines automaticly)**
+ **left** - x of spinning element **(defines automaticly)**
+ **top** - y of spinning element **(defines automaticly)**
+ **preangle** - adding start angle **(deafult: 0)**
+ **autoupdate** - resize update **(deafult: false)**

### Events

+ **spinning** - spinning event (when user is rotating object)
+ **spinstart** - spinning start event
+ **spinend** - spinning end event

```javascript
$('#spin').on('spinstart', function() {
	console.log('You started spinning this object!');
});
```

### Methods
If you need to get angle or specific number when something happens, you can use this methods
```javascript
spin.getResult(300,1000).toFixed() // I use toFixed() to make it integer. will return number from 300 to 1000 (depends of angle)
```
One more returning method.

```javascript
spin.getAngle() // returns angle in degrees
```

Setting new angle.

```javascript
spin.setAngle(90) // will set 90 degrees in angle
```

Updating object settings.

```javascript
spin.updateSettings({
				width: 50,
				height: 30,
				left: 20,
				top: 10,
				preangle: 90
}); //will update settings.
```

## Changelog

+ **verson 1.0**  *(all is stable. basic features.)*

