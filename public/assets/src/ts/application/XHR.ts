export default class XHR {

    token : any

    Request : XMLHttpRequest

    successEventHandler : CallableFunction;

    errorEventHandler : CallableFunction;

    progressEventHandler : CallableFunction;

    constructor() {
        this.bindErrorEventHandler = this.bindErrorEventHandler.bind( this );
        this.bindSuccessEventHandler = this.bindSuccessEventHandler.bind( this );
        this.bindProgressEventHandler = this.bindProgressEventHandler.bind( this );
        this.onLoad = this.onLoad.bind( this );
        this.onProgress = this.onProgress.bind( this );

        this.Request = new XMLHttpRequest();
        this.token = this.getToken();

        this.Request.onload = this.onLoad;
        this.Request.upload.addEventListener( 'progress', this.onProgress );
    }

    get( url: string ) {
        this.Request.open( 'GET', url );
        this.Request.setRequestHeader( 'AUTHORIZATION', this.token );
        this.Request.send();
    }

    post( url: string, data: FormData ) {
        this.Request.open( 'POST', url );
        this.Request.setRequestHeader( 'AUTHORIZATION', this.token );
        this.Request.send( data );
    }

    delete( url: string ) {
        this.Request.open( 'DELETE', url );
        this.Request.setRequestHeader( 'AUTHORIZATION', this.token );
        this.Request.send();
    }

    update( url: string, data: FormData ) {
        this.Request.open( 'PUT', url );
        this.Request.setRequestHeader( 'AUTHORIZATION', this.token );
        this.Request.send( data );
    }

    bindErrorEventHandler( callback : CallableFunction ) : void {
        this.errorEventHandler = callback;
    }

    bindSuccessEventHandler( callback : CallableFunction ) : void {
        this.successEventHandler = callback;
    }

    bindProgressEventHandler( callback : CallableFunction ) : void {
        this.progressEventHandler = callback;
    }

    onLoad() : void {
        switch( this.Request.status ) {
            case 200:
                if ( this.successEventHandler ) {
                    this.successEventHandler( this.Request );
                    console.log( this.Request.responseText );
                }
                break;
            case 400:
                if ( this.errorEventHandler ) {
                    this.errorEventHandler( this.Request );
                    console.log( this.Request.responseText );
                }
                break;
        }

        this.updateToken( JSON.parse( this.Request.responseText ) );
    }

    onProgress( event : Event ) : void {
        if ( this.progressEventHandler ) {
            this.progressEventHandler( event );
        }
    }

    deleteToken() : void {

        this.delete_cookie( 'JWT', '/', 'http://localhost:8080' );
    }

    getToken() {
        // @ts-ignore
        const cookies = document.cookie.split('; ').find(row => row.startsWith('JWT='));

        return cookies !== undefined ? cookies.split('=')[1] : null;
    }

    updateToken( response ) : void {
        const jwt = response[ 'jwt' ];

        if ( jwt !== undefined ) {
            let date = new Date();
            date.setTime(date.getTime()+(5*60*1000));
            // @ts-ignore
            const expires = "expires="+date.toGMTString();

            console.log( expires );

            document.cookie = 'JWT' + '=AUTHORIZE ' + jwt + ';path:/;domain:http://localhost:8080;' + expires;
        }
    }

    delete_cookie( name, path, domain ) {
        if( this.get_cookie( name ) ) {
            document.cookie = name + "=" +
                ((path) ? ";path="+path:"")+
                ((domain)?";domain="+domain:"") +
                ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
    }

    get_cookie(name){
        return document.cookie.split(';').some(c => {
            // @ts-ignore
            return c.trim().startsWith(name + '=');
        });
    }

}
