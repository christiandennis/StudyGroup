##STUDYGROUP
- Patrick Hong
- Christian Dennis
- Mohit Kohli
- Dionysius Andi
- Theodorus Budiyanto

##FIRST ITERATION
#Frontend:
- Main View
- Group View
- Landing Page
- Login View
- Registration View

#Backend:
- User API
- Group API 


##SECOND ITERATION
#Frontend:
- Main View React
- Group View React
- Landing Page React
- Login View React
- Registration View React
- New Group View React

#Backend:
- Login API
- SignUp API
- SignOut API
- Group per user API

##Bugs:
- Sign up has a similar behavior as sign in. That is why we have to tinker this on the frontend (each time we sign up, we log out first when closing the dialog)
- We cant figure out how the cookie authentication work. So if we log in, and forgot to log out, we cant log in again.
- Group API has a mismatch data type every time we try to do a push (working fine with postman) we tried adding header and everything but it still not working. We use sheetsu as a replacement