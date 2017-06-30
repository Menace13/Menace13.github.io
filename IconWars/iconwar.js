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
				categories: ['Burrito Esports', 'Fable Esports', 'FlySociety', 'Panda Global', 'Tempo Storm', 'VexX Gaming']
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
			timeouts.push(setTimeout(function(){tableUpdate();}, 60000));
			$("#countdown").html(60);
		} else {
			timeouts.push(setTimeout(function(){tableUpdate();}, 15000));	
			$("#countdown").html(15);
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
            if (icon.icon_id === 112) {
				icon.icon_name = "<img src='img/112.png' alt='112' height='45' width='45'>" + "Burrito Esports";
				teamIcons[teamIcons.length] = icon;
				dataArray[0] = icon.wins;
            }
            if (icon.icon_id === 113) {
				icon.icon_name = "<img src='img/113.png' alt='113' height='45' width='45'> Fable Esports";
				teamIcons[teamIcons.length] = icon;
				dataArray[1] = icon.wins;
            }
            if (icon.icon_id === 114) {
				icon.icon_name = "<img src='img/114.png' alt='114' height='45' width='45'> FlySociety";
				teamIcons[teamIcons.length] = icon;
				dataArray[2] = icon.wins;
            }
            if (icon.icon_id === 115) {
				icon.icon_name = "<img src='img/115.png' alt='115' height='45' width='45'> Panda Global";
				teamIcons[teamIcons.length] = icon;
				dataArray[3] = icon.wins;
            }
            if (icon.icon_id === 116) {
				icon.icon_name = "<img src='img/116.png' alt='116' height='45' width='45'> Tempo Storm";
				teamIcons[teamIcons.length] = icon;
				dataArray[4] = icon.wins;
            }
            if (icon.icon_id === 117) {
				icon.icon_name = "<img src='img/117.png' alt='117' height='45' width='45'> VexX Gaming";
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
            if (icon.icon_id === 112) {
				teamIcons[teamIcons.length] = icon;
				dataArray[0] = icon.wins;
            }
            if (icon.icon_id === 113) {
				teamIcons[teamIcons.length] = icon;
				dataArray[1] = icon.wins;
            }
            if (icon.icon_id === 114) {
				teamIcons[teamIcons.length] = icon;
				dataArray[2] = icon.wins;
            }
            if (icon.icon_id === 115) {
				teamIcons[teamIcons.length] = icon;
				dataArray[3] = icon.wins;
            }
            if (icon.icon_id === 116) {
				teamIcons[teamIcons.length] = icon;
				dataArray[4] = icon.wins;
            }
            if (icon.icon_id === 117) {
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
		timeouts.push(setTimeout(function(){tableUpdate();}, 30E4));
		$("#countdown").html(300);
	} else {
		timeouts.push(setTimeout(function(){tableUpdate();}, 6E4));	
		$("#countdown").html(60);
	}
}

function countdown() {
	var timer = $("#countdown").text();
	timer -= 1;
	$("#countdown").text(timer);
	timeouts.push(setTimeout(function(){countdown();}, 1000));
}

