## An example cache-api with mongo Db
A simple cache API that uses mongo DB as the backend

#Instructions

Run `git clone https://github.com/s-chand/cache-api.git`
This should get you the codebase locally to work/test with.

Next, run `cd cache-api && yarn install` or `cd cache-api && yarn install`

Update the .env_sample file to include your mongodb credentials or atleast have mongodb running locally at port 27017.
Rename the .env_sample file to .env

Then run `npm start` or `yarn start`

#Develop

To run in development mode, the code base uses nodemon for auto-restarts.
So you could just run `yarn dev` or `npm run dev`

#PS: There's a branch called cache-api which has updated code. I should keep refining this to perfection over the next couple of days.
