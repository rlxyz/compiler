type TToken = {
    tokenId: number
    hash: string
}

type BuildConfig = {
    basePath: string,
    invocations: number,
    rarityDelimiter: string
    geneDelimiter: string
}

type ImageFormatConfig = {
    width: number
    height: number
    smoothing: boolean
}

type LayerConfig = {
    name: string
    options?: {
        type?: string
        iterations?: number
        occuranceRate?: number
        exclude?: any
        combination?: any
    }
}

export { TToken, BuildConfig, ImageFormatConfig, LayerConfig };