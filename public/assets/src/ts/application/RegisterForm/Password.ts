import TextInput from "../Form/TextInput";

export default class Password extends TextInput {

    constructor() {
        super( 'register_password' );
    }

    validate() : void {
        console.log( 'validate Password' );
        console.log( this.el );
    }

}
