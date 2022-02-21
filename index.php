<?php

namespace WBD5204;

// Error Reporting
error_reporting( E_ALL );
ini_set( 'display_errors', '1' );

/** @var string $autoload_file */
$autoload_file = __DIR__ . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

/** @var string $configuration_file */
$configuration_file = __DIR__ . DIRECTORY_SEPARATOR . 'config.php';

// Check if the autoload file exists
if ( !file_exists( $autoload_file ) ) {
    trigger_error(
        sprintf(
            'Autoload file (%s) doesn\'t exist!',
            $autoload_file
        ),
        E_USER_ERROR
    );
}

// Check if the configuration file exists
if ( !file_exists( $configuration_file ) ) {
    trigger_error(
        sprintf(
            'Configuration file (%s) doesn\'t exist',
            $configuration_file
        ),
        E_USER_ERROR
    );
}

// Require autoload file
require_once $autoload_file;
// Require configuration file
require_once $configuration_file;

// Create an instance of API and call run
( new API() )->run();
