import TextInput from "../Form/TextInput";
import ImageUpload from "../ImageUpload";
import Input from "../Form/Input";

export default class Image extends Input {

    placeholder_el : any

    input_el : any

    constructor() {
        super( 'register_image_upload__input' );

        this.el.addEventListener( 'change', this.onChange );

        this.placeholder_el = document.getElementById( 'register_image_upload__preview' );
        this.input_el = document.getElementById( 'register_image_upload__id' );

        this.onChange = this.onChange.bind( this );
        this.getValue = this.getValue.bind( this );
    }

    onChange( event : any ) {
        event.preventDefault();

        const file = event.target.files[ 0 ] || event.dataTransfer.files[ 0 ];

        if ( file ) {
            ( new ImageUpload( file, this.placeholder_el, this.input_el ) ).processFile();
        }
    }

    getValue(): string {
        return this.input_el.value;
    }

}
