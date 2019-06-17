# parcel-plugin-html-root-syntax

```
npm install parcel-plugin-html-root-syntax
```

## Input

```
<link rel="stylesheet" href="#/base.css">
<script src="#/config.js"></script>
```

## Output

```
<link rel="stylesheet" href="/base.css">
<script src="/config.js"></script>
```

## Why?

Parcel will try to bundle any `script` or `link` tag with an absolute or relative path in a `html` entry file.
Parcel will ignore paths prefixed with `#` and this plugin cleans up the paths when bundled.

[See more](https://github.com/parcel-bundler/parcel/issues/1087)
