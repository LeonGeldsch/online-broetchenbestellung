import Input from "./Form/Input";
import Username from "./RegisterForm/Username";
import Email from "./RegisterForm/Email";
import Password from "./RegisterForm/Password";
import Image from "./RegisterForm/Image";

interface InputFields {
    [ index: string ] : Input
};

export default class RegisterForm {

    inputFields : any

    constructor() {
        document.getElementById( 'register_form' ).addEventListener( 'submit', this.onSubmit );

        this.inputFields = {};
        this.addInputField( 'username', new Username() );
        this.addInputField( 'email', new Email() );
        this.addInputField( 'password', new Password() );
        this.addInputField( 'image', new Image() );

        this.onSubmit = this.onSubmit.bind( this );
    }

    addInputField( index: string, input: Input ) {
        this.inputFields[ index ] = input;
    }

    onSubmit( event: Event ) : void {
        event.preventDefault();
        console.log( 'Submit Form!' );
        console.log( this.inputFields[ 'image' ].getValue() );

    }

}
