# Movie Reservation App

## Overview
A movie reservation app backend project to demonstrate backend skills including RESTful APIs, routing, Knex, databases, and more. 

You can see the deployed project here: https://movie-reservation-app.onrender.com

## API Endpoints

### 1. THEATERS
- GET
- **URL**: `/theaters`
- **Description**: Retrieves a list of theaters and the movies playing at each location.

#### Response
- **Status Code**: 200 (OK)
- **Body**:
```json
{
  "data": [
    {
      "theater_id": 7,
      "name": "Regal City Center",
      "address_line_1": "801 C St.",
      "address_line_2": "",
      "city": "Vancouver",
      "state": "WA",
      "zip": "98660",
      "created_at": "2023-06-29T18:05:08.305Z",
      "updated_at": "2023-06-29T18:05:08.305Z",
      "movies": [
        {
          "movie_id": 97,
          "is_showing": true,
          "title": "Spirited Away",
          "runtime_in_minutes": 125,
          "rating": "PG",
          "description": "Chihiro and her parents are moving to a small Japanese town in the countryside, much to Chihiro's dismay. On the way to their new home, Chihiro's father makes a wrong turn and drives down a lonely one-lane road which dead-ends in front of a tunnel. Her parents decide to stop the car and explore the area. They go through the tunnel and find an abandoned amusement park on the other side, with its own little town...",
          "image_url": "https://imdb-api.com/images/original/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6791_AL_.jpg"
        },
    ...
```

### 2. MOVIES
- GET
- **URL**: `/movies`
- **Description**: Retrieves a list of movies available to be seen, based on whether the movie is currently showing.

#### Request
- **Parameters**:
  - `/movies/:movieId`: Enter the movie's ID to receive information on that movie only.
  - `/movies/:movieId/theaters`: Enter to retrieve a list of theaters where an individual movie is playing.
  - `/movies/:movieId/reviews`: Retrieve all reviews for the designated movie, along with the information of the critic that issued each review.

#### Response
- **Status Code**: 200 (OK)
- **Body**:
```json
/movies or /movies/:movieId

{
    "data": [
        {
            "movie_id": 101,
            "title": "Spider-Man: Into the Spider-Verse",
            "runtime_in_minutes": 117,
            "rating": "PG",
            "description": "Miles Morales is a New York teen struggling with school, friends and, on top of that, being the new Spider-Man. When he comes across Peter Parker, the erstwhile saviour of New York, in the multiverse, Miles must train to become the new protector of his city...",
            "image_url": "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_Ratio0.6716_AL_.jpg",
            "created_at": "2023-06-29T18:05:08.305Z",
            "updated_at": "2023-06-29T18:05:08.305Z"
        },
      ...

/movies/:movieId/theaters
{
    "data": [
        {
            "theater_id": 7,
            "name": "Regal City Center",
            "address_line_1": "801 C St.",
            "address_line_2": "",
            "city": "Vancouver",
            "state": "WA",
            "zip": "98660",
            "created_at": "2023-06-29T18:05:08.735Z",
            "updated_at": "2023-06-29T18:05:08.735Z"
        },
      ...

/movies/:movieId/reviews

{
    "data": [
        {
            "review_id": 4,
            "content": "Lorem markdownum priores iactate receptus margine in motu ferreus pastor. Teneat\ntua opifex regina, adest; similisque nec, me convivia ortus.\n\nEst sontes praemia fatorum diversosque innubere rursus. Tanto inter commenta\ntremulasque tergo donec Apollinei mearum: Hector colorum horruit.\n\n> Cur repulsa matrem frequentes parvum coniuge ad nisi leto, ira. Orbis levatus\n> o coniugis longis confinia *bello* rursus quem Atridae indulgere! Sanguine o\n> operi flammas sorores suffundit et ilia. Nais edentem tamen. Acta munera enixa\n> ad terram!\n\nSint sed per oppugnant Medusae Pagasaeae undique rebus cernit terram delituit\ndilapsa tigres. Ait omne conatur nomen cumque, ad Minoa magna *dolentes*,\nageret. Sum addat, et unum iunge, aberant his indigenae facundia?\n\n> Perdidit astra, si maternis sibi, Phoebi protinus senecta digitos. Atque\n> suique **Lyrnesia**, prosunt suae mihi aqua, te!\n\nSubsedit tantaque vulnera totiens aptos vivit digna pectoraque mutua. Duro ante\ntibi perhorruit praedelassat simulat turis loco hunc dederat viscera scilicet\ntransitus quam longius aenea, concussaque hoc mille.\n\nUt erat. Tibi Themin corpore saepes.",
            "critic_id": 46,
            "movie_id": 97,
            "score": 5,
            "created_at": "2023-06-29T18:05:08.514Z",
            "updated_at": "2023-06-29T18:05:08.514Z",
            "critic": {
                "critic_id": 46,
                "preferred_name": "Alex",
                "surname": "Grimes",
                "organization_name": "AV Club",
                "created_at": "2023-06-29T18:05:08.370Z",
                "updated_at": "2023-06-29T18:05:08.370Z"
            }
        },
      ...

```

### 3. REVIEWS
- UPDATE, DELETE
- **URL**: `/reviews/:reviewId`
- **Description**: Updates or deletes a specific review.

#### Request
- **Body**: Note: no body needed for delete.
```json
 {
   "content": "Lorem markdownum priores iactate ...",
            "critic_id": 46,
            "movie_id": 97,
            "score": 5,
   }
```

- **Headers**:
  - `Content-Type`: `application/json`

#### Response
- **Status Code**: 200 (OK)
- **Body**: Note: If deleted, nothing is returned.
```json

{
    "data": {
        "review_id": 97,
        "content": "Lorem markdownum priores iactate..." ,
        "critic_id": 48,
        "movie_id": 110,
        "score": 1,
        "created_at": "2023-06-29T18:05:08.514Z",
        "updated_at": "2023-06-29T18:05:08.514Z",
        "critic": {
            "critic_id": 48,
            "preferred_name": "Lea",
            "surname": "Vetzer",
            "organization_name": "London Evening Standard",
            "created_at": "2023-06-29T18:05:08.370Z",
            "updated_at": "2023-06-29T18:05:08.370Z"
        }
    }
}
```

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start or start:dev
```