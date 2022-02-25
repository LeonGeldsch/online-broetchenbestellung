<?php

namespace WBD5204;

use WBD5204\Controller\Error;

final class API {

    const ERROR_CONTROLLER = "WBD5204\\Controller\\Error";
    const ERROR_METHOD = 'index';

    private ?Controller $Controller = NULL;

    private ?array $request = NULL;

    public function __construct() {

        $this->request = $this->parseRequest();
    }

    public function run() : void {
        // Start session
        Session::start();

        if ( $this->controllerExists() && $this->controllerMethodExists() ) {
            /** @var string $controller */
            $controller = $this->request[ 'controller' ];
            /** @var string $method */
            $method = $this->request[ 'method' ];
            /** @var ?string $argument */
            $argument = $this->request[ 'argument' ];

            /** @var Controller Controller */
            $this->Controller = new $controller();

            // Call the requested method without an argument
            if ( is_null( $argument ) ) {
                $this->Controller->{ $method }();
            }
            // Call the requested method with an argument
            else {
                $this->Controller->{ $method }( $argument );
            }
        }
        else {
            ( new Error() )->index( 404 );
        }
    }

    private function controllerExists() : bool {

        return class_exists( $this->request[ 'controller' ] );
    }

    private function controllerMethodExists() : bool {

        return method_exists( $this->request[ 'controller' ], $this->request[ 'method' ] );
    }

    private function parseRequest() : array {
        /** @var string $url_input */
        $url_input = filter_input( INPUT_GET, '_url' ) ?? '';
        /** @var string $url_lower */
        $url_lower = strtolower( $url_input );
        /** @var string $url_rtrim */
        $url_rtrim = rtrim( $url_lower, '/' );
        /** @var array $url_exploded */
        $url_exploded = explode( '/', $url_rtrim );

        return [
            'controller'    =>  $this->sanitizeController( $url_exploded[ 0 ] ?? NULL ),
            'method'        =>  $this->sanitizeMethod( $url_exploded[ 1 ] ?? NULL ),
            'argument'      =>  $this->sanitizeArgument( $url_exploded[ 2 ] ?? NULL )
        ];
    }

    private function sanitizeController( ?string $controller ) : string {

        return $controller
            ?   "WBD5204\\Controller\\" . ucfirst( $controller )
            :   self::ERROR_CONTROLLER;
    }

    private function sanitizeMethod( ?string $method ) : string {

        return $method ?? self::ERROR_METHOD;
    }

    private function sanitizeArgument( ?string $param ) : ?string {

        return $param ?? NULL;
    }

}
