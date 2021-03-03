# Dark Manager (?)

## Description

With the current pandemic, the rise of the dark kitchens have begun, and with them, the need of a software that allows
an integrated management of their webpage, orders and stock management, delivery routes and business metrics all in one.

Dark Manager is a B2B service offered to dark kitchens around the world that will allow exactly all that.

## User stories - Client

- **404** - As a client I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

- **500** - As a client I want to see a nice error page when the super team screws it up so that I know that is not my fault

- **homepage** - As a client I want to be able to access the homepage.

- **sign up** - As a client I want to sign up on the web page so that I can order food.

- **login** - As a client I want to be able to log into my account so that I can order food or check my profile.

- **logout** - As a client I want to be able to log out from the web page so that I can make sure no one will access my account.

- **see and edit profile information** - As a client I want to be able to access my profile information and edit it.

- **food list** - As a client I want to see the list of food I can order.

- **buy** - As a client I want to place an order.

- **checkout** - As a client I want to see the cart and be redirected to payment page.


## User stories - Employee

- **404** - As a employee I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

- **500** - As a employee I want to see a nice error page when the super team screws it up so that I know that is not my fault

- **homepage** - As a employee I want to be able to access the management homepage.

- **login** - As a employee I want to be able to log into my account so that I can manage the current orders and check the business information.

- **logout** - As a employee I want to be able to log out from the web page.

- **Add new employee** - As a employee I want to add new employee accounts.

- **edit user** - As a employee I want to be able to edit my profile.

- **see all current orders** - As a employee I want to see the list of orders and the different stages they are in.

- **move orders between stages** - As a employee I want to see what items i can purchase and click on them.

- **delivery management** - As a employee I want to see a map of the area I work, with all the orders placed in it.

- **stock management** - As a employee I want to see the stock levels of my ingridients and also get a shopping list of the ingridients I need to restock my kitchen to it's proper levels.

- **graphics and stadistics** - As a employee I want to see information, graphics and stadistics of my business.







# Client / Frontend

## React Router Routes (React App)

| Path                            | Component                            | Permissions                  | Behavior                                                     |
| ------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------------------------------ |
| `/`                             | Home                                 | public `<AnonRoute>`         | Home page with a display of all the restaurants you can buy food. |
| `/signup`                       | SignUp                               | anon only `<AnonRoute>`      | Signup form, link to login, new user form, navigate to homepage after signup. |
| `/login`                        | LogIn                                | anon only `<AnonRoute>`      | Login form, navigate to homepage after login.                |
| `/logout`                       | n/a                                  | client only `<PrivateRoute>` | Navigate to Home screen after logout, expire session.        |
| `/burguer-hostel`               | Business                             | public `<AnonRoute>`         | Shows all the different food you can order from this brand and let's you add it to your current cart. |
| `/mandele`                      | Business                             | public `<AnonRoute>`         | Shows all the different food you can order from this brand and let's you add it to your current cart. |
| `/garden-pizza`                 | Business                             | public `<AnonRoute>`         | Shows all the different food you can order from this brand and let's you add it to your current cart. |
| `/checkout`                     | Checkout                             | client only `<PrivateRoute>` | Show the user the order that has just been made              |
| `/profile`                      | Profile                              | client only `<PrivateRoute>` | Show user's details and links to edit profile and list of orders. |
| `/profile/details`              | ProfileDetails                       | client only `<PrivateRoute>` | Profile details of a specific user.                          |
| `/profile/orders`               | ProfileOrders                        | client only `<PrivateRoute>` | Order details list of a  specific user.                      |
| `/dark-manager/login`           | Login                                | public only `<AnonRoute>`    | Login.                                                       |
| `/dark-manager/add-user`        | SignUp                               | client only `<PrivateRoute>` | SignUp.                                                      |
| `/dark-manager/orders`          | Orders, NewOrders, Cooking, Delivery | client only `<PrivateRoute>` | List of the new orders.                                      |
| `/dark-manager/stats`           | Stats                                | client only `<PrivateRoute>` | Details of the stats.                                        |
| `/dark-manager/stock`           | Stock, ShoppingList, StockManagement | client only `<PrivateRoute>` | Stock management.                                            |
| `/dark-manager/orders/`:id      | OrderDetails                         | client only `<PrivateRoute>` | Specific order details.                                      |
| `/dark-manager/users/:id        | UserDetails                          | client only `<PrivateRoute>` | Specific user details.                                       |
| `/dark-manager/recipes/`:id     | RecipeDetails                        | client only `<PrivateRoute>` | Specific recipe details.                                     |
| `/dark-manager/ingredients/`:id | IngredientDetails                    | client only `<PrivateRoute>` | Specific ingredient details.                                 |

## Components

- Home

  ​	-Login

  ​	-SignUp

- Business

  ​	-Cart

- Orders

  ​	-NewOrders

  ​	-Cooking

  ​	-Delivery

- OrderDetails

- UserDetails

- IngredientDetails

- RecipeDetails

- Stock

  ​	-ShoppingList

  ​	-StockManagement

- Stats

  

## Backlog

[See the Trello board.](https://trello.com/b/6ZU07s3r/m2project)

[See the Wireframes.](https://balsamiq.cloud/swcw8xi/pk1esy0/r2278)

## Links

### Git

Url to repository and to deployed project

[Repository Link](https://github.com/aleixbadia/community-project)

[Deploy Link]()

<br>

### Slides

Url to the presentation slides

[Slides Link](