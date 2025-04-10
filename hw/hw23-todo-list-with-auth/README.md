# Hw23TodoListWithAuth

## Requirements

Create an Angular application with a simple authentication system and a todo list. The application should include the following features:

1. User login: A user should be able to enter a username to log in. You can hardcode password
2. Persistent Authentication: Once logged in, the user should remain authenticated until log out, even if page is refreshed.
3. Access control: The todo list should only be accessible to logged in users. If an unauthenticated user tries to access todo list, they should be redirected to the login page.
4. Todo list: logged in users should be able to Add new task, Mark tasks as completed, Delete tasks
5. Logout: Users should be able to log out which should remove their authentication status and return them to login page.
6. Access control additional request (optional):

   - a. using ReactiveFrom, create an Async validator for the username formcontrol,
     if the user input an exist user in your user list, show :white_check_mark: in somewhere, if user not exist show :no_entry_sign:
   - b. add debounce time to the username formcontrol

## Routes without leading slash

Angular's routing system is designed to handle paths without leading slashes. When you define routes in your Angular application, you should follow these conventions:

1. Route paths should not include leading slashes
2. Redirects should use the path name without leading slashes
The reason your routes aren't working with the leading slashes is that Angular treats the path definitions differently from the actual URL in the browser. In Angular's routing system:

- path: 'login' matches the URL /login
- If you write path: '/login', Angular looks for a URL that is literally //login (with double slash)
