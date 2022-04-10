
<h1 align="center">  
    Admin Panel iFrame  
</h1>  

<p align="center">  
   An Admin Panel to see all the users table and their respective profile and posts.  
</p>

# About App
This is a simple Next.js App for Admin Panel to view all the available users and their profile and posts.
> Check the deployed app here 🚀 [https://admin-panel-iframe.vercel.app/](https://admin-panel-iframe.vercel.app/)

# Features
> 1. List all available users in a Table
> 2. Sorting feature in the Table
> 3. Seach feature in the Table
> 4. Used React Bootstrap for all the JSX elements
> 5. iFrame Communication Channel to trigger actions using CTAs
> 6. Added Side Drawer to show Selected User / Profile
> 7. Next.js Routing with ISR (Increamental Static Re-Generation)
> 8. Containerized the App using Docker & published to Docker Hub at [here](https://hub.docker.com/repository/docker/charan0017/admin-panel-iframe)
> 9. Deployed the app to Vercel platform [here](https://admin-panel-iframe.vercel.app/)

# How to Use
## cloning git repo
```bash
git clone https://github.com/charan0017/admin-panel-iframe.git
```
## Run Using Docker
```bash
docker build -t admin-panel-iframe .
docker run -p 3000:3000 admin-panel-iframe
```
open [http://localhost:3000](http://localhost:3000)
## Run Locally
```bash
yarn install
yarn start
```
open [http://localhost:3000](http://localhost:3000)

## clone and Run Docker Container
```bash
docker push charan0017/admin-panel-iframe:latest
docker run -p 3000:3000 -d charan0017/admin-panel-iframe:latest
```
open [http://localhost:3000](http://localhost:3000)

