window.onload = function() {
   to_top(); 

   const title = document.head.getElementsByTagName('TITLE')[0].textContent;

   if(title === "Menu") {
      icon_bar(); menu_icon(); tabs(); vertical_tabs(); hover_tabs(); top_navigation(); responsive_navigation(); navbar_with_icons(); search_bar(); vertical_menu(); bottom_border_nav_links(); right_aligned_menu_links(); centered_menu_link(); equal_width_menu_links();
   }
	if(title === "Filters") {
		
	}
};
// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
// use if you make DOM/style changes on load
document.addEventListener('DOMContentLoaded', function() {
   const title = document.head.getElementsByTagName('TITLE')[0].textContent;
   current_page(title); mobile_menu();

   if(title === "Menu") {
      accordion(); tab_headers(); full_tage_tabs(); search_menu();
   }
	if(title === "Filters") {
		filter_list();
	}
});

//#region layout >
function to_top() {
   const button = document.querySelector('.to_top_button');

   if(window.scrollY > 150) button.style.right = '2rem';
   else button.style.right = '-3rem';

   window.addEventListener('scroll', function() {
      if(this.scrollY > 150) {
         button.animate([{
            right: '2rem'
         }], {duration: 1000, fill: 'forwards'});
      } else {
         button.animate([{
                right: '-3rem'
      	}], {duration: 1000, fill: 'forwards'});
      }
   });

   button.addEventListener('click', function() {
      window.scroll(0, 0);
   });
};

// highlight the header and footer button according to the curent page
function current_page(title) {
	const header_button = document.querySelectorAll('.header_menu a');
	const footer_button = document.querySelectorAll('.footer_menu a');

	if (window.innerWidth > 750) {
		for (let e = 0; e < header_button.length; e++) {
			if (header_button[e].textContent == title) {
				header_button[e].classList.add('header_menu_active');
				footer_button[e].classList.add('footer_menu_active');
			}
		}
	} else {
		for (let e = 0; e < header_button.length; e++) {
			if (header_button[e].textContent == title) {
				header_button[e].classList.add('header_menu_active_mob');
			}
		}
	}
};

function mobile_menu() {
	const menu = document.getElementsByClassName('header_menu')[0];
	let height = parseInt(window.getComputedStyle(menu).height) - 8;

	if (window.innerWidth < 750) menu.style.top = `-${height-70}px`;

	let touch_pos;
	menu.addEventListener('touchmove', function (event) {
		event.preventDefault();
		touch_pos = event.touches[0].clientY;

		if (touch_pos < height && touch_pos > 70) menu.style.top = `-${height - touch_pos}px`;
	});

	let start_pos;
	menu.addEventListener('touchstart', function (event) {
		start_pos = event.touches[0].clientY;
	});

	menu.addEventListener('touchend', function () {
		touch_pos = 80;
		if (touch_pos > 400) menu.style.top = '70px';
		else if (touch_pos < 5) menu.style.top = `-${height-70}px`;
		else {
			if (start_pos < touch_pos) {
				menu.animate([{
					top: '70px'
				}], {
					duration: 700 - touch_pos
				});
				setTimeout(() => {
					menu.style.top = '70px'
				}, 650 - touch_pos);
			} else {
				menu.animate([{
					top: `-${height-70}px`
				}], {
					duration: 700 - touch_pos
				});
				setTimeout(() => {
					menu.style.top = `-${height-70}px`
				}, 650 - touch_pos);
			}
		}
	});
};
//#endregion layout


//#region menu
function icon_bar() {
	// // using 2 loops 
	// const vertical = document.querySelectorAll('.icon_bar > div > div:first-child i');
	// const horizontal = document.querySelectorAll('.icon_bar > div > div:last-child i');

	// function clicked(elem, num) {

	//     elem[num].addEventListener('click', function() {
	//         elem.forEach(el => el.classList.remove('icon_bar_active'));
	//         this.classList.add('icon_bar_active');
	//     }); 
	// }
	// for(let e = 0; e < vertical.length; e++) {
	//     clicked(vertical, e); clicked(horizontal, e);
	// }

	// without loops
	let vertical = document.querySelector('.icon_bar > div > div:first-child');
	let horizontal = document.querySelector('.icon_bar > div > div:last-child');

	function clicked(ver_hor) {
		ver_hor.addEventListener('click', function (ez) {
			let active = this.getElementsByClassName('icon_bar_active')[0];

			if (ez.target.tagName === 'I') {
				if (active.classList.contains('icon_bar_active')) {
					active.classList.remove('icon_bar_active');
				};
				ez.target.classList.add('icon_bar_active');
			};
		});
	};
	clicked(vertical);
	clicked(horizontal);
};

function menu_icon() {
	const ico_btn = document.querySelector('.menu_icon_2');

	ico_btn.addEventListener('click', function () {
		ico_btn.classList.toggle('menu_icon_2_anim');
	});
};

function accordion() {
	const section = document.querySelectorAll('.accordion > div > div > span');
	const text = document.querySelectorAll('.accordion > div > div p');

	for (let e = 0; e < section.length; e++) {
		text[e].style.marginTop = -text[e].clientHeight + 'px';

		section[e].addEventListener('click', function () {
			text[e].style.transition = '.5s';
			text[e].classList.toggle('accordion_toggle');

			if (text[e].classList.contains('accordion_toggle')) {
				this.children[0].textContent = '\u2212';
				this.style.backgroundColor = '#cccccc';
			} else {
				this.children[0].textContent = '\u002B';
				this.style.backgroundColor = '';
			}
		});
	};
};

function tabs() {
	const buttons = document.querySelectorAll('.tabs > div > nav button');
	const city = document.querySelector('.tabs > div > div p:nth-child(1)');
	const city_info = document.querySelector('.tabs > div > div p:nth-child(2)');

	const obj = {
		0: ['London', 'London is the capital city of England'],
		1: ['Paris', 'Paris is the capital of France'],
		2: ['Tokyo', 'Tokyo is the capital of Japan']
	};

	for (let e = 0; e < buttons.length; e++) {
		buttons[e].addEventListener('click', function () {
			const active_btn = document.getElementsByClassName('tabs_active')[0];
			if (active_btn.classList.length > 0) active_btn.classList.remove('tabs_active');

			this.classList.add('tabs_active')
			city.textContent = obj[e][0];
			city_info.textContent = obj[e][1];

			city.parentNode.animate([{
					opacity: 0
				},
				{
					opacity: 1
				}
			], {
				duration: 500,
				fill: 'forwards'
			});
		});
	};
};

function vertical_tabs() {
	const buttons = document.querySelectorAll('.vertical_tabs > div > div button');
	const txt = document.querySelector('.vertical_tabs > div > div:nth-child(2)');

	const obj = {
		0: ['London', 'London is the capital city of England'],
		1: ['Paris', 'Paris is the capital of France'],
		2: ['Tokyo', 'Tokyo is the capital of Japan']
	};

	for (let e = 0; e < buttons.length; e++) {
		buttons[e].addEventListener('click', function () {
			const el_class = document.getElementsByClassName('vertical_tabs_active')[0];
			if (el_class) el_class.classList.remove('vertical_tabs_active');

			txt.children[0].textContent = obj[e][0];
			txt.children[1].textContent = obj[e][1];
			this.classList.add('vertical_tabs_active');

			txt.animate([{
					opacity: 0
				},
				{
					opacity: 1
				}
			], {
				duration: 300
			});
		});
	};
};

function tab_headers() {
	const buttons = document.querySelectorAll('.tab_headers > div > div:nth-child(2) button');
	const txt = document.querySelector('.tab_headers > div > div:nth-child(1)');

	const obj = {
		0: ['#f44336', 'London', 'London is the capital city of England'],
		1: ['#04aa6d', 'Paris', 'Paris is the capital of France'],
		2: ['#2196f3', 'Tokyo', 'Tokyo is the capital of Japan'],
		3: ['#ff5722', 'Oslo', 'Oslo is the capital of Norway']
	};

	txt.style.backgroundColor = obj[0][0];

	for (let e = 0; e < buttons.length; e++) {

		buttons[e].addEventListener('click', function () {
			const active = document.getElementsByClassName('tab_headers_active')[0];
			if (active) active.className = '';

			txt.children[0].textContent = obj[e][1];
			txt.children[1].textContent = obj[e][2];

			txt.style.backgroundColor = obj[e][0];

			active.style.backgroundColor = '';
			this.style.backgroundColor = obj[e][0];

			this.classList.add('tab_headers_active');
		});
	};
};

function full_tage_tabs() {
	const cont = document.querySelector('.full_page_tabs > div');
	const txt = document.querySelector('.full_page_tabs > div > div');
	const buttons = document.querySelectorAll('.full_page_tabs > div > nav button');

	const obj = {
		0: ['#f44336', 'Home', 'Home is where the heart is..'],
		1: ['#04aa6d', 'News', 'Some news this fine day!'],
		2: ['#2196f3', 'Contact', 'Get in touch, or swing by for a cup of coffee.'],
		3: ['#ff5722', 'About', 'Who we are and what we do.']
	};

	cont.style.backgroundColor = obj[0][0];

	for (let e = 0; e < buttons.length; e++) {
		buttons[e].addEventListener('click', function () {
			const active = document.getElementsByClassName('full_page_tabs_active')[0];
			if (active) active.classList.remove('full_page_tabs_active');

			txt.children[0].textContent = obj[e][1];
			txt.children[1].textContent = obj[e][2];

			cont.style.backgroundColor = obj[e][0];
			this.classList.add('full_page_tabs_active');
		});
	};
};

function hover_tabs() {
	const buttons = document.querySelectorAll('.hover_tabs > div > div:nth-child(1) button');
	const txt = document.querySelector('.hover_tabs > div > div:nth-child(2)');

	const obj = {
		0: ['London', 'London is the capital city of England'],
		1: ['Paris', 'Paris is the capital of France'],
		2: ['Tokyo', 'Tokyo is the capital of Japan']
	};

	for (let e = 0; e < buttons.length; e++) {
		buttons[e].addEventListener('mouseenter', function () {
			const active = document.getElementsByClassName('hover_tabs_active')[0];
			if (active) active.classList.remove('hover_tabs_active');

			txt.children[0].textContent = obj[e][0];
			txt.children[1].textContent = obj[e][1];

			this.classList.add('hover_tabs_active');
		});
	};
};

function top_navigation() {
	const buttons = document.querySelectorAll('.top_navigation > nav a');
	
	for(let elem of buttons) {
		elem.addEventListener('click', function(e) {
			e.preventDefault();
			const active = document.getElementsByClassName('top_navigation_active')[0];
			if(active) active.classList.remove('top_navigation_active');

			elem.classList.add('top_navigation_active');			
		});
	};
};

function responsive_navigation() {
	const button = document.querySelector('.reponsive_navigation > nav button');
	const links = document.querySelectorAll('.reponsive_navigation > nav a');


	let open = false;
	let open_function = (disp_first, disp_other) => {
		links[0].style.display = disp_first;
		for(let e = 1; e < links.length; e++) links[e].style.display = disp_other;
	};
	button.addEventListener('click', function() {
		if(open) {
			open_function('inline-block', 'none');
			open = false;
		} else {
			open_function('block', 'block');
			open = true;
		}
	});

	for(let elem of links) {
		elem.addEventListener('click', function(e) {
			e.preventDefault();
			const active = document.getElementsByClassName('reponsive_navigation_active')[0];
			if(active) active.classList.remove('reponsive_navigation_active');

			elem.classList.add('reponsive_navigation_active');
		});
	};
};

function navbar_with_icons() {
	const icons = document.querySelectorAll('.navbar_with_icons > nav a');

	// for(let e = 0; e < icons.length; e++) {
	// 	icons[e].addEventListener('click', function(ez) {
	// 		ez.preventDefault();		

	// 		const active = document.getElementsByClassName('navbar_with_icons_active')[0];
	// 		if(active) active.classList.remove('navbar_with_icons_active');
	// 		this.classList.add('navbar_with_icons_active');
	// 	});
	// };

	for(let icon of icons) {
		icon.addEventListener('click', function(ez) {
			ez.preventDefault();

			const active = document.getElementsByClassName('navbar_with_icons_active')[0];
			if(active) active.classList.remove('navbar_with_icons_active');
			icon.classList.add('navbar_with_icons_active');
		});
	};
};

function search_menu() {
	const list = document.querySelectorAll('.search_menu_menu > ul > li');
	const cont_title = document.querySelector('.search_menu_cont > p:nth-child(1)');	
	const cont = document.querySelector('.search_menu_cont > p:nth-child(2)');
	const search = document.querySelector('.search_menu_menu input');

	const object = {
		"HTML": `The HyperText Markup Language, or HTML is the standard markup language for documents  designed to be displayed in a web browser. It can be assisted by technologies such as  Cascading Style Sheets (CSS) and scripting languages such as JavaScript.
		Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
		<br><br>
		HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page. HTML provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets. Tags such as &lt;img /&gt; and &lt;input /&gt; directly introduce content into the page. Other tags such as &lt;p&gt; surround and provide information about document text and may include other tags as sub-elements. Browsers do not display the HTML tags, but use them to interpret the content of the page.
		<br><br>
		HTML can embed programs written in a scripting language such as JavaScript, which affects the behavior and content of web pages. Inclusion of CSS defines the look and layout of content. The World Wide Web Consortium (W3C), former maintainer of the HTML and current maintainer of the CSS standards, has encouraged the use of CSS over explicit presentational HTML since 1997.[2] A form of HTML, known as HTML5, is used to display video and audio, primarily using the &lt;canvas&gt; element, in collaboration with javascript.`,

		"CSS": `Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML.[1] CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.[2]
		<br><br>
		CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts.[3] This separation can improve content accessibility; provide more flexibility and control in the specification of presentation characteristics; enable multiple web pages to share formatting by specifying the relevant CSS in a separate .css file, which reduces complexity and repetition in the structural content; and enable the .css file to be cached to improve the page load speed between the pages that share the file and its formatting.
		<br><br>
		Separation of formatting and content also makes it feasible to present the same markup page in different styles for different rendering methods, such as on-screen, in print, by voice (via speech-based browser or screen reader), and on Braille-based tactile devices. CSS also has rules for alternate formatting if the content is accessed on a mobile device.[4]
		<br><br>
		The name cascading comes from the specified priority scheme to determine which style rule applies if more than one rule matches a particular element. This cascading priority scheme is predictable.
		<br><br>
		The CSS specifications are maintained by the World Wide Web Consortium (W3C). Internet media type (MIME type) text/css is registered for use with CSS by RFC 2318 (March 1998). The W3C operates a free CSS validation service for CSS documents.[5]
		<br><br>
		In addition to HTML, other markup languages support the use of CSS including XHTML, plain XML, SVG, and XUL.`,

		"JavaScript": `JavaScript (/ˈdʒɑːvəskrɪpt/),[10] often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.[11] Over 97% of websites use JavaScript on the client side for web page behavior,[12] often incorporating third-party libraries.[13] All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.
		<br><br>
		JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.[14] It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).
		<br><br>
		The ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.
		<br><br>
		JavaScript engines were originally used only in web browsers, but are now core components of some servers and a variety of applications. The most popular runtime system for this usage is Node.js.
		<br><br>
		Although Java and JavaScript are similar in name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.`,

		"PHP": `PHP is a general-purpose scripting language geared towards web development.[7] It was originally created by Danish-Canadian programmer Rasmus Lerdorf in 1994.[8] The PHP reference implementation is now produced by The PHP Group.[9] PHP originally stood for Personal Home Page,[8] but it now stands for the recursive initialism PHP: Hypertext Preprocessor.[10]
		<br><br>
		PHP code is usually processed on a web server by a PHP interpreter implemented as a module, a daemon or as a Common Gateway Interface (CGI) executable. On a web server, the result of the interpreted and executed PHP code – which may be any type of data, such as generated HTML or binary image data – would form the whole or part of an HTTP response. Various web template systems, web content management systems, and web frameworks exist which can be employed to orchestrate or facilitate the generation of that response. Additionally, PHP can be used for many programming tasks outside the web context, such as standalone graphical applications[11] and robotic drone control.[12] PHP code can also be directly executed from the command line.
		<br><br>
		The standard PHP interpreter, powered by the Zend Engine, is free software released under the PHP License. PHP has been widely ported and can be deployed on most web servers on a variety of operating systems and platforms.[13]
		<br><br>
		The PHP language evolved without a written formal specification or standard until 2014, with the original implementation acting as the de facto standard which other implementations aimed to follow. Since 2014, work has gone on to create a formal PHP specification.[14]
		<br><br>
		W3Techs reports that, as of January 2022, "PHP is used by 78.1% of all the websites whose server-side programming language we know."[15] PHP version 7.4 is the most used version. Support for version 7.3 was dropped on 6 December 2021.`,

		"Python": `Python is an interpreted high-level general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant indentation. Its language constructs as well as its object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.[30]
		<br><br>
		Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured (particularly, procedural), object-oriented and functional programming. It is often described as a "batteries included" language due to its comprehensive standard library.[31][32]
		<br><br>
		Guido van Rossum began working on Python in the late 1980s, as a successor to the ABC programming language, and first released it in 1991 as Python 0.9.0.[33] Python 2.0 was released in 2000 and introduced new features, such as list comprehensions and a cycle-detecting garbage collection system (in addition to reference counting). Python 3.0 was released in 2008 and was a major revision of the language that is not completely backward-compatible. Python 2 was discontinued with version 2.7.18 in 2020.[34]
		<br><br>
		Python consistently ranks as one of the most popular programming languages.[35][36][37][38]`,

		"jQuery": `jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax.[3] It is free, open-source software using the permissive MIT License.[4] As of May 2019, jQuery is used by 73% of the 10 million most popular websites.[5] Web analysis indicates that it is the most widely deployed JavaScript library by a large margin, having at least 3 to 4 times more usage than any other JavaScript library.[5][6]
		<br><br>
		jQuery's syntax is designed to make it easier to navigate a document, select DOM elements, create animations, handle events, and develop Ajax applications. jQuery also provides capabilities for developers to create plug-ins on top of the JavaScript library. This enables developers to create abstractions for low-level interaction and animation, advanced effects and high-level, themeable widgets. The modular approach to the jQuery library allows the creation of powerful dynamic web pages and Web applications.
		<br><br>
		The set of jQuery core features—DOM element selections, traversal, and manipulation—enabled by its selector engine (named "Sizzle" from v1.3), created a new "programming style", fusing algorithms and DOM data structures. This style influenced the architecture of other JavaScript frameworks like YUI v3 and Dojo, later stimulating the creation of the standard Selectors API.[7] Later, this style has been enhanced with a deeper algorithm-data fusion in an heir of jQuery, the D3.js framework.
		<br><br>
		Microsoft and Nokia bundle jQuery on their platforms.[8] Microsoft includes it with Visual Studio[9] for use within Microsoft's ASP.NET AJAX and ASP.NET MVC frameworks while Nokia has integrated it into the Web Run-Time widget development platform.[10]`,

		"SQL": `
		SQL (/ˌɛsˌkjuːˈɛl/ (audio speaker iconlisten) S-Q-L,[4] /ˈsiːkwəl/ "sequel"; Structured Query Language)[5] is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS), or for stream processing in a relational data stream management system (RDSMS). It is particularly useful in handling structured data, i.e. data incorporating relations among entities and variables. SQL offers two main advantages over older read–write APIs such as ISAM or VSAM. Firstly, it introduced the concept of accessing many records with one single command. Secondly, it eliminates the need to specify how to reach a record, e.g. with or without an index.
		<br><br>
		Originally based upon relational algebra and tuple relational calculus, SQL consists of many types of statements,[6] which may be informally classed as sublanguages, commonly: a data query language (DQL),[a] a data definition language (DDL),[b] a data control language (DCL), and a data manipulation language (DML).[c][7] The scope of SQL includes data query, data manipulation (insert, update and delete), data definition (schema creation and modification), and data access control. Although SQL is essentially a declarative language (4GL), it also includes procedural elements.
		<br><br>
		SQL was one of the first commercial languages to use Edgar F. Codd’s relational model. The model was described in his influential 1970 paper, "A Relational Model of Data for Large Shared Data Banks".[8] Despite not entirely adhering to the relational model as described by Codd, it became the most widely used database language.[9][10]
		<br><br>
		SQL became a standard of the American National Standards Institute (ANSI) in 1986, and of the International Organization for Standardization (ISO) in 1987.[11] Since then, the standard has been revised to include a larger set of features. Despite the existence of standards, most SQL code requires at least some changes before being ported to different database systems.`,

		"Bootstrap": `Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.
		<br><br>
		As of August 2021, Bootstrap is the tenth most starred project on GitHub, with over 152,000 stars, behind freeCodeCamp (over 328,000 stars), Vue.js framework, React library, TensorFlow and others.[2]`,

		"Node.js": `Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm,[6] unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.
		<br><br>
		Though .js is the standard filename extension for JavaScript code, the name "Node.js" does not refer to a particular file in this context and is merely the name of the product. Node.js has an event-driven architecture capable of asynchronous I/O. These design choices aim to optimize throughput and scalability in web applications with many input/output operations, as well as for real-time Web applications (e.g., real-time communication programs and browser games).[7]
		<br><br>
		The Node.js distributed development project was previously governed by the Node.js Foundation,[8] and has now merged with the JS Foundation to form the OpenJS Foundation, which is facilitated by the Linux Foundation's Collaborative Projects program.[9]
		<br><br>
		Corporate users of Node.js software include GoDaddy,[10] Groupon,[11] IBM,[12] LinkedIn,[13][14] Microsoft,[15][16] Netflix,[17] PayPal,[18][19] Rakuten, SAP,[20] Walmart,[21] Yahoo!,[22] and Amazon Web Services.[23]`
	};

	cont.innerHTML = object['Node.js'];

	for(let list_el of list) {
		list_el.addEventListener('click', function() {
			cont.innerHTML = object[list_el.textContent];
			cont_title.textContent = list_el.textContent;

			const active = document.getElementsByClassName('search_menu_menu_active')[0];

			if(active) active.classList.remove('search_menu_menu_active');
			list_el.classList.add('search_menu_menu_active');
		});

		search.addEventListener('input', function() {
			let type_leng = search.value.length;
			list_el.style.display = 'none';

			if(list_el.textContent.substring(0, type_leng).toLowerCase() == search.value.substring(0, type_leng).toLowerCase()) {
				list_el.style.display = 'list-item';
			};
		});
	};
};

function search_bar() {
	const links = document.querySelectorAll('.search_bar > nav a');

	for(let link of links) {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const active = document.getElementsByClassName('search_bar_active')[0];

			if(active) active.classList.remove('search_bar_active');
			this.classList.add('search_bar_active');
		});
	};
};

function vertical_menu() {
	const links = document.querySelectorAll('.vertical_menu > nav a');

	for(let link of links) {
		link.addEventListener('click', function() {
			const active = document.getElementsByClassName('vertical_menu_active')[0];

			if(active) active.classList.remove('vertical_menu_active');
			link.classList.add('vertical_menu_active');
		});
	};
};

function bottom_border_nav_links() {
	const links = document.querySelectorAll('.bottom_border_nav_links > nav a');

	for(let link of links) {
		link.addEventListener('click', function() {
			const active = document.getElementsByClassName('bottom_border_nav_links_active')[0];

			if(active) active.classList.remove('bottom_border_nav_links_active');
			link.classList.add('bottom_border_nav_links_active');
		});
	};
};

function right_aligned_menu_links() {
	const links = document.querySelectorAll('.right_aligned_menu_links > nav a');

	for(let link of links) {
		link.addEventListener('click', function() {
			const active = document.getElementsByClassName('right_aligned_menu_links_active')[0];

			if(active) active.classList.remove('right_aligned_menu_links_active');
			link.classList.add('right_aligned_menu_links_active');
		});
	};
};

function centered_menu_link() {
	const links = document.querySelectorAll('.centered_menu_link > nav a');

	for(let link of links) {
		link.addEventListener('click', function() {
			const active = document.getElementsByClassName('centered_menu_link_active')[0];

			if(active) active.classList.remove('centered_menu_link_active');
			link.classList.add('centered_menu_link_active');
		});
	};
};

function equal_width_menu_links() {
	const links = document.querySelectorAll('.equal_width_menu_links > nav a');

	for(let link of links) {
		link.addEventListener('click', function() {
			const active = document.getElementsByClassName('equal_width_menu_links_active')[0];

			if(active) active.classList.remove('equal_width_menu_links_active');
			link.classList.add('equal_width_menu_links_active');
		});
	};
};
//#endregion menu


//#region filters
function filter_list() {
	const button = document.querySelector('.sort_list > button')
	const status = document.querySelector('.sort_list > span')
	const countries = document.querySelector('.sort_list > ul').getElementsByTagName('LI');

	(function int_order() {
		for(let e = 0; e < countries.length; e++) countries[e].dataset.int = e;
	})();

	function random() {
		for(let country of countries) {
			let rand = Math.round( Math.random() * countries.length );
			country.dataset.ran = rand;
		}
	}

	function sort(direction) {
		let x, y, shouldSwitch;
		let switching = true;

		while(switching) {
			switching = false;
			for(let e = 0; e < countries.length - 1; e++) {
				shouldSwitch = false;
				let sort_direction;
				x = countries[e];
				y = countries[e + 1];

				if(direction === "Initial") {
					sort_direction = Number(x.dataset.int) > Number(y.dataset.int);
				} 
				if(direction === "Ascending") sort_direction = x.textContent > y.textContent;
				if(direction === "Descending") sort_direction = x.textContent < y.textContent;
				if(direction === "Random") {
					sort_direction = Number(x.dataset.ran) > Number(y.dataset.ran);
				} 

				if(sort_direction) {
					shouldSwitch = true; break;
				}
			}

			if(shouldSwitch) {
				x.parentNode.insertBefore(y, x);
				switching = true;
			}
		}
	}

	const status_arr = ["Initial", "Ascending", "Descending", "Random"]
	let st_num = 0; // status number used for status_arr
	button.addEventListener('click', function() {
		if(st_num < 3) st_num++;
		else st_num = 0;
		status.textContent = status_arr[st_num];

		if(st_num === 3) random();
		sort(status_arr[st_num]);
	});
}
//#endregion filters