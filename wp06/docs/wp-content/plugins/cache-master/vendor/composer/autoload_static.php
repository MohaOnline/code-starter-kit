<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit3c9a4468cbb6b66282c6642a625af63a
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'WpUnit\\' => 7,
        ),
        'S' => 
        array (
            'Shieldon\\SimpleCache\\' => 21,
        ),
        'P' => 
        array (
            'Psr\\SimpleCache\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'WpUnit\\' => 
        array (
            0 => __DIR__ . '/../..' . '/tests/src',
        ),
        'Shieldon\\SimpleCache\\' => 
        array (
            0 => __DIR__ . '/..' . '/shieldon/simple-cache/src/SimpleCache',
        ),
        'Psr\\SimpleCache\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/simple-cache/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit3c9a4468cbb6b66282c6642a625af63a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit3c9a4468cbb6b66282c6642a625af63a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit3c9a4468cbb6b66282c6642a625af63a::$classMap;

        }, null, ClassLoader::class);
    }
}