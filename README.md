# Copy-Chat - video and text chatting webapp

built with Django(drf and socket-io) React(Redux with toolkit, socket-io, axios)

## Concept

- I designed this project as easy to maintain or improve as possible.
  avoided code-duplication, tried to create reusable code, with 
  easy-to-understand & human-readable data structure

- Eventually, almost every data has become nest-structured and centralized (on front),
  and backend has become "event-driven"

- I used Websocket for real-time communication between clients or client to server with serializable data (like metadata),
  and used non-serializable data for Webrtc (peer to peer data streaming).

- In frontend, there might be hard-to-understand code like function that create listener function, and
  arrow function chaining triple time, but i couldn't find better way to split heavy code to outside and keep React-component short

## Dependency

- Backend built with Django with socketio, asgi setup

- Frontend built with React with Redux and socketio

Used techs

1. Websocket
2. Rest api
3. Webrtc
4. Token validation
5. Docker (to deploy)

## Deployed to

[Real working example](https://copychat.99works.dev)
