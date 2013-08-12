tslint
======

A linter for the TypeScript language.

Supported Rules
-----

* `bitwise` disallows bitwise operators.
* `classname` enforces PascalCased class and interface names.
* `curly` enforces braces for `if`/`for`/`do`/`while` statements.
* `debug` disallows `debugger` statements.
* `dupkey` disallows duplicate keys in object literals.
* `eofline` enforces the file to end with a newline.
* `eqeqeq` enforces === and !== in favor of == and !=.
* `evil` disallows `eval` function invocations.
* `forin` enforces a `for ... in` statement to be filtered with an `if` statement.
* `indent` enforces consistent indentation levels for the whole file.
* `maxlen` sets the maximum length of a line.
* `noarg` disallows access to `arguments.callee`.
* `noconsole` disallows access to the specified properties on `console`. Property configurations are comma-delimited. For example, the configuration "noconsole: log, debug, warn" disables `console.log`, `console.debug` and `console.warn`.
* `noempty` disallows empty blocks.
* `oneline` enforces an opening brace to be on the same line as the expression preceding it.
* `quotemark` enforces consistent single or double quoted string literals.
* `radix` enforces the radix parameter of `parseInt`
* `semicolon` enforces semicolons at the end of every statement.
* `sub` disallows object access via string literals.
* `trailing` disallows trailing whitespace at the end of a line.
* `varname` allows only camelCased or UPPER_CASED variable names.
* `whitespace` enforces whitespace between a keyword and a conditional, surrounding an operator, and enclosing "=" within variable declarations and import/export statements.


Installation
------------

##### CLI

    sudo npm install tslint -g

##### Library

    npm install tslint

Usage
-----

Please first ensure that the TypeScript source files compile correctly.

##### CLI

    usage: tslint

	Options:
	  -c, --config  configuration file
	  -f, --file    file to lint                 [required]
	  -o, --out     output file
	  -t, --format  output format (prose, json)  [default: "prose"]

By default, configuration is loaded from `.tslintrc`, if it exists in the current path.

##### Library

	var options = {
		formatter: "json",
	    configuration: configuration
	};

	var Linter = require("tslint");

	var ll = new Linter(fileName, contents, options);
	var result = ll.lint();

Development
-----------

### Setup ###

    git clone git@github.com:palantir/tslint.git
    cd tslint
    git submodule init
    git submodule update

### Build ###

    npm install
    grunt

TODO
----
* Add more rules from jshint
* Disallow variables referenced outside of their scope definition
* Disallow unused variables