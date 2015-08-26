<?php
	// include "components/connect.php";
?>

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<html>

<?php include "components/head.php"; ?>

	<body>
		
		<?php 

			include "components/header.php";

			$game_class = array_key_exists('game', $_GET)?$_GET['game']:"original";
			include "components/game.php";

			include "components/footer.php";

		?>

	</body>

</html>