var header, height, urlMem;
window.onload = function(){

	// Call allow to have the transition for
	// the first consult

	callback();

	var targetNode = document.body;

	// Options of the observer
	var config = { characterData: true , childList: true };

	var observer = new MutationObserver(checkUrl);

	observer.observe(targetNode, config);
};

function checkUrl(){
	var url = window.location.href;
	if (url != urlMem){
		console.log(url, urlMem);
		document.body.removeChild(document.getElementById('istex_web_header'));
		document.body.removeChild(document.getElementById('iwh_script'));
		callback();
	}
}

function callback(e){
	urlMem = window.location.href;
	
	// set the twitter url
	document.getElementsByClassName('btn pull-right js-toolbar-action').href="https://twitter.com/istex_platform";
	
	// Change the position of the navigator when the share menu is open
	var share = document.getElementsByClassName("btn toggle-dropdown")[0];
	var nbClick = 0;
	share.onclick = function(){
		nbClick++;
		if (nbClick % 2){
			document.getElementById("anchor-navigation-ex-navbar").style.right = "200px";
		} else {
			document.getElementById("anchor-navigation-ex-navbar").style.right = "50px";
		}
	}

	// change href of published with GitBook
	document.getElementsByClassName('gitbook-link')[0].href = "https://doc.istex.fr/build.html";
	
	header = document.createElement('script');
	header.setAttribute('id', 'iwh_script');
	header.setAttribute('data-menu', 'hide');
	header.setAttribute('src', '//web-header.delivery.istex.fr/bundle.js');
	// header = document.createElement('<script id="iwh_script" data-menu="hide" src="//web-header.delivery.istex.fr/bundle.js"></script>"');
	document.body.appendChild(header);

	try {
		height = document.getElementById('istex_web_header').style.offsetHieght;
	} catch(e){
		height = "50px";
		console.log(e);
	}

	// change the search placeholder
	document.getElementById('book-search-input').children[0].placeholder = "Taper pour rechercher";

	// Change url
	var regex = new RegExp('^([^?#]*\/)([^?#.\/]+)$');
	var regexDoc = new RegExp('(doc\.istex\.fr)');

	var ArrayOfLinks = document.getElementsByClassName('page-wrapper')[0].getElementsByTagName('a');

	for(var i=0; i<ArrayOfLinks.length; i++){
	    if (ArrayOfLinks[i].href.match(regex) && ArrayOfLinks[i].href.match(regexDoc)){
		    ArrayOfLinks[i].href += '/';
	    }
	}

	try {
		document.getElementsByClassName("book without-animation with-summary font-size-2 font-family-1")[0].style.height = "calc(100% - " + height +"px)";
	} catch(e){
		console.log(e);
	}

	//document.getElementById("istex_web_header")[0].style.height = height +"px";
	//var book = document.getElementsByClassName('book-summary');
	//book[0].parentNode.style.height = 'calc(100% - ' + hauteur + 'px)';
	try {
		document.getElementsByClassName('body-inner')[0].onscroll = headerTransform;
	} catch (e) {
		console.log(e);
	}


	function headerTransform() {
	    if (document.getElementsByClassName('body-inner')[0].scrollTop > 0) {
			try {
				document.getElementById("istex_web_header").style.height = 0 + "px";
			} catch (e) {
				console.log(e);
			}
			try {
				document.getElementsByClassName("book without-animation with-summary font-size-2 font-family-1")[0].style.height = '100%';
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				document.getElementsByClassName("book without-animation with-summary font-size-2 font-family-1")[0].style.height = 'calc(100% - ' + height + ')';
			} catch(e) {
				console.log(e);
			}
			try {
				document.getElementById("istex_web_header").style.height = height;
			} catch (e) {
				console.log(e);
			}
		}
	}
}
