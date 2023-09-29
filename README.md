--SERVER PAKAGEGES--
express
body-parser
bcrypt
cors
dotenv
gridfs-stream
multer
multer-gridfs-storage
helmet
morgan
jsonwebtoken
mongoose

--Configuration files
app.use(express.json());:
This line of code configures the Express application to parse incoming JSON data in the request body. It's a built-in middleware provided by the Express framework. It allows your application to easily handle JSON data sent in requests.

app.use(helmet());
Helmet is a popular middleware for enhancing the security of an Express application. This line adds Helmet middleware to your application, which sets various HTTP headers to help protect against common web vulnerabilities, such as XSS (Cross-Site Scripting) attacks and CSRF (Cross-Site Request Forgery) attacks.

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
This line specifically configures Helmet's Cross-Origin Resource Policy (CORP) middleware. It sets the CORP policy to 'cross-origin', which allows cross-origin requests to access the resources on your server.

app.use(morgan('common'));
Morgan is a logging middleware for Express.js. This line adds Morgan middleware to your application with the 'common' log format. It logs HTTP request details (e.g., request method, status code, URL) to the console. You can change 'common' to other formats based on your logging needs.

app.use(bodyParser.json({ limit: '30mb', extended: true }));
This line sets up the body-parser middleware to handle JSON data in request bodies. It configures a maximum limit of 30 megabytes for incoming JSON data and allows for extended functionality (e.g., handling rich data types).

app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
Similarly, this line configures the body-parser middleware to handle URL-encoded form data in request bodies. It also sets a maximum limit of 30 megabytes and enables extended functionality.

app.use(cors());
This line adds Cross-Origin Resource Sharing (CORS) middleware to your Express application. It enables your server to respond to cross-origin HTTP requests from different domains by including the necessary HTTP headers to allow or restrict access based on your CORS configuration.
