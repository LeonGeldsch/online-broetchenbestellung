<?php

namespace WBD5204\Controller;

use WBD5204\Authorize;
use WBD5204\Controller as AbstractController;
use WBD5204\Model\OrderItems as OrdersModel;

final class OrderItems extends AbstractController {

    public function __construct() {
        $this->OrdersModel = new OrdersModel();
    }

    // @POST
    public function create() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $user_info */
        $user_info = [];

        if (
                $this->isMethod( self::METHOD_POST )
            &&  Authorize::authorizeToken( $errors, $user_info )
            &&  $this->OrdersModel->createOrder( $errors, $user_info[ 'id' ] )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'jwt' => Authorize::createToken( $user_info ), 'user_info' => $user_info ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }

    }

    public function delete() {

    }

    public function get() {

    }

    public function index() {

    }

    public function update() {

    }

}