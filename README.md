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
