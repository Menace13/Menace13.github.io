var timeouts = [];

$(document).ready (function () {
	$('input[type=radio][name=speed]').change(function() {
		for (var i = 0; i < timeouts.length; i++) {
			clearTimeout(timeouts[i]);
		}
		timeouts = [];
		if($('#speed1').is(':checked')) {
			timeouts.push(setTimeout(function(){tableUpdate();}, 60000));
			$("#countdown").html(60);
		} else {
			timeouts.push(setTimeout(function(){tableUpdate();}, 15000));	
			$("#countdown").html(15);
		}
		timeouts.push(setTimeout(function(){countdown();}, 1000));
	});
	tableWrite();
});


function tableWrite() {
	$.get("https://stats.rivalsofaether.com/api/icon_win_rates", function(response) {
        var icons = response.data;
		var teamIcons = [];
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            if (icon.icon_id === 112) {
				icon.icon_name = "Burrito Esports";
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 113) {
				icon.icon_name = "Fable Esports";
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 114) {
				icon.icon_name = "FlySociety";
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 115) {
				icon.icon_name = "Panda Global";
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 116) {
				icon.icon_name = "Tempo Storm";
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 117) {
				icon.icon_name = "VexX Gaming";
				teamIcons[teamIcons.length] = icon;
            }
        }		
		
		var tempVar = "";

		$.each(teamIcons.reverse(),function( index, value ) {
			tempVar = parseFloat(Math.round((value.wins / value.games)*10000) / 100).toFixed(2) + '%';
			$('table#tablesort tbody').append("<tr><td>"+value.icon_name+"</td><td>"+value.icon_id+"</td><td>"+value.games+"</td><td>"+value.wins+"</td><td>"+tempVar+"</td></tr>");
		});		
		
		$("table#tablesort").tablesorter({
        	sortList : [[3,1]],
			theme : 'green',
			widgets : ["columns"],
			widgetOptions : {
				columns : [ "primary" ],
			}
		}); 
	});
}

function tableUpdate() {
	$.get("https://stats.rivalsofaether.com/api/icon_win_rates", function(response) {
        var icons = response.data;
		var teamIcons = [];
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            if (icon.icon_id === 112) {
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 113) {
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 114) {
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 115) {
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 116) {
				teamIcons[teamIcons.length] = icon;
            }
            if (icon.icon_id === 117) {
				teamIcons[teamIcons.length] = icon;
            }
        }
		$('table#tablesort > tbody  > tr').each(function() {
			var $row = $(this),
    			iconID = $row.find("td:nth-child(2)").text();
			var tempGames, tempWins, tempRate;
			$.each(teamIcons,function(index,value) {
				if(value.icon_id == iconID) {
					$row.find("td:nth-child(3)").html = value.games;
					$row.find("td:nth-child(4)").html = value.wins;
					$row.find("td:nth-child(5)").html = (Math.round((value.wins / value.games)*10000) / 100) + '%';
				}
			});
		});
	});
	
	if($('#speed1').is(':checked')) {
		timeouts.push(setTimeout(function(){tableUpdate();}, 60000));
		$("#countdown").html(60);
	} else {
		timeouts.push(setTimeout(function(){tableUpdate();}, 15000));	
		$("#countdown").html(15);
	}
	
	$("#tableId").trigger("update");
	//console.log("Updated.");
}

function countdown() {
	var timer = $("#countdown").text();
	timer -= 1;
	$("#countdown").text(timer);
	timeouts.push(setTimeout(function(){countdown();}, 1000));
}

