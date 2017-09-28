const kbgMulti = 0.12;

var aFriction = 0.04;
var angle = 90;
var angleDI = 180;
var bkb = 8;
var drift = 0;
var G = 0.50;
var hitstunMod = 1.00;
var kbg = 1.10;
var weight = 1.00;
var etalusArmor = false;
var percentage = 107;

$(document).ready(function() {
	calculate();
	$('[data-toggle="tooltip"]').tooltip(); 
	$("#targetC").change(function() {
		charAttributes();
	});
	$("#driftDI").change(function() {
		driftDI();
	})
	$(".form-control").change(function() {
		angle = $("#angle1").val();
		angleDI = $("#angle2").val();
		bkb = $("#attackBKB").val();
		hitstunMod = $("#hMod").val();
		kbg = $("#attackKBG").val();
		percentage = parseInt($("#targetP").val()) + parseInt($("#attackP").val());
		if(percentage > 999) { percentage = 999; };
		calculate();
	});
});

function driftDI() {
	var driftDI = $("#driftDI").val();
	switch(driftDI) {
		case "Left":
			drift = -1.25;
			break;
		case "None":
			drift = 0;
			break;
		case "Right":
			drift = 1.25;
			break;
	}
}

function charAttributes() {
	etalusArmor = false;
	var character = $("#targetC").val();
	switch(character) {
		case "Absa":
			aFriction = 0.04;
			G = 0.45;
			weight = 1.10;
			break;
		case "Etalus":
			aFriction = 0.04;
			G = 0.50;
			weight = 0.90;
			break;
		case "Etalus (armor)":
			aFriction = 0.04;
			G = 0.60;
			weight = 0.90;
			etalusArmor = true;
			break;
		case "Forsburn":
			aFriction = 0.04;
			G = 0.50;
			weight = 1.00;
			break;
		case "Kragg":
			aFriction = 0.04;
			G = 0.53;
			weight = 0.90;
			break;
		case "Maypul":
			aFriction = 0.05;
			G = 0.50;
			weight = 1.10;
			break;
		case "Orcane":
			aFriction = 0.07;
			G = 0.50;
			weight = 1.00;
			break;
		case "Ori":
			aFriction = 0.03;
			G = 0.50;
			weight = 1.15;
			break;
		case "Wrastor":
			aFriction = 0.04;
			G = 0.45;
			weight = 1.20;
			break;
		case "Zetterburn":
			aFriction = 0.04;
			G = 0.50;
			weight = 1.00;
			break;
	}
}

function calculate() {
	//console.log(bkb + " " + kbg + " " + percentage + " " + weight);
	
	var finalKB = parseFloat(bkb) + parseFloat(kbg * weight * percentage * kbgMulti);
	
	//console.log(finalKB);
	
	var finalAngle = parseFloat(angle) + parseFloat(18 * Math.sin(rad(angleDI - angle)));
	
	//console.log(finalAngle);
	
	//Hitstun: BKB * 4 * ((knockback_adj - 1) * 0.6 + 1) + player_damage * 0.12 * scaling * 4 * 0.65 * knockback_adj
	
	var hitstun = parseFloat(bkb * 4 * (parseFloat((weight - 1) * 0.6) + parseFloat(1))) + parseFloat(percentage * 0.12 * kbg * 4 * 0.65 * weight);
	
	hitstun *= hitstunMod;
		
	if(etalusArmor) {
		finalKB *= 0.70;
		hitstun *= 0.70;
	}
	
	var x = 0;
	var y = 0;
	var velX = 0;
	var velY = 0;
	
	var maxY = 0;
	
	var hsFrames = 0;
	
	velX = Math.cos(rad(finalAngle)) * finalKB;
	velY = Math.sin(rad(finalAngle)) * finalKB;
	
	//console.log("("+velX+","+velY+")");
	
	var buildUpon = "";
	
	for(var i = 1; i < (hitstun + 1); i++) {
		var driftMod = 1;
		
		if(velX < 5) {
			driftMod = 1;
		} else if(velX > 10) {
			driftMod = 0.5;
		} else {
			driftMod = 5/velX;
		}
		
		x += parseFloat(velX);
		y += parseFloat(velY);
		velX += parseFloat(drift * driftMod * 0.1);
		if(velX >= aFriction) {
			velX -= parseFloat(aFriction);			
		} else if (velX <= (aFriction * -1)) {
			velX += parseFloat(aFriction);
		} else {
			velX = 0;
		}
		velY -= parseFloat(G);
		//console.log(i + " : " + x + "," + y + "," + velX + "," + velY);
		if(Math.sin(rad(finalAngle)) > 0) {
			if(y > maxY) {
				maxY = y;
			}
		}
		hsFrames = i;
	}
	
	finalKB = Math.round(finalKB * 100) / 100;
	finalAngle = Math.round(finalAngle * 100) / 100;
	x = Math.round(x);
	y = Math.round(y);
	maxY = Math.round(maxY);
	
	buildUpon += "Final knockback: " + finalKB + " pixels per frame<br>";
	buildUpon += "Final knockback angle: " + finalAngle + " degrees<br>";
	buildUpon += "Total frames of hitstun: " + hsFrames + " frames<br>";
	buildUpon += "Max height (in hitstun): " + maxY + " pixels<br>";
	buildUpon += "Position after hitstun: (" + x + "," + y + ")<br>";
	if(Math.sin(rad(finalAngle)) < 0) {
		buildUpon += "<br>Disclaimer: Calculations may have some errors for moves with downwards knockback."
	}
	if(etalusArmor) {
		buildUpon += "<br>Disclaimer: Hitstun calculation for Etalus with armor may be slightly off."
	}
	$("#output").html(buildUpon);
}

function rad(angle) {
  return angle * (Math.PI / 180);
}