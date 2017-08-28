var http = require( 'http' );

/**
 * Redirect from http port 80 to https
 * Try http://domain.com/README.md
 */

class ShadowServer
{
    constructor( port = 80 )
    {
        super();
        this.$port = port;
        this.$server = http.createServer( this.$onRequest )
                        .listen( port, this.$onLoad );

    }
    $onRequest( request, response )
    {
        console.log( 'Will redirect to:', "https://" + request.headers[ 'host' ] + request.url )

        response.writeHead( 301,
            {
                "Location": "https://" + request.headers[ 'host' ] + request.url
            }
        );
        response.end();
    }

    $onLoad()
    {
	    console.log( 'Shadow server running on port `this.Port`.' );
    }
    get port()
    {
        return this.$port;
    }
    get server()
    {
        return this.$server;
    }
}
module.export = ShadowServer;