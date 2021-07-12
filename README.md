# Welcome to Giftr, your organizer for gift ideas!

# Installation
Fork and clone or download this repository, then run these commands in your console:

```
bundle install
rails db:create
npm install --prefix client
```

# Setup
Starting the backend: `rails s`
Starting the frontend: `npm start --prefix client`

# How to Use
The app will be launched at http://localhost:4000. 

## Sign Up/Log In
Create an account on the "Sign Up" tab or log in on the "Log In" tab if an account has already been created.

## Gift Recipients
On the "Your Giftees" page, you can create new gift recipients by clicking the "Add Giftee" button and entering the person's name, some of their likes, and their birthday. Once a giftee has been added, they can be edited or deleted by clicking the respective buttons.

## Gift Idea List
Clicking on an individual giftee's name will take you to their individual page, where you can view and edit a list of gift ideas for them. New gifts can be added by clicking the "Add Gift" button and inputting the item's name, price, and a link to where it can be purchased if desired. Gifts can also be edited and deleted using the buttons provided.