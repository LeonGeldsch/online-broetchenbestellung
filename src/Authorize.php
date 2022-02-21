<?php

namespace WBD5204;

use Firebase\JWT\JWT;

abstract class Authorize {

    const ALGO      = JWT_ALGO;
    const AUD       = JWT_AUD;
    const ISS       = JWT_ISS;
    const SECRET    = JWT_SECRET;

    private static array $matches = [];

    public static function createToken() : array {
        return (array) JWT::encode(
            self::createData(),
            self::SECRET,
            self::ALGO
        );
    }

    public static function authorizeToken( array &$errors ) : bool {
        if ( self::checkIfTokenExists() === FALSE ) {
            $errors[ 'jwt' ][] = 'No Authorization in Header';

            return FALSE;
        }
        if ( self::checkIfTokenMatched() === FALSE ) {
            $errors[ 'jwt' ][] = 'No Token in Authorization Header';

            return FALSE;
        }

        try {
            /** @var array $token */
            $token = self::getToken();

            if (
                $token[ 'iss' ] !== self::ISS
                ||  $token[ 'nbf' ] > self::createCurrentTimestamp()
                ||  $token[ 'exp' ] < self::createCurrentTimestamp()
            ) {
                $errors[ 'jwt' ][] = 'Invalid or expired Token';

                return FALSE;
            }

            return TRUE;
        } catch ( \Exception $exception ) {
            $errors[ 'jwt' ][] = $exception->getMessage();

            return FALSE;
        }
    }

    private static function checkIfTokenExists() : bool {

        return @preg_match( '/AUTHORIZE\s(\S+)/', $_SERVER[ 'HTTP_AUTHORIZATION' ], self::$matches);
    }

    private static function checkIfTokenMatched() : bool {

        return isset( self::$matches[ 1 ] );
    }

    private static function createCurrentTimestamp() : int {

        return ( new \DateTimeImmutable() )->getTimestamp();
    }

    private static function createData() : array {
        return [
            'iss'   =>  self::ISS,
            'aud'   =>  self::AUD,
            'iat'   =>  self::createCurrentTimestamp(),
            'nbf'   =>  self::createCurrentTimestamp(),
            'exp'   =>  self::createExpirationTimestamp()
        ];
    }

    private static function createExpirationTimestamp() : int {

        return ( new \DateTimeImmutable() )->modify( '+5 minutes' )->getTimestamp();
    }

    private static function getToken() : array {
        JWT::$leeway = 30;  // Spielraum um 30 Sekunden erhöhen

        return (array) JWT::decode( self::$matches[ 1 ], self::SECRET, [ self::ALGO ] );
    }

}
