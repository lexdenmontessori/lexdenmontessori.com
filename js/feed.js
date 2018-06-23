new TWTR.Widget({
    version: 2,
    type: 'profile',
    width: "auto",
    rpp: 4,
    interval: 30000,
    height: 300, 
    theme: {
	shell: {
	    background: '#fff',
	    color: '#000'
	},
	tweets: {
	    background: '#fff',
	    color: '#000',
	    links: '#300'
	}
    },
    features: {
	scrollbar: false,
	loop: false,
	live: false,
	behavior: 'all'
    }
}).render().setUser('lex_mon').start();