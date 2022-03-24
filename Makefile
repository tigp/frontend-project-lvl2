install:
		npm ci
publish: 
		npm publish --dry-run
exe:
		node bin/gendiff.js -h