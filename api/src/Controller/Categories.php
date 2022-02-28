<?php

namespace WBD5204\Controller;

use WBD5204\Authorize;
use WBD5204\Controller as AbstractController;
use WBD5204\Model\Categories as CategoriesModel;

final class Categories extends AbstractController {

    public function __construct() {
        $this->CategoriesModel = new CategoriesModel();
    }

    // @GET
    public function get( string $bakery_id ) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if (
                $this->isMethod( self::METHOD_GET )
            &&  $this->CategoriesModel->getCategories( $errors, $result, $bakery_id )
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