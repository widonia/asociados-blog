// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;
try {
    var CONF = require((process.env.HOME || process.env.HOMEPATH) + '/.ssh/authorized.json');
    console.log(CONF);
} catch (err){
   console.log("authorized.json not in correct path.", err);
    try {
       var CONF = require('./authorized.json');
   } catch (err2){
        console.log("Not file in path this is production.");
        var CONF = {
            "S3": {
                "key": null,
                "secret": null,
                "bucket": null,
                "region": null
            },
            "POSTGRES_BLOG":{
                "NAME": null,
                "USER": null,
                "PASSWORD": null,
                "HOST": null
            },
            "EMAIL": {
                "USERNAME": null,
                "API_KEY": null,
                "SERVER_EMAIL": null,
                "DEFAULT_FROM": null
            }
        }
    }
}

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: 'http://www.asociados.com.co/blog',
        mail: {
            transport: 'SMTP',
            host: 'smtp.mandrillapp.com',
            options: {
                service: 'Mandrill',
                auth: {
                    user: CONF.EMAIL.USERNAME,
                    pass: CONF.EMAIL.API_KEY,
                }
            }
        },
        database: {
            client: 'pg',
            connection: {
                host     : CONF.POSTGRES_BLOG.HOST,
                user     : CONF.POSTGRES_BLOG.USER,
                password : CONF.POSTGRES_BLOG.PASSWORD,
                database : CONF.POSTGRES_BLOG.NAME,
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '4700'
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:2368/blog',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

module.exports = config;
