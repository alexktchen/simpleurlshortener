# simpleurlshortener
A simple URL shortener The web app base on node js, PostgreSQL, and docker.
The server will start with port `3000`

**Run on local**
1. Install the project dependencies `$ npm install`
2. Start the project with the command `$ npm start`

**Build docker containers**

1. Install docker
   * mac https://docs.docker.com/docker-for-mac/
   * windows https://docs.docker.com/docker-for-windows/
   * Linux/ubuntu https://docs.docker.com/install/linux/docker-ce/ubuntu/
  
2. Clone repository, and run the `$ ./build.sh` in root folder, it will create an image named `server`.

  
3. Run the docker compose command in root folder `$ docker-compose up -d --force-recreate`, it should created two containers `simpleurlshortener_server_1` `database` in the docker.


API Doc:

**Get short url**
----
  Returns json data about a encode short url.

* **URL**

  /

* **Method:**

  `POST`
  
* **Data Params**

  {'url': 'www.sample.com'}

* **Success Response:**

  * **Code:** 200 <br />
    **body:** `{ "url" : "localhost:3000:/gRfJp6" }`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{
    "success": false,
    "msg": "Data missing!",
    "data": {}
}`

* **Sample Call:**

  ```javascript
    curl -X POST \
  http://localhost:3000 \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -d '{"url": "www.mobile01.com"}'
  ```


**Use Short Url**
----
  This API will redirect the encode URL to the right URL.

* **URL**

  /:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{"success":false,"msg":"missing data"}`
    
  * **Code:** 400 Bad Request <br />
    **Content:** `{"success":false,"msg":"url expired"}`
    
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"success":false,"msg":"can't found the url"}`

  
