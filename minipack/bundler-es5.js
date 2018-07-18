// node bundler-es5.js | js-beautify | highlight --syntax js --out-format=ansi

const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;

let ID = 0;

function createAsset(filename) {
	const code = fs.readFileSync(filename, 'utf-8');
	const ast = babylon.parse(code);
	const dependencies = [];
	traverse(ast, {
		CallExpression: (nodePath) => {
			if (nodePath.node.callee.name === 'require') {
				dependencies.push(nodePath.node.arguments[0].value);
			}
		}
	});

	return {
		id: ID++,
		filename,
		code: babel.transformFromAst(ast, null, { presets: [ 'env' ] }).code,
		dependencies,
	};
}

function createGraph(filename) {
	const mainAsset = createAsset(filename);

	const queue = [mainAsset];
	for (const asset of queue) {
		const dirname = path.dirname(asset.filename);
		asset.mapping = {};
		asset.dependencies.forEach(relativePath => {
			const absolutePath = path.join(dirname, relativePath);
			const childAsset = createAsset(absolutePath);
			asset.mapping[relativePath] = childAsset.id;
			queue.push(childAsset);
		});
	}

	return queue;
}

function createBundle(graph) {
	let modules = '';

	graph.forEach(asset => {
		modules += `${asset.id}: [
			function (require, module, exports) { ${asset.code} },
			${JSON.stringify(asset.mapping)}
		],`;
	});

	return `
		(function (modules) {
			function require(id) {
				const [ fn, mapping ] = modules[id];

				function localRequire(relativePath) {
					return require(mapping[relativePath]);
				}

				const module = { exports: {} };
				fn(localRequire, module, module.exports);
				return module.exports;
			}

			require(0);
		})({
			${modules}
		});
	`;
}

const graph = createGraph('src-es5/entry.js');
const bundle = createBundle(graph);
console.log(bundle);

