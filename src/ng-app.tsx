import {customElement, PreactCustomElement, reactive} from "../index";
import {useEffect} from "preact/hooks";

@customElement('ng-app')
class NgApp extends PreactCustomElement {

    @reactive
    time = new Date();

    render() {
        useEffect(()=>{
            const interval = setInterval(()=>{
                this.time = new Date();
            }, 1000);
            return () => clearInterval(interval);
        },[]);

        return <div>Time: {this.time.toLocaleString()}</div>
    }
}