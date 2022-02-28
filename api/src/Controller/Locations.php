<?php

namespace WBD5204\Controller;

use WBD5204\Authorize;
use WBD5204\Controller as AbstractController;
use WBD5204\Model\Locations as LocationsModel;

final class Locations extends AbstractController {

    public function __construct() {
        $this->LocationsModel = new LocationsModel();
    }

    // @GET
    public function get() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if (
                $this->isMethod( self::METHOD_GET )
            &&  $this->LocationsModel->getLocations( $errors, $result )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'result' => $result ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

}