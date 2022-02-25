<?php

namespace WBD5204;

// Database Configuration
define( 'DB_HOST',      'localhost' );
define( 'DB_PORT',      '3306' );
define( 'DB_CHARSET',   'UTF8' );
define( 'DB_NAME',      'sae_wbd0921_5204_api' );
define( 'DB_USER',      'root' );
define( 'DB_PASS',      'root' );

// Directories
define( 'UPLOADS_DIR',  'uploads' );
define( 'UPLOADS_PATH', __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . UPLOADS_DIR );
define( 'UPLOADS_URI',  'http://localhost:8080/' . UPLOADS_DIR );

// JSON Web Token
define( 'JWT_ISS',      'http://localhost:8080' );
define( 'JWT_AUD',      'http://localhost:8080' );
define( 'JWT_SECRET',   'Z>`]^|R"tK:cT{Yis60y1nCyktupkX' );
define( 'JWT_ALGO',     'HS256' );
