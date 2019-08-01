const fs = require('fs')
const cheerio = require('cheerio')

const tags = {
  script: 'src',
  'link[rel="stylesheet"]': 'href',
}

function replaceRootSyntaxWithAbsolutePath(bundle) {
  if (bundle.type === 'html') {
    const filePath = bundle.name
    const content = fs.readFileSync(filePath, 'utf8')
    const $ = cheerio.load(content)

    let shouldUpdate = false

    Object.entries(tags).forEach(([tag, attribute]) => {
      $(tag).each((i, el) => {
        const $el = $(el)
        const prop = $el.attr(attribute)

        if (prop && prop.startsWith('#')) {
          $el.attr(attribute, prop.replace(/^#/, ''))
          shouldUpdate = true
        }
      })

      if (shouldUpdate) {
        fs.writeFileSync(filePath, $.html())
      }
    })
  }
}

function forEachBundle(fn, bundle) {
  fn(bundle)

  if (bundle.childBundles && bundle.childBundles.size) {
    for (let childBundle of bundle.childBundles) { // eslint-disable-line no-restricted-syntax
      fn(childBundle)
    }
  }
}

module.exports = function (bundler) {
  bundler.on('bundled', (bundle) => {
    forEachBundle(replaceRootSyntaxWithAbsolutePath, bundle)
  })
}
