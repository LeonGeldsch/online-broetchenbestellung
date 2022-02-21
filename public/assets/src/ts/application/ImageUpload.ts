import XHR from "./XHR";

interface Result {
    id : Number,
    filename: string,
    image: {
        src: string
    },
    thumbnail: {
        src:    string,
    }
}

export default class ImageUpload {

    file: any

    placeholder_el: any

    input_el: any

    constructor( file, placeholder_el, input_el  ) {
        this.file = file;
        this.placeholder_el = placeholder_el;
        this.input_el = input_el;

        this.uploadFile = this.uploadFile.bind( this );
        this.onSuccess = this.onSuccess.bind( this );
    }

    processFile() : void {
        const fileReader = new FileReader();

        fileReader.readAsDataURL( this.file );

        fileReader.addEventListener( 'loadend', this.uploadFile )
    }

    uploadFile() : void {
        const formData = new FormData();
        const xhr = new XHR();

        formData.append( 'image', this.file );

        xhr.bindErrorEventHandler( this.onError );
        xhr.bindSuccessEventHandler( this.onSuccess );
        xhr.bindProgressEventHandler( this.onProgress );
        xhr.post( 'http://localhost:8080/api/images/upload', formData );
    }

    onError( Request: XMLHttpRequest ) : void {

    }

    onSuccess( Request: XMLHttpRequest ) : void {
        const result : Result = ( JSON.parse( Request.responseText ) ).result;
        const preview : any =document.getElementById( 'register_image_upload__preview' );
        const id : any = document.getElementById( 'register_image_upload__id' );

        preview.src = result[ 'thumbnail' ][ 'src'];
        id.value = result[ 'id' ];
    }

    onProgress( Event: Event ) : void {

    }

}
