declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ASSETS_URL: string;
    BASE_URL: string;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    "swiper-container": any;
    "swiper-slide": any;
  }
}

declare interface ExtendedDocument extends Document {
  startViewTransition?: any;
}
