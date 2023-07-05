1. npm init
   2.npm i expreess
   3.npm install express

2. Suwar type in package.json type::"module"
   5 node backend/server.js to run sever

6 Cai va chay node mon de debug

npm install --save-dev nodemon  
 "start": "nodemon --watch backend --exec node --experimental-modules backend/server.js",

Bai 10
7 npm i axios
AXIOS IS A LIBRARY TO SEND REUQETS TO SEVER

8 set proxy in package.json in front end "proxy": "http://127.0.0.1:5000", to get data

18. 7.1 Create Sample Users In MongoDB
    1. npm install mongoose
    2. connect to mongodb
    3. create config.js
    4. npm install dotenv
    5. export MONGODB_URL
    6. create models/userModel.js
    7. create userSchema and userModel
    8. create models/productModel.js
    9. create productSchema and productModel
    10. create userRoute
    11. Seed sample data
19. Create Sample Products In MongoDB
20. create models/productModel.js
21. create productSchema and productModel
22. create productRoute
23. Seed sample data
27. Create Place Order API
    1. createOrder api
    2. create orderModel
    3. create orderRouter
    4. create post order route
29. Create Order Screen
    1. build order api for /api/orders/:id
    2. create OrderScreen.js
    3. dispatch order details action in useEffect
    4. load data with useSelector
    5. show data like place order screen
    6. create order details constant, action and reducer
31. Implement Order Payment
    1. update order after payment
    2. create payOrder in api.js
    3. create route for /:id/pay in orderRouter.js
    4. rerender after pay order

32 
1. edit router in config and router folder

39. Update Product
    1. define update api
    2. define product update constant, action and reducer
    3. use action in Product Edit Screen
