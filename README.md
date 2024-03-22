# url-shortener-node

## Getting started

1. Clone the repository
   
   ```bash
    git clone https://github.com/Smintfy/link-shortener-node.git
   ```
3. Install the depenencies
   
   ```bash
    cd link-shortener-node
    npm install
   ```
4. Run the development server
   
    ```bash
    npm start
   ```
5. Currently we are just working with a mock database with JSON so we can play around and explore freely. **To configure the JSON database** all you need to do is **rename** `db.example.json` in `src/core/` to `db.json`

6. Configure environment `.env`
   
   ```bash
    PORT=YOUR_PORT
    JSON_PATH='src/core/'
   ```

## To-do
- **Core**
  - [ ] Database (MongoDB or Supabase).

- **API Endpoints**
  - [ ] `POST` Create a new short URL.
  - [ ] `GET` Redirect short URL to original URL.
  - [ ] `PUT` Update an existing URL.
  - [ ] `DELETE` Delete an URL.

- **Features**
  - [ ] Customization and URL preview.
  - [ ] Analytics.

## API examples
1. `POST`
   
   ```json
   {
     "link": "https://github.com/aclyvoir"
   }
   ```
   returns

   ```json
   {
     "id": "HzpKFuT6",
     "link": "http://localhost:3000/HzpKFuT6",
     "url": "https://github.com/aclyvoir"
   }
   ```

   With CURL
   
   ```bash
   curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{"link": "https://github.com/aclyvoir"}'
   ```

2. `GET`
   `/:id`

   returns

   ```json
   {
     "id": "rew9TVov",
     "link": "http://localhost:3000/rew9TVov",
     "url": "https://github.com/Smintfy"
   }
   ```

   With CURL (change `:id` to the link id)
   
   ```bash
   curl http://localhost:3000/:id
   ```

3. `DELETE`
   `/:id`

   returns

   ```json
   {
     "message":"Link deleted successfully"
   }
   ```

   With CURL (change `:id` to the link id)
   
   ```bash
   curl -X DELETE http://localhost:3000/:id
   ```
