const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: 'USD'
});

/**
 * formats price to displaying on client site
 * @method formatPrice
 * @returns formatted price with comas
 * @example
 * const price = formatPrice(14234);
 * price // 14,234.00
 */
function formatPrice(price: number): string {
    return formater.format(price).slice(1);
}

export default formatPrice;
