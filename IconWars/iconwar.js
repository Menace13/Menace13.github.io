var MyChartComponent = {
	initHighcharts: function() {
		this.chart = Highcharts.chart('container', {
			chart: {
				type: 'bar'
			},
			credits: {
				enabled: false
			},
			title: {
				text: 'Icon War Total Wins'
			},
			xAxis: {
				categories: ['Flash Point', 'Hound Esports', 'ManDown Esports', 'Most Valuable Gaming', 'Tuxedo Esports', 'Vireo.pro']
			},
			yAxis: {
				title: {
					text: 'Total Wins'
				}
			},
			legend: {
				enabled: false
			},
			tooltip: {
				valueSuffix: ' wins'
			},
			series: [{
				name: 'Wins',
				data: [0,0,0,0,0,0],
				color: '#99e6a6'
			}],
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						align: 'right',
						floating: true,
						style: {
							"color": "#222",
							"fontSize": "11px",
							"fontWeight": "bold",
							"textOutline": "none"
						},
						x: -4
					}
				}
			}
		});
		this.chart.showLoading();
	},
	updateChart: function(dataArray) {		
		this.chart.series[0].setData(dataArray);
		this.chart.redraw();
		this.chart.hideLoading();
		//console.log("Chart updated.");
	}
};

var timeouts = [];

$(document).ready (function () {
	Highcharts.setOptions({
		lang: {
			decimalPoint: '.',
			thousandsSep: ','
		}
	})
	$('input[type=radio][name=speed]').change(function() {
		for (var i = 0; i < timeouts.length; i++) {
			clearTimeout(timeouts[i]);
		}
		timeouts = [];
		if($('#speed1').is(':checked')) {
			timeouts.push(setTimeout(function(){tableUpdate();}, 300E3));
			$("#countdown").html(300);
		} else {
			timeouts.push(setTimeout(function(){tableUpdate();}, 60E3));	
			$("#countdown").html(60);
		}
		timeouts.push(setTimeout(function(){countdown();}, 1000));
	});
	MyChartComponent.initHighcharts();
	tableWrite();
});


function tableWrite() {
	$.get("https://stats.rivalsofaether.com/api/icon_win_rates?match_time=30&connect_types[]=ranked", function(response) {
        var icons = response.data;
		var teamIcons = [];
		
		var dataArray = [0,0,0,0,0,0];
		
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            if (icon.icon_id === 199) {
				icon.icon_name = "<img src='img/199.png' alt='199' height='45' width='45'>" + "Flash Point";
				teamIcons[teamIcons.length] = icon;
				dataArray[0] = icon.wins;
            }
            if (icon.icon_id === 200) {
				icon.icon_name = "<img src='img/200.png' alt='200' height='45' width='45'> Hound Esports";
				teamIcons[teamIcons.length] = icon;
				dataArray[1] = icon.wins;
            }
            if (icon.icon_id === 201) {
				icon.icon_name = "<img src='img/201.png' alt='201' height='45' width='45'> ManDown Esports";
				teamIcons[teamIcons.length] = icon;
				dataArray[2] = icon.wins;
            }
            if (icon.icon_id === 202) {
				icon.icon_name = "<img src='img/202.png' alt='202' height='45' width='45'> Most Valuable Gaming";
				teamIcons[teamIcons.length] = icon;
				dataArray[3] = icon.wins;
            }
            if (icon.icon_id === 203) {
				icon.icon_name = "<img src='img/203.png' alt='203' height='45' width='45'> Tuxedo Esports";
				teamIcons[teamIcons.length] = icon;
				dataArray[4] = icon.wins;
            }
            if (icon.icon_id === 204) {
				icon.icon_name = "<img src='img/204.png' alt='204' height='45' width='45'> Vireo.pro";
				teamIcons[teamIcons.length] = icon;
				dataArray[5] = icon.wins;
            }
        }
		
		MyChartComponent.updateChart(dataArray);
		
		var tempWinRate = "";
		var tempPercentGames = "";
		var tempPercentWins = "";
		var maxWins = 0;
		var totalWins = 0;
		var totalGames = 0;

		$.each(teamIcons,function(index,value) {
			if(value.wins > maxWins) {
				maxWins = value.wins;
			}
			totalWins += value.wins;
			totalGames += value.games;
		});		
		
		$.each(teamIcons.reverse(),function( index, value ) {
			tempWinRate = parseFloat(Math.round((value.wins / value.games)*10000) / 100).toFixed(2) + '%';
			tempPercentGames = parseFloat(Math.round((value.games / totalGames)*10000) / 100).toFixed(2) + '%';
			tempPercentWins = parseFloat(Math.round((value.wins / totalWins)*10000) / 100).toFixed(2) + '%';
			$('table#tablesort tbody').append("<tr><td>"+value.icon_name+"</td><td>"+value.icon_id+"</td><td>"+value.games+"</td><td>"+value.wins+"</td><td>"+(maxWins-value.wins)+"</td><td>"+tempWinRate+"</td><td>"+tempPercentGames+"</td><td>"+tempPercentWins+"</td></tr>");
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
	$.get("https://stats.rivalsofaether.com/api/icon_win_rates?match_time=30&connect_types[]=ranked", function(response) {
        var icons = response.data;
		var teamIcons = [];
		var maxWins = 0;
		
		var dataArray = [0,0,0,0,0,0];
		
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            if (icon.icon_id === 199) {
				teamIcons[teamIcons.length] = icon;
				dataArray[0] = icon.wins;
            }
            if (icon.icon_id === 200) {
				teamIcons[teamIcons.length] = icon;
				dataArray[1] = icon.wins;
            }
            if (icon.icon_id === 201) {
				teamIcons[teamIcons.length] = icon;
				dataArray[2] = icon.wins;
            }
            if (icon.icon_id === 202) {
				teamIcons[teamIcons.length] = icon;
				dataArray[3] = icon.wins;
            }
            if (icon.icon_id === 203) {
				teamIcons[teamIcons.length] = icon;
				dataArray[4] = icon.wins;
            }
            if (icon.icon_id === 204) {
				teamIcons[teamIcons.length] = icon;	
				dataArray[5] = icon.wins;
            }
		}
		
		MyChartComponent.updateChart(dataArray);
		
		var totalWins = 0;
		var totalGames = 0;		
		
		$.each(teamIcons,function(index,value) {
			if(value.wins > maxWins) {
				maxWins = value.wins;
			}
			totalWins += value.wins;
			totalGames += value.games;
		})
		$('table#tablesort > tbody > tr').each(function() {
			var $row = $(this),
    			iconID = $row.find("td:nth-child(2)").text();
			var tempGames, tempWins, tempRate;
			$.each(teamIcons,function(index,value) {
				if(value.icon_id == iconID) {
					$row.find("td:nth-child(3)").text(value.games);
					$row.find("td:nth-child(4)").text(value.wins);
					$row.find("td:nth-child(5)").text(maxWins-value.wins);
					$row.find("td:nth-child(6)").text(parseFloat(Math.round((value.wins / value.games)*10000) / 100).toFixed(2) + '%');
					$row.find("td:nth-child(7)").text(parseFloat(Math.round((value.games / totalGames)*10000) / 100).toFixed(2) + '%');
					$row.find("td:nth-child(8)").text(parseFloat(Math.round((value.wins / totalWins)*10000) / 100).toFixed(2) + '%');
				}
			});
		});
		var resort = true,
			callback = function(table){};

		$("table#tablesort").trigger("update", [ resort, callback ]);		
	});
	
	//console.log("Updated.");	
	
	if($('#speed1').is(':checked')) {
		timeouts.push(setTimeout(function(){tableUpdate();}, 300E3));
		$("#countdown").html(300);
	} else {
		timeouts.push(setTimeout(function(){tableUpdate();}, 60E3));	
		$("#countdown").html(60);
	}
}

function countdown() {
	var timer = $("#countdown").text();
	timer -= 1;
	$("#countdown").text(timer);
	timeouts.push(setTimeout(function(){countdown();}, 1000));
}

