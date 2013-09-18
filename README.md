# mongodb-restr

RESTful Server for MongoDB

## Installation

Install with npm:

```
npm install --save mongodb-restr
```


## Usage

```
require('mongodb-restr')({
	db: {
		uri: 'mongodb://localhost:27017/test',
		options: {
			// MongoDB options
		}
	},
	rest: {
		// express options
	}
}).listen(3000)
```

## Testing

From the repo root:

```
npm install
npm test
```
