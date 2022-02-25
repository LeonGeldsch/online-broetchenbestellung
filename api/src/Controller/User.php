<?php

namespace WBD5204\Controller;

use WBD5204\Controller as AbstractController;
use WBD5204\Model\User as UserModel;

final class User extends AbstractController {

    public function __construct() {
        $this->UserModel = new UserModel();
    }

    // @POST
    public function login() : void {
        /** @var array $errors */
        $errors = [];
        $token = '';

        if (
                $this->isMethod( self::METHOD_POST )
            &&  $this->UserModel->login( $errors, $token )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'jwt' => $token ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

    // @GET
    public function logout() : void {
        /** @var array $errors */
        $errors = [];

        if (
            $this->isMethod( self::METHOD_GET )
        ) {
            setcookie( 'JWT', NULL, -1, '/public' );

            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

    // @POST
    public function register() : void {
        /** @var array $errors */
        $errors = [];

        if (
                $this->isMethod( self::METHOD_POST )
            &&  $this->UserModel->register( $errors )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

}
