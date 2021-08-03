export interface RelatedProduct {
    description: string
    id: string
    media: { type: string, source: string }
    name: string
    permalink: string
    price: { raw: number, formatted: string, formatted_with_symbol: string, formatted_with_code: string }
    quantity: number
    sku: any
}