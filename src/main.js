import { DataForm } from "./form";

window.onload = () => {
    new DataForm(document.forms.options, document.getElementById('root'))
}
