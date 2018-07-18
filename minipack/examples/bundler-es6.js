// node bundler-es5.js | js-beautify | highlight --syntax js --out-format=ansi

const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;

let ID = 0;

function createAsset(filename) {
	const contents = fs.readFileSync(filename, 'utf-8');
	const ast = babylon.parse(contents, { sourceType: 'module' });

	const id = ID++;
	const dependencies = [];
	traverse(ast, {
		ImportDeclaration: (nodePath) => {
			dependencies.push(nodePath.node.source.value);
		}
	})

	const { code } = babel.transformFromAst(ast, null, { presets: [ 'env' ] });

	return {
		id,
		filename,
		dependencies,
		code,
	};
}

function createGraph(filename) {
	const mainAsset = createAsset(filename);

	const queue = [ mainAsset ];

	for (const asset of queue) {
		const dirname = path.dirname(asset.filename);
		asset.mapping = {};
		asset.dependencies.forEach(dep => {
			const absolutePath = path.join(dirname, dep);
			const childAsset = createAsset(absolutePath);
			asset.mapping[dep] = childAsset.id;
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
		], `;
	});

	return `
		(function (modules) {
			function require(id) {
				const [ fn, mapping ] = modules[id];

				function localRequire(filename) {
					return require(mapping[filename]);
				}

				const module = { exports: {} };
				
				fn(localRequire, module, module.exports);
				return module.exports;	
			}

			require(0);
		})({ ${modules} });
	`;
}

const graph = createGraph('./src-es6/entry.js');
const bundle = createBundle(graph);
console.log(bundle);
