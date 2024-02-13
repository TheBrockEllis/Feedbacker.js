
<img width="267" alt="Screenshot 2024-02-13 at 11 43 18 AM" src="https://github.com/TheBrockEllis/Feedbacker.js/assets/1606194/7414ec3c-e3a3-4a19-a307-6c1749406a95">

# Feedbacker.js

### A lean, mean feedback gathering machine

Feedbacker.js is a jQuery plugin that allows you to collect feedback from your users by adding a small icon to each screen that opens a feedback overlay. The feedback collected can then be sent to any remote script and saved/email/manipulated.

The biggest hurdle to get over with a new app is actually getting users. Once you get real, live, breathing human beings sing your product, you need to immediately start making improvements. Listen to their needs, their wants. Understand their use cases, their pain points. Ship. Listen. Revise. Rinse and repeat. Feedbacker.js helps you accomplish these goals.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.feedbacker.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$("#element").feedbacker({
		requireEmail: true,
        acknowledgement: "Thanks!!"
	});
	```

## Demos

A demo of Feedbacker.js can be seen [here](https://thebrockellis.github.io/Feedbacker.js/demo/index.html).


## Parameters

| Param | Type | Description | Default |
|-------|------|-------------|---------|
| width | int | The width of the on-screen widget | 50 |
| height | int | The height of the on-screen widget | 50 |
| name | boolean | Should the 'name' form element be displayed | true |
| requireName | boolean | Should the 'name' element be required | true |
| email | boolean | Should the 'email' element be displayed | true |
| requireEmail | boolean | Should the 'email' element be required | true |
| message | boolean | Should the 'message' element be displayed | true |
| requireMessage | boolean | Should the 'message' element be required | true |
| action | string | The location where the form's data will be POSTed | http://www.yourdomain.com/feedbacker.php |
| acknowledgement | string | The text that will be dispalyed to users upon a successful submission | "Thank you for your feedback!" |

## Frequently Asked Questions?

- No one has asked any questions yet...when they do, we'll update these things!

## Contributors

Feedbacker.js is a passion project by the following [folks](https://github.com/TheBrockEllis/Feedbacker.js/graphs/contributors).

[![The Brock Ellis](https://avatars3.githubusercontent.com/u/1606194?v=2&s=140)](http://thebrockellis.com)

## Contributing

Check [CONTRIBUTING.md](https://github.com/TheBrockEllis/Feedbacker.js/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/TheBrockEllis/Feedbacker.js/releases) for detailed changelog.

## License

[MIT License](http://opensource.org/licenses/MIT) © The Brock Ellis
