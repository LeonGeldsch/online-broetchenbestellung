<?php

namespace WBD5204\Model;

use WBD5204\Model as AbstractModel;

final class Posts extends AbstractModel {

    public function createPost( array &$errors ) : bool {
        /** @var string $input_user_id */
        $input_user_id = filter_input( INPUT_POST, 'user_id' );
        /** @var string $input_title */
        $input_title = filter_input( INPUT_POST, 'title' );
        /** @var string $input_content */
        $input_content = filter_input( INPUT_POST, 'content' );

        /** @var bool $validate_title */
        $validate_title = $this->validateTitle( $errors, $input_title );
        /** @var bool $validate_content */
        $validate_content = $this->validateContent( $errors, $input_content );

        if ( $validate_title && $validate_content ) {
            /** @var string $query */
            $query = 'INSERT INTO posts ( user_id, title, content ) VALUES ( :user_id, :title, :content );';

            /** @var \PDOStatement $statement */
            $statement = $this->Database->prepare( $query );
            $statement->bindValue( ':user_id', $input_user_id );
            $statement->bindValue( ':title', $input_title );
            $statement->bindValue( ':content', $input_content );
            $statement->execute();

            return $statement->rowCount() > 0;
        }
        else {

            return FALSE;
        }
    }

    public function deletePost( array &$errors, ?string $post_id ) : bool {
        /** @var bool $validate_post_id */
        $validate_post_id = $this->validatePostId( $errors, $post_id );

        if ( $validate_post_id ) {
            /** @var string $query */
            $query = 'DELETE FROM posts WHERE id = :id;';

            /** @var \PDOStatement $statement */
            $statement = $this->Database->prepare( $query );
            $statement->bindValue( ':id', $post_id );
            $statement->execute();

            return $statement->rowCount() > 0;
        }
        else {

            return FALSE;
        }
    }

    public function getPost( array &$errors, array &$result, ?string $post_id ) : bool {
        /** @var bool $validate_post_id */
        $validate_post_id = $this->validatePostId( $errors, $post_id );

        if ( $validate_post_id ) {
            /** @var string $query */
            $query = 'SELECT id, user_id, title, content FROM posts WHERE id = :id;';

            /** @var \PDOStatement $statement */
            $statement = $this->Database->prepare( $query );
            $statement->bindValue( ':id', $post_id );
            $statement->execute();

            $result = $statement->fetch();

            return count( $result ) > 0;
        }
        else {

            return FALSE;
        }
    }

    public function getPosts( array &$errors, array &$results ) : bool {
        /** @var string $query */
        $query = 'SELECT id, user_id, title, content FROM posts;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->execute();

        $results = $statement->fetchAll();

        return count( $results ) > 0;
    }

    public function updatePost( array &$errors, ?string $post_id ) : bool {
        /** @var array $form_data */
        $form_data = $this->getFormData();
        /** @var ?string $input_title */
        $input_title = $form_data[ 'title' ] ?? NULL;
        /** @var ?string $input_content */
        $input_content = $form_data[ 'content' ] ?? NULL;

        /** @var bool $validate_title */
        $validate_title = $this->validateTitle( $errors, $input_title );
        /** @var bool $validate_content */
        $validate_content = $this->validateContent( $errors, $input_content );
        /** @var bool $validate_post_id */
        $validate_post_id = $this->validatePostId( $errors, $post_id );

        if ( $validate_post_id && $validate_title && $validate_content ) {
            /** @var string $query */
            $query = 'UPDATE posts SET title = :title, content = :content WHERE id = :id;';

            $statement = $this->Database->prepare( $query );
            $statement->bindValue( ':id', $post_id );
            $statement->bindValue( ':title', $input_title );
            $statement->bindValue( ':content', $input_content );
            $statement->execute();

            return $statement->rowCount() > 0;
        }
        else {

            return FALSE;
        }
    }

    private function postIdExists( ?string $post_id ) : bool {
        /** @var string $query */
        $query = 'SELECT id FROM posts WHERE id = :id;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->bindValue( ':id', $post_id );
        $statement->execute();

        /** @var array $results */
        $results = $statement->fetchAll();

        return ( count( $results ) ) > 0;
    }

    private function validateContent( array &$errors, ?string $content ) : bool {
        // check if the content is not NULL or empty
        if ( empty( $content ) ) {
            $errors[ 'content' ][] = 'Please type in a content.';
        }
        // check if the content is minimum 50 characters long
        if ( strlen( $content ) < 50 ) {
            $errors[ 'content' ][] = 'The content must be minimum 50 characters long.';
        }
        // check if the content is maximum 550 characters long
        if( strlen( $content ) > 550 ) {
            $errors[ 'content' ][] = 'The content must be maximum 550 characters long.';
        }

        return isset( $errors[ 'content' ] ) === FALSE || count( $errors ) === 0;
    }

    private function validatePostId( array &$errors, ?string $post_id ) : bool {
        if ( empty( $post_id ) ) {
            $errors[ 'post_id' ][] = 'Please type in a post-id.';
        }
        if ( $this->postIdExists( $post_id ) === FALSE  ) {
            $errors[ 'post_id' ][] = 'The post-id doesn\'t exist.';
        }

        return isset( $errors[ 'post_id' ] ) === FALSE || count( $errors[ 'post_id' ] ) === 0;
    }

    private function validateTitle( array &$errors, ?string $title ) : bool {
        // check if the title is not NULL or empty
        if ( empty( $title ) ) {
            $errors[ 'title' ][] = 'Please type in a title.';
        }
        // check if the title is minimum 16 characters long
        if ( strlen( $title ) < 16 ) {
            $errors[ 'title' ][] = 'The title must be minimum 16 characters long.';
        }
        // check if the title is maximum 50 characters long
        if ( strlen( $title ) > 50 ) {
            $errors[ 'title' ][] = 'The title must be maximum 50 characters long.';
        }

        return isset( $errors[ 'title' ] )  === FALSE || count( $errors[ 'title' ] ) === 0;
    }

}