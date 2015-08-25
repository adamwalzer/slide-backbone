<nav>
	<div class="toggle">
		<span></span>
		<span></span>
		<span></span>
	</div>
	<ul>
	<?php

	$query_get_pages = "
		SELECT ID, post_title FROM wp_posts
		WHERE post_type='page'
		AND post_status='publish'
		AND post_parent=0
		ORDER BY menu_order
		";

	$result_get_pages = mysqli_query($dbc, $query_get_pages);
	while($post_row = mysqli_fetch_array($result_get_pages, MYSQLI_ASSOC)) {
		echo "<li><a href='?".array_search($post_row['ID'], $pages)."' class='".($p==$post_row['ID']?'active':'')."'>".$post_row['post_title']."</a></li>";
	}

	?>
		<li>
			<?php
				include "appointment.php";
			?>
		</li>
	</ul>
</nav>