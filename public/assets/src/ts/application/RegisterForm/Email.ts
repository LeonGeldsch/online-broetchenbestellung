import TextInput from "../Form/TextInput";

export default class Email extends TextInput {

    constructor() {
        super( 'register_email' );
    }

    validate() : void {
        console.log( 'validate Email' );
        console.log( this.el );
    }

}
