const withPurgeCss = require("next-purgecss")
const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [require("remark-prism")],
    },
})
module.exports = withMDX(
    withPurgeCss({
        pageExtensions: ["tsx", "md", "mdx"],
        images: {
            loader: "custom",
        },
        basePath: "/co-flex",
        assetPrefix: "/co-flex",
        eslint: {
            ignoreDuringBuilds: true,
        },
        pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
        trailingSlash: true,
        purgeCssPaths: ["pages/**/*", "components/**/*"],
        purgeCss: {
            safelist: ["body", "html"],
        },
    })
)
