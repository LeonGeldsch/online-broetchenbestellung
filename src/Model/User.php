<?php

namespace WBD5204\Model;

use WBD5204\Model as AbstractModel;

final class User extends AbstractModel {

    public function emailExists( ?string $email ) : bool {
        /** @var string $query */
        $query = 'SELECT email FROM users WHERE email = :email;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->bindValue( ':email', $email );
        $statement->execute();

        /** @var array $results */
        $results = $statement->fetchAll();

        return count( $results ) > 0;
    }

    public function usernameExists( ?string $username ) : bool {
        /** @var string $query */
        $query = 'SELECT username FROM users WHERE username = :username;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->bindValue( ':username', $username );
        $statement->execute();

        /** @var array $results */
        $results = $statement->fetchAll();

        return count( $results ) > 0;
    }

    public function login( array &$errors ) : bool {
        /** @var ?string $input_username */
        $input_username = filter_input( INPUT_POST, 'username' );
        /** @var ?string $input_password */
        $input_password = filter_input( INPUT_POST, 'password' );

        /** @var bool $validate_username */
        $validate_username = empty( $input_username ) === FALSE;
        /** @var bool $validate_password */
        $validate_password = empty( $input_password ) === FALSE;

        if ( $validate_username && $validate_password ) {
            /** @var array $credentials */
            $credentials = $this->getCredentials( $input_username );
            /** @var bool $compare_passwords */
            $compare_passwords = $this->comparePasswords( $credentials, $input_password );

            // TODO: create Session Token

            if ( !$compare_passwords ) {
                $errors[ 'password' ][] = 'The Password is wrong!';
            }

            return $compare_passwords;
        }
        else {
            if ( !$validate_username ) {
                $errors[ 'username' ][] = 'Please type in a username.';
            }
            if ( !$validate_password ) {
                $errors[ 'password' ][] = 'Please type in a password.';
            }

            return FALSE;
        }
    }

    public function register( array &$errors = [] ) : bool {
        /** @var string $input_username */
        $input_username = filter_input( INPUT_POST, 'username' );
        /** @var string $input_email */
        $input_email = filter_input( INPUT_POST, 'email' );
        /** @var string $input_password */
        $input_password = filter_input( INPUT_POST, 'password' );
        /** @var string $input_password_repeat */
        $input_password_repeat = filter_input( INPUT_POST, 'password_repeat' );
        /** @var string $input_image */
        $input_image = filter_input( INPUT_POST, 'image' );

        /** @var bool $validate_username */
        $validate_username = $this->validateUsername( $errors, $input_username );
        /** @var bool $validate_email */
        $validate_email = $this->validateEmail( $errors, $input_email );
        /** @var bool $validate_password */
        $validate_password = $this->validatePassword( $errors, $input_password, $input_password_repeat );
        /** @var bool $validate_image */
        $validate_image = $this->validateImage( $errors, $input_image );

        if ( $validate_username && $validate_email && $validate_password && $validate_image ) {
            /** @var string $salt */
            $hashed_salt = $this->createHashedSalt();
            /** @var string $password */
            $hashed_password = $this->createHashedPassword( $input_password, $hashed_salt );

            /** @var string $query */
            $query = 'INSERT INTO users ( username, email, password, salt, image ) VALUES ( :username, :email, :password, :salt, :image );';

            /** @var \PDOStatement $statement */
            $statement = $this->Database->prepare( $query );
            $statement->bindValue( ':username', $input_username );
            $statement->bindValue( ':email', $input_email );
            $statement->bindValue( ':password', $hashed_password );
            $statement->bindValue( ':salt', $hashed_salt );
            $statement->bindValue( ':image', $input_image );
            $statement->execute();

            return $statement->rowCount() > 0;
        }
        else {

            return FALSE;
        }
    }

    private function comparePasswords( array $credentials, string $user_input ) : bool {
        /** @var string $hashed_salt */
        $hashed_salt = $credentials[ 'salt' ];
        /** @var string $hashed_password */
        $hashed_password = $credentials[ 'password' ];

        return $hashed_password === $this->createHashedPassword( $user_input, $hashed_salt );
    }

    private function createHashedPassword( string $password, string $salt ) : string {

        return hash( 'sha512', "{$password}{$salt}" );
    }

    private function createHashedSalt() : string {
        /** @var int $rand */
        $rand = rand(1234, 9876);
        /** @var int $time */
        $time = time();

        return hash( 'sha512', "{$time}-{$rand}" );
    }

    private function getCredentials( string $username ) : array {
        /** @var string $query */
        $query = 'SELECT id, password, salt FROM users WHERE username = :username;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->bindValue( ':username', $username );
        $statement->execute();

        return $statement->fetch();
    }
    
    private function imageExists( ?string $image ) : bool {
        /** @var string $query */
        $query = 'SELECT id FROM images WHERE id = :image;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->bindValue( ':image', $image );
        $statement->execute();

        /** @var array $results */
        $results = $statement->fetchAll();

        return count( $results ) > 0;
    }

    private function validateUsername( array &$errors, ?string $username ) : bool {
        // check if username is not NULL or empty
        if ( empty( $username ) ) {
            $errors[ 'username' ][] = 'Please type in a username.';
        }
        // check if the username is minimum 4 characters long
        if ( strlen( $username ) < 4 ) {
            $errors[ 'username' ][] = 'Username should be minimum 4 characters long.';
        }
        // check if the username is maximum 16 characters long
        if ( strlen( $username ) > 16 ) {
            $errors[ 'username' ][] = 'Username should be maximum 16 characters long.';
        }
        // check if username contains special characters of other invalid characters
        if ( preg_match( '/[^a-z_0-9]/i', $username ) ) {
            $errors[ 'username' ][] = 'Username should only contains alphanumeric characters.';
        }
        // check if the username already exists
        if ( $this->usernameExists( $username ) ) {
            $errors[ 'username' ][] = 'Username already exists.';
        }

        return isset( $errors[ 'username' ] ) === FALSE || count( $errors[ 'username' ] ) === 0;
    }

    private function validateEmail( array &$errors, ?string $email ) : bool {
        // check if the email is not NULL or empty
        if ( empty( $email ) ) {
            $errors[ 'email' ][] = 'Please type in a email.';
        }
        // check if the email is valid
        if ( filter_var( $email, FILTER_VALIDATE_EMAIL ) === FALSE ) {
            $errors[ 'email' ][] = 'Please type in a valid email.';
        }
        // check if the email already exists
        if ( $this->emailExists( $email ) ) {
            $errors[ 'email' ][] = 'Email already exists.';
        }

        return isset( $errors[ 'email' ] ) === FALSE || count( $errors[ 'email' ] ) === 0;
    }
    
    private function validateImage( array &$errors, ?string $image ) : bool {
        // check if the image is not NULL or empty
        if ( empty( $image ) ) {
            $errors[ 'image' ][] = 'Please type in a image.';
        }
        // check if the image already exists
        if ( $this->imageExists( $image ) === FALSE ) {
            $errors[ 'image' ][] = 'Image doesn\'t exist.';
        }

        return isset( $errors[ 'image' ] ) === FALSE || count( $errors[ 'image' ] ) === 0;
    }

    private function validatePassword( array &$errors, ?string $password, ?string $password_repeat ) : bool {
        // check if the password is not NULL or empty
        if ( empty( $password ) ) {
            $errors[ 'password' ][] = 'Please type in a password.';
        }
        // check if the password is minimum 8 characters long
        if ( strlen( $password ) < 8 ) {
            $errors[ 'password' ][] = 'Password should be minimum 8 characters long.';
        }
        // check if the password is maximum 64 characters long
        if ( strlen( $password ) > 64 ) {
            $errors[ 'password' ][] = 'Password should be maximum 64 characters long.';
        }
        // check if the password contains any whitespace
        if ( preg_match( '/\s/', $password ) == TRUE ) {
            $errors[ 'password' ][] = 'Password should not contain any whitespace.';
        }
        // check if the password contains lowercase characters
        if ( preg_match( '/[a-z]/', $password ) == FALSE ) {
            $errors[ 'password' ][] = 'Password should contain minimum one lowercase letter.';
        }
        // check if the password contains uppercase characters
        if ( preg_match( '/[A-Z]/', $password ) == FALSE ) {
            $errors[ 'password' ][] = 'Password should contain minimum one uppercase letter.';
        }
        // check if the password contains digits
        if ( preg_match( '/\d/', $password ) == FALSE ) {
            $errors[ 'password' ][] = 'Password should contain minimum one digit.';
        }
        // check if the password contains special characters
        if ( preg_match( '/\W/', $password ) == FALSE ) {
            $errors[ 'password' ][] = 'Password should contain minimum one special character.';
        }

        if ( empty( $password_repeat ) ) {
            $errors[ 'password_repeat' ][] = 'Please type in a password.';
        }
        if ( $password !== $password_repeat ) {
            $errors[ 'password_repeat' ][] = 'Passwords dosn\'t match.';
        }

        return ( isset( $errors[ 'password' ] ) === FALSE || count( $errors[ 'password' ] ) === 0 )
            && ( isset( $errors[ 'password_repeat' ] ) === FALSE || count( $errors[ 'password_repeat' ] ) === 0 );
    }

}
