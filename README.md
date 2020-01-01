# Welly-Site
A site for finding the most popular places in the city of Wellington, New Zealand.

The current version of the site allows you to:
- Find places in Wellington through search queries, categories (for shopping, restaurants and bars) and filtering.
- View detailed information about a place, such as opening hours, photos, and reviews.
- Allows you to create your own profile to save places to your favourites.
- View weather on the home page.

# Run this app locally
1. Sign up for MongoDB Atlas, create a cluster, obtain the Mongo URI: https://www.youtube.com/watch?v=KKyag6t98g8
2. Sign up for API keys for Yelp Fusion (https://www.yelp.com/fusion) and AirVisual (https://www.airvisual.com/air-pollution-data-api)
3. Clone this repository
4. In root directory, create a .env file, add your Mongo URI, API keys, and a JWT secret (see provided .envexample file)
5. Run npm install
6. Run npm start

# Technologies
Front end: React, Redux, styled with Bootstrap\
Back end: Node.js, Express, Mongoose, MongoDB\
APIs: Yelp Fusion (business information), AirVisual (weather)

# Credits
Icons created by Freepik at www.flaticon.com
