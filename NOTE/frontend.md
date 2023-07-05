1. Tạo create react app
   npx create-react-app frontend

2 install react-router-dom

3 Cài đặt customize-cra

4 Cài đặt babel-plugin-module-resolver
tao thu muc tinh
\npm install --save-dev babel-plugin-module-resolver

+12. Add Redux to Home Screen 1. npm install redux react-redux 2. Create store.js 3. initState= {products:[]} 4. reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload} 5. export default createStore(reducer, initState) 6. Edit HomeScreen.js 7. shopName = useSelector(state=>state.products) 8. const dispatch = useDispatch() 9. useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data}) 10. Add store to index.js

14. Handle Add To Cart Button
    1. Handle Add To Cart in ProductScreen.js
    2. create CartScreen.js
15. Implement Add to Cart Action
    1. create addToCart constants, actions and reducers
    2. add reducer to store.js
    3. use action in CartScreen.js
    4. render cartItems.length + Add icon cart

Click add to cart --> Action --> dispatch ({type, payload})--> Store 16. Build Cart Screen 1. create 2 columns for cart items and cart action 2. cartItems.length === 0 ? cart is empty 3. show item image, name, qty and price 4. Proceed to Checkout button 5. Implement remove from cart action 17. Implement Remove From Cart Action 1. create removeFromCart constants, actions and reducers 2. add reducer to store.js 3. use action in CartScreen.js
22. Implement SignIn Action
    1. create signin constants, actions and reducers
    2. add reducer to store.js
    3. use action in SigninScreen.js
23. Create Register Screen
    1. create API for /api/users/register
    2. insert new user to database
    3. return user info and token
    4. create RegisterScreen
    5. Add fields
    6. Style fields
    7. Add screen to App.js
    8. create register action and reducer
    9. check validation and create user
30. Add PayPal Button
    1. get client id from paypal
    2. set it in .env file
    3. create route form /api/paypal/clientId
    4. create getPaypalClientID in api.js
    5. add paypal checkout script in OrderScreen.js
    6. show paypal button
35. Create Admin View
    1. Create Admin Menu
    2. Create Admin Middleware in Backend
    3. Create Admin Route in Frontend
37. Create Product
    1. build create product api
        productRoute.js
    2. build Create Product button
    3. define product create constant, action and reducer
    4. use action in Product List Screen
38. Build Product Edit Screen
    1. create edit screen
    2. define state
    3. create fields
    4. load product details
    5.  add to routes
40. Upload Product Image
    1. npm install multer

    7. define upload router
    8. create uploads folder 
    9. Handle frontend
41. Delete Product
    1.  create delete api in backend
    2.  create delete constants, action and reducer
    3.  use it in product list screen
42. List Orders
    1. create order list api
        OrderRouter--> get method
            link '/' --> /orderlist/
            isAuth // login =true
            isAdmin
            user find({}).populate(user, name)

    2. create Order List Screen
        create rout from config and routes folder --> when go to /orderlist -> call ortderlist page
        dispatch->list orther to orderActions  -> call  listOrders --> dispatch orther reuqets --> call api --> getvalue return --> dispatch succes to reducer 
    3. Add reducer to store
        Chaneg state to store --> change state   --> go to home page  user efffer apply -> create 3 valuer loading succes fail in to orderlist 
    4. show products on the screen
43     2. create delete order action and reducer
    3. add order delete action to order list
    Click delete -->  dispatch delete order to action  --> dispatch request  --> try call api delte (api/order/:id)-> dispatch delete success  to reducer --> reucer return state  {loading is fasle and success tru } --> chaneg state in useEffect hook  --> dispatch reset delete to rerender 
44. Deliver Order
    1. create constant, actions and reducers for deliver order
    2. add order deliver action to order details scree
45. Publish To Heroku
    1. Create git repository
    2. Create heroku account
    3. install Heroku CLI
    4. heroku login
    5. heroku apps:create <yourname>amazona
    6. Edit package.json for build script
    10. Create Procfile
    12. Create mongodb atlas database
    19. Set database connection in heroku env variables
    20. Commit and push
46. List Users
    1. build api for list users
    2. Create UserList Screen
    3. create order details constant, action and reducer
    5. add Seller to Product List and Details Screen
50. Create Seller Page
    1. create seller page
    2. update product component and product screen
    3. update product routes
+51. Add Top Seller Carousel+   
 1. install react carousel+  
  2. implement actions and reducers for top sellers+ 
     3. use react carousel with data in Home Screen
53. Create Search Box and Search Screen
    1. create search bar in Header.js
    2. add style
    3. handle submit form
    4. edit parse url to get query string
    5. update product list api for search by name
56 there is newreview 
 57. Choose Address On Google Map
    1. create google map credentials 
        goto https://console.cloud.google.com/
        Api& services 
        Credentioals
        Create key
        library -> map js api -> enable  -> click Maps JavaScript API


    2. update .env file with Google Api Key
    3. create api to send google api to frontend
    4. create map screen
    5. fetch google api
    6. getUserLocation
    7. install @react-google-maps/api
    8. use it in shipping screen
    9. apply map to the checkout screen
 vantoanpp111@gmail.com
pass word mail gun @LeoMessi2617
