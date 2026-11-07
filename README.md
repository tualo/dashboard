# dashboard

login and dashboad component

Breadcrumb highlighting follows the active stage card, including direct card
changes outside `showStage`. Classic observes each stage card's `activate`
event; Modern observes the stage's `activeitemchange` event.

Avatars use `naas/php-initial-avatar-generator` ^4.5.0 with Intervention
Image 3, compatible with Profile and Guzzle HTTP 8.3.1. PHP 8.1+, mbstring
and GD are required. Dashboard avatar values remain PNG data URIs with
64x64 square images and deterministic name-based background colors.
The bundled font and initials rendering come from the new generator.