import TextInput from "../Form/TextInput";

export default class Username extends TextInput {

    constructor() {
        super( 'register_username' );
    }

    validate() : void {
        console.log( 'validate Username' );
        console.log( this.el );
    }

}
