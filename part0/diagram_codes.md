# 0.4 Code snippet

```
note over browser:
Page loaded state
end note

note over browser:
User triggers a POST request
by clicking the "Save" button.
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

note over server:
Reading the value of the "note" field of
the application/x-www-form-urlencoded
type data and storing it for later use.
end note

server-->browser: 302 Found response

note over browser:
Browser detects the 302 response
code so it requests the page located
at the value of the location header
(`/exampleapp/notes`).
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes


note over server:
On the following data request the server
will return previous notes and the newly
added note.
end note
```

# 0.5 Code snippet

```
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
Browser renders HTML and executes `spa.js`
In which it requests the data using an
XMLHTTP request
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: {...}

note over browser:
On data receive, the event handler triggers,
which renders the list of notes.
end note


note over browser:
On page load we attach an event handler to
the form which adds a new note instantly in
our list and sends the data to the server
an XHR POST request
end note
```

# 0.6 Code snippet

```
note over browser:
The user triggers the form action.
end note

note over browser:
The form `onsubmit` handler prevents the default event
The value of the note is read, built into an object
with a Date, and added to the global list of notes.
end note

note over browser:
The notes list is rerendered by calling the helper
function `redrawNotes`.
end note

note over browser:
The data is sent to the server as an XHR POST request
using the `sendToServer` helper, encoded as a JSON object.
end note

browser->server: HTTP POST /exampleapp/new_note_spa
server-->browser: {..}

note over browser:
The response is printed to the console.
end note
```
