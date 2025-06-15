import {ComponentChild, render} from "preact";
import {Signal, signal} from "@preact/signals";
import {jsx} from "preact/jsx-runtime";

const {get, set} = Object.getOwnPropertyDescriptor(Signal.prototype, "value")!;

export class PreactCustomElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        render(jsx(this.render.bind(this), this), this.shadowRoot!);
    }

    disconnectedCallback() {
        render(null, this.shadowRoot!);
    }

    render(): ComponentChild {
        return null;
    }
}

export function reactive(target: any, key: string) {
    (target.props ??= []).push(key);
}


export function customElement(name: string) {
    return (target: CustomElementConstructor) => {
        customElements.define(name, class extends target {
            constructor() {
                super();
                const props: string[] = (this as any).props;
                if (props) for (const key of props) {
                    const s = signal(this[key as keyof this]);
                    Object.defineProperty(this, key, {get: get!.bind(s), set: set!.bind(s)});
                }
            }
        });
    };
}

