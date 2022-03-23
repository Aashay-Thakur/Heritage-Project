import { db } from "./firebase-config";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Loader } from "@googlemaps/js-api-loader";

let map;
let marker;

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".parallax");
	var instances = M.Parallax.init(elems, {});
});

const locationRef = location.pathname.split("/")[2].replace(/\%20/g, " ");

const dataHeader = document.querySelector(".data-header");
const dataContent = document.querySelector(".data-content");
const animHeader = document.querySelector(".anim-data-header");

const backgrounds = document.querySelectorAll(".background");

getDocs(query(collection(db, "location"), where("name", "==", locationRef))).then((Snapshot) => {
	if (!Snapshot.empty) {
		let doc = Snapshot.docs[0].data();
		let { name, description, state } = doc;
		let imageArr = doc.images;

		dataHeader.textContent = name;
		animHeader.setAttribute("data-content", name);
		animHeader.childNodes[0].textContent = name;
		dataContent.textContent = description;

		for (let i = 0; i < backgrounds.length; i++) {
			backgrounds[i].style.backgroundImage = `url(${imageArr[i]})`;
		}

		const loader = new Loader({
			apiKey: "AIzaSyCI6e6fGfrtOYExhhGoy_XCkdyuuaf8s0I",
			version: "weekly",
		});

		loader.load().then(() => {
			const location = { lat: doc.geo.latitude, lng: doc.geo.longitude };
			map = new google.maps.Map(document.getElementById("map"), {
				center: location,
				zoom: 15,
				mapTypeId: "hybrid",
			});
			marker = new google.maps.Marker({
				position: location,
				map: map,
			});
		});
	}
});
