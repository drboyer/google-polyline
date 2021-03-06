NODE_BIN=./node_modules/.bin
PROJECT=google-polyline

all: check compile

check: lint test

lint: node_modules
	$(NODE_BIN)/jshint index.js lib test benchmark

test: node_modules
	$(NODE_BIN)/mocha --ui tdd test

benchmark:
	$(NODE_BIN)/matcha --reporter plain

compile: build/build.js

build/build.js: node_modules index.js
	mkdir -p build
	browserify --require ./index.js:$(PROJECT) --outfile $@

node_modules: package.json
	npm install && touch $@

clean:
	rm -fr build

distclean: clean
	rm -fr node_modules

.PHONY: clean distclean lint check all compile test benchmark
