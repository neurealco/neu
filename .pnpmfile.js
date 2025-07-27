// .pnpmfile.js
module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === 'esbuild' || pkg.name === 'sharp') {
        pkg.build = true
      }
      return pkg
    }
  }
}
