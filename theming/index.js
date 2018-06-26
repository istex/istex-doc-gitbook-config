var header, hauteur;
window.onload = function(){
	
	// Call allow to have the transition for
	// the first consult

	header = document.getElementById("istex_web_header");
	hauteur = header.offsetHeight;

	callback();

	var targetNode = document.body;

	// Options of the observer
	var config = { attributes: true, childList: true };

	var observer = new MutationObserver(callback);

	observer.observe(targetNode, config);

};

function callback(){
	
	// change the search placeholder
	
	document.getElementById('book-search-input').children[0].placeholder = "Taper pour rechercher";
	
	// Change url
	var regex = new RegExp('^([^?#]*\/)([^?#.\/]+)$');

	var tableauA = document.getElementsByClassName('page-wrapper')[0].getElementsByTagName('a');

	for(var i=0; i<tableauA.length; i++){
	    if (tableauA[i].href.match(regex)){
		    tableauA[i].href += '/';
	    }
	}

	var book = document.getElementsByClassName('book-summary');
	book[0].parentNode.style.height = 'calc(100% - ' + hauteur + 'px)';

	document.getElementById("istex_web_header").style.height = hauteur + "px";
	document.getElementsByClassName('body-inner')[0].onscroll = headerTransform;

	function headerTransform() {
	    if (document.getElementsByClassName('body-inner')[0].scrollTop > 100) {

			document.getElementById("istex_web_header").style.height = 0 + "px";
			book[0].parentNode.style.height = '100%';

		} else {

			book[0].parentNode.style.height = 'calc(100% - ' + hauteur + 'px)';
			document.getElementById("istex_web_header").style.height = hauteur + "px";

		}
	}
}
