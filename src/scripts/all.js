import { db } from "./firebase-config.js";
import { getDocs, collection } from "firebase/firestore";
import $ from "jquery";

getDocs(collection(db, "location")).then((querySnapshot) => {
	let truncateCount = 150;
	querySnapshot.forEach((doc) => {
		if (getCount().lastRowCardCount < 3) {
			var shortDescription = doc.data().description;
			$(getCount().lastCardElem).append(`
                <div class="col s12 m4">
                    <div class="card hoverable large">
                        <div class="card-image">
                            <img class="materialboxed responsive-img" src="${doc.data().images[0]}">
                            <span class="card-title">${doc.data().name}</span>
                        </div>
                        <div class="card-content">
                            <p>${shortDescription.substring(0, truncateCount) + "..."}</p>
                        </div>
                        <div class="card-action">
                            <a href="/location/${doc.data().name.replace(/\s/g, "%20")}">See more</a>
                        </div>
                    </div>
                </div>
            `);
		} else {
			var shortDescription = doc.data().description;
			$(getCount().lastRow.parent()).append(`
            <div class="row">
                <div class="col s12 m4">
                    <div class="card hoverable large">
                        <div class="card-image">
                            <img class="materialboxed" src="${doc.data().images[0]}">
                            <span class="card-title">${doc.data().name}</span>
                        </div>
                        <div class="card-content">
                            <p>${shortDescription.substring(0, truncateCount) + "..."}</p>
                        </div>
                        <div class="card-action">
                            <a href="/location/${doc.data().name.replace(/\s/g, "%20")}">See more</a>
                        </div>
                    </div>
                </div>
            </div>
            `);
		}
	});
	var elems = document.querySelectorAll(".materialboxed");
	var instances = M.Materialbox.init(elems, {});
});

function getCount() {
	const mainContainer = document.querySelector(".card-box");
	var totalRows = $(mainContainer).children().length;
	var lastRowCardCount = $(mainContainer).children().last().children().length;
	var lastCardElem = $(mainContainer).children().last();
	var lastRow = $(mainContainer).children().last();
	return { totalRows, lastRowCardCount, lastCardElem, lastRow };
}
