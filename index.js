var fs = require( 'fs' );
var ShadowServer = require( './ShadowServer.js' );
var restify = require( 'restify' );

// check arguments exist
if( process.env.SSL_CERT == null || process.env.SSL_KEY == null )
{
	throw new Error(
		"SSL certificate and key required! No env variables set. Abort."
	);
}
// check files exist
if( !fs.existsSync( process.env.SSL_CERT ) || !fs.existsSync( process.env.SSL_KEY ) )
{
	throw new Error(
		"SSL certificate and key required! Could not find files. Abort."
	);
}

//
// Setup Restify Server (HTTPS)
//
var server = restify.createServer({
	name: 'node-ssl-test',
	version: '1.0.0',
	certificate: fs.readFileSync( process.env.SSL_CERT ),
	key: fs.readFileSync( process.env.SSL_KEY )
});

/**
 * Test server by serving local files
 * Try https://domain.com/README.md
 */
server.get( /.*/, restify.plugins.serveStatic(
{
	'directory': __dirname,
	'default': 'index.html'
}));

server.listen( 443, function()
{
	console.log( '%s listening to %s', server.name, server.url );
});


/**
 * Redirect from http port 80 to https
 * Try http://domain.com/README.md
 */
var shadowServer = new ShadowServer( 80 );
