import { db } from "./firebase-config.js";
import { getDocs, collection } from "firebase/firestore";
import $ from "jquery";

document.addEventListener("DOMContentLoaded", (e) => {
	let autoCompleteData = {};

	var elems = document.querySelectorAll(".sidenav");
	var sidenavInstances = M.Sidenav.init(elems);

	var carouselElems = document.querySelectorAll(".carousel");
	var carouselInstances = M.Carousel.init(carouselElems, {
		indicators: true,
		duration: 500,
		dist: -100,
		fullWidth: false,
		shift: 100,
		padding: 30,
		noWrap: true,
	});

	getDocs(collection(db, "location")).then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			autoCompleteData[doc.data().name] = null;
		});
	});

	var autocomplete = document.querySelectorAll(".autocomplete");
	var instances = M.Autocomplete.init(autocomplete, {
		data: autoCompleteData,
		onAutocomplete: onSelect,
	});
});

window.addEventListener("wheel", (e) => {
	if (document.getElementById("anim").classList.contains("down-scroll")) {
		document.querySelector(".level").classList.add("start");
	}
});

$('input[type="search"]').on("click focus blur ", (e) => {
	if ($('input[type="search"]').is(":focus")) {
		$(".links > ul > li > a").css("color", "black");
	} else {
		$(".links > ul > li > a").css("color", "white");
	}
});

function onSelect() {
	let loc = $("#autocomplete-input").val();
	location.href = `/location/${loc}`;
}
