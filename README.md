# BiteCo

**Individual Assignment — Web Development**
Metropolia University of Applied Sciences
2026–2027

BiteCo is a web application for browsing student restaurants in Finland and viewing their daily and weekly menus.

## Website

The deployed website will be available here:

**[Open BiteCo](WEBSITE_LINK_HERE)**

## Features

- Browse student restaurants
- Filter restaurants by city
- Filter restaurants by restaurant provider
- View daily menus
- View weekly menus
- View restaurants on a map
- Find the nearest restaurant
- Create an account
- Log in and log out
- Edit profile information
- Upload a profile picture
- Favorite a restaurant

## Known limitations and disclaimers

### Favorite restaurant

The API only supports **one favorite restaurant per user**. Selecting another restaurant as a favorite replaces the previously selected favorite.

### Registration

The API currently returns an error during registration even though the user is successfully created. Because of this, automatic login immediately after registration could not be implemented reliably. After registering, the user needs to log in manually.

### Location

The map uses browser geolocation when available. Location accuracy can be inconsistent: the browser may sometimes provide the user's exact location, while at other times it may return a less accurate or totally different location. This behavior depends on the browser, device, etc...

## API

The application uses the Metropolia Restaurant API to retrieve restaurant, menu, and user data, which requires the Metropolia VPN.
