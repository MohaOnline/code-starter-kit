=== Plugin Name ===
Contributors: markusfroehlich
Donate link: https://www.paypal.com/donate?business=DUKJP25LKTX62&currency_code=EUR
Tags: polylang, multilingual, browser, country, detection
Requires at least: 4.9
Tested up to: 6.0.2
Stable tag: 1.3.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This plugin detects the preferred language according on the country.

== Description ==

Polylang is a fantastic plugin to make WordPress multilingual. The Polylang extension enables you to detect the preferred language according on the country.

If your website contains 2 different locales with the same language (e.g. de_DE for German/German and de_AT for German/Austria) then Polylang automatically sets the language according to the browser settings.

Austrian website visitors who have set their operating system / browser to Germany (e.g. the Devices was buyed in Germany) will always be redirected to de_DE.

This Plugin detects the preferred language according on the visitors country and will set the language correct to de_AT.

Please notice that the IP API is only for non-commercial use allowed.

= Required Plugin =

* [Polylang Pro](https://polylang.pro) by WP SYNTEX - Polylang allows you to create a bilingual or multilingual WordPress site.

== Installation ==

1. Install the required Polylang Plugin available at https://polylang.pro
2. Upload 'pll-country-detection' to the '/wp-content/plugins/' directory, or install the plugin through the WordPress plugins screen directly.
3. Activate the plugin through the 'Plugins' screen in WordPress.
4. Enable the "Detect browser language" option in "Languages > Settings"

== Frequently Asked Questions ==

= How does the country detection works? =

The plugin detects the country with the IP Geolocation API (https://ip-api.com/).
If no available language by country is found, the language of the browser is preferred. (https://polylang.pro/doc/detect-the-browser-preferred-language/)

= I found a bug, what shall I do? =

If you have found a bug in my plugin, please send me an email with a short description.
I will fix the bug as soon as possible.

= You like my plugin and you'd like to support me? =

Thank you very much!
In case you want to show how much you appreciate my work, I'd be very grateful if you could give me positive rating with Wordpress-Page and/or donate a small amount to me.

== Changelog ==
= 1.3.1 =
* Fix - Check if the class Polylang_Country_Detection already exists

= 1.3.0 =
* Feature - Anonymize the IP addresses from the client
* Dev - Changed the geolocation API from ip-api.com to iplocate.io
* Dev - Check compatibility with latest Polylang and WordPress Version

= 1.2.1 =
* Fix - Filter all non active languages

= 1.2.0 =
* Translation functionality added

= 1.1.0 =
* Fix - Lanaguage variable return issue

= 1.0.0 =
* Initial Release
* Check compatibility with latest Polylang and WordPress Version