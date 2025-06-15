import 'preact';

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            [tagName: `${string}-${string}`]: any;
        }
    }
}