import CommerceSDK from "@chec/commerce.js";

const DEMO_CECHK_API_KEY = "pk_184625ed86f36703d7d233bcf6d519a4f9398f20048ec";

const client = new CommerceSDK(process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY || DEMO_CECHK_API_KEY);

export default client;