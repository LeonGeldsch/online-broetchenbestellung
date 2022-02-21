<?php

namespace WBD5204\Controller;

use WBD5204\Authorize;
use WBD5204\Controller as AbstractController;
use WBD5204\Model\Posts as PostsModel;

final class Posts extends AbstractController {

    public function __construct() {
        $this->PostsModel = new PostsModel();
    }

    // @POST
    public function create() : void {
        /** @var array $errors */
        $errors = [];

        if (
                $this->isMethod( self::METHOD_POST )
            && Authorize::authorizeToken( $errors )
            &&  $this->PostsModel->createPost( $errors )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'jwt' => Authorize::createToken() ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

    // @DELETE
    public function delete( ?string $post_id = NULL ) : void {
        /** @var array $errors */
        $errors = [];

        if (
                $this->isMethod( self::METHOD_DELETE )
            && Authorize::authorizeToken( $errors )
            &&  $this->PostsModel->deletePost( $errors, $post_id )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'jwt' => Authorize::createToken() ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

    // @GET
    public function get( ?string $post_id = NULL ) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if (
                $this->isMethod( self::METHOD_GET )
            &&  $this->PostsModel->getPost( $errors, $result, $post_id )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'result' => $result ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

    // @GET
    public function index() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $results */
        $results = [];

        if (
                $this->isMethod( self::METHOD_GET )
            &&  $this->PostsModel->getPosts( $errors, $results )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'results' => $results ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }

    }

    // @PUT
    public function update( ?string $post_id = NULL ) : void {
        /** @var array $errors */
        $errors = [];

        if (
                $this->isMethod( self::METHOD_PUT )
            &&  Authorize::authorizeToken( $errors )
            &&  $this->PostsModel->updatePost( $errors, $post_id )
        ) {
            $this->responseCode( 200 );
            $this->printJSON( [ 'success' => true, 'jwt' => Authorize::createToken() ] );
        }
        else {
            $this->responseCode( 400 );
            $this->printJSON( [ 'errors' => $errors ] );
        }
    }

}
