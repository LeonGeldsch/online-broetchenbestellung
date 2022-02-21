import ScrollIndicator from "./application/ScrollIndicator";
import XHR from "./application/XHR";

(function() {

    'use strict';

    const scrollIndicator = new ScrollIndicator();

    let store = {};

    document.getElementById( 'login' ).addEventListener( 'click', function( event ) {
        event.preventDefault();

        const url = 'http://localhost:8080/api/user/login';

        let formData = new FormData();
        formData.append( 'username', 'john' );
        formData.append( 'password', 'aA1!1234' );

        let xhr = new XHR();
        xhr.post( url, formData );
    } );
    document.getElementById( 'logout' ).addEventListener( 'click', function( event ) {
        event.preventDefault();

        const url = 'http://localhost:8080/api/user/logout';

        let xhr = new XHR();
        xhr.get( url );
    } );
    document.getElementById( 'create_post' ).addEventListener( 'click', function( event ) {
        event.preventDefault();

        const url = 'http://localhost:8080/api/posts/create';

        let formData = new FormData();
        formData.append( 'user_id', '1' );
        formData.append( 'title', 'Post Title with enough Chars' );
        formData.append( 'content', 'Post Content, for some reason i need to type some more letters...' );

        let xhr = new XHR();
        xhr.post( url, formData );
    } );

    document.getElementById( 'delete_post' ).addEventListener( 'click', function( event ) {
        event.preventDefault();

        const url = 'http://localhost:8080/api/posts/delete/1';

        let xhr = new XHR();
        xhr.delete( url );
    } );

    document.getElementById( 'update_post' ).addEventListener( 'click', function( event ) {
        event.preventDefault();

        const url = 'http://localhost:8080/api/posts/update/1';

        let formData = new FormData();
        formData.append( 'title', 'New Title with enough Chars' );
        formData.append( 'content', 'New Content, for some reason i need to type some more letters...' );

        let xhr = new XHR();
        xhr.update( url, formData );
    } );

})();