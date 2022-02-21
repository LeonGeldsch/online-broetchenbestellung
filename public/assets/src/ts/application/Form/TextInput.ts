import Input from "./Input";

export default class TextInput extends Input {

    constructor(props) {
        super(props);

        this.el.addEventListener( 'change', this.validate );
    }

    validate() : void {}

}
