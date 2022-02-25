<?php

namespace WBD5204\Controller;

use WBD5204\Authorize;
use WBD5204\Controller as AbstractController;
use WBD5204\Model\Orders as OrdersModel;
use WBD5204\Model\OrderItems as OrderItemsModel;

final class Orders extends AbstractController {

    public function __construct() {
        $this->OrdersModel = new OrdersModel();
        $this->OrderItemsModel = new OrderItemsModel();
    }

    // @POST
    public function create() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $user_info */
        $user_info = [];
        /** @var ?int $order_id */
        $order_id = NULL;
        /** @var array $order_items */
        $order_items = [];

        if (
                $this->isMethod( self::METHOD_POST )
            &&  Authorize::authorizeToken( $errors, $user_info )
            &&  $this->OrdersModel->createOrder( $errors, $user_info[ 'id' ], $order_id )
            &&  $this->OrderItemsModel->createOrderItems( $errors, $order_id, $order_items )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'jwt' => Authorize::createToken( $user_info ), 'order_id' => $order_id, 'order_items' => $order_items ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

    public function delete( ?string $order_id = NULL ) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $user_info */
        $user_info = [];

        if (
                $this->isMethod( self::METHOD_DELETE )
            &&  Authorize::authorizeToken( $errors, $user_info )
            &&  $this->OrdersModel->deleteOrder( $errors, $order_id )
            &&  $this->OrderItemsModel->deleteOrderItems( $errors, $order_id )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'jwt' => Authorize::createToken( $user_info ), 'user_info' => $user_info ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

    // @GET
    public function get() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];
        /** @var array $user_info */
        $user_info = [];

        if (
                $this->isMethod( self::METHOD_GET )
            &&  Authorize::authorizeToken( $errors, $user_info )
            &&  $this->OrdersModel->getOrders( $errors, $result, $user_info[ 'id' ] )
            &&  $this->OrderItemsModel->getOrderItems( $errors, $result )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'jwt' => Authorize::createToken( $user_info ), 'result' => $result ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

    public function index() {

    }

    public function update() {

    }

}