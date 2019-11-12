# simpleurlshortener
A simple url shortener
The web app implement with node js, postgessql and docker.

build step:
1. install docker
  * mac : https://docs.docker.com/docker-for-mac/
  * windows: https://docs.docker.com/docker-for-windows/
  * Linux/ubuntu https://docs.docker.com/install/linux/docker-ce/ubuntu/
  
2. clone repository, and run the `./build.sh` in root folder, it will create an image name server.

  
3. Run the docker compose command in root folder `docker-compose up -d`, it should created two containers in your docker.


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
  This api will redirct encode url to the right url.

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

  
