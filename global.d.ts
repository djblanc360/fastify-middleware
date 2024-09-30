declare namespace NodeJS { // imported via @types/node
    // includes types for process, global, Buffer
  interface Global {
    credentials: {
      environment: string | undefined;
      shopify_token: string | undefined;
      shopify_base_url: string | undefined;
    };
  }
}
declare var global: NodeJS.Global;