import store from '@/store'
import { defineAsyncComponent } from 'vue'
const loadView = (view) => () =>
    import(`../views/${view}.vue`).then(m => m.default || m);

const routes = [{
    component: loadView('HomePage/Index'),
    path: '/',
    name: 'dashboard-index'
},
{
    component: loadView('Auth/Index'),
    path: '/login-index',
    name: 'login-index',
    children: [
        {
            component: loadView('Auth/SignIn'),
            path: '/login',
            name: 'login',
        },
        {
            component: loadView('Auth/ForgetPassword'),
            path: '/auth-forget-password',
            name: 'forget-password',
        },
        {
            component: loadView('Auth/ValidateCode'),
            path: '/auth-validate-code',
            name: 'validate-code',
        },
        {
            component: loadView('Auth/AuthChangePassword'),
            path: '/auth-change-password',
            name: 'auth-change-password',
        },
    ]
}, 
{
    component: loadView('Profile'),
    path: '/profile',
    name: 'profile',
},
{
    component: loadView('ChangePassword'),
    path: '/change-password',
    name: 'change-password',
},
{
    component: loadView('Auth/ForgetPassword'),
    path: '/forget-password',
    name: 'forget-password',
},
{
    component: loadView('SubDriverPartner/Index'),
    path: '/users',
    children: [
        {
            component: loadView('SubDriverPartner/Listing'),
            path: '',
            name: 'list-user',
        },
        {
            component: loadView('SubDriverPartner/FormUser'),
            path: '/create-user',
            name: 'create-user',
        },
        {
            component: loadView('SubDriverPartner/FormUser'),
            path: '/edit-user/:id',
            name: 'edit-user',
        },
        {
            component: loadView('SubDriverPartner/ViewUser'),
            path: '/view-user',
            name: 'view-user',
        },
    ]
}, 
{
    component: loadView('Drivers/Index'),
    path: '/drivers',
    name: 'index-driver', 
    children:[
        {
            component: loadView('Drivers/Listing'),
            path: '',
            name: 'list-driver',
        },
        {
            component: loadView('Drivers/FormDriver'),
            path: '/create-driver',
            name: 'create-driver',
        },
        {
            component: loadView('Drivers/FormDriver'),
            path: '/edit-driver/:id',
            name: 'edit-driver',
        },
        {
            component: loadView('Drivers/ViewDriver'),
            path: '/view-driver',
            name: 'view-driver',
        },
        {
            component: loadView('Drivers/ViewDriver'),
            path: '/view-driver',
            name: 'view-driver',
        },
        {
            component: loadView('Drivers/OrderByDriverListing'),
            path: '/list-order-by-driver/:id',
            name: 'list-order-by-driver',
        }
    ]
},
{
    component: loadView('TrackingDriver/Index'),
    path: '/tracking-drivers',
    name: 'index-tracking-driver', 
    children:[
        {
            component: loadView('TrackingDriver/AvailableListing'),
            path: '/list-available-driver',
            name: 'list-available-driver',
        },
        {
            component: loadView('TrackingDriver/TrackingDriverListing'),
            path: '/list-tracking-driver',
            name: 'list-tracking-driver',
        },
    ]
},
{
    component: loadView('Order/Index'),
    path: '/orders',
    name: 'index-order', 
    children:[
        {
            component: loadView('Order/UnassignedOrder'),
            path: '/unassigned-order',
            name: 'unassigned-order',
        },
        {
            component: loadView('Order/OrderDetails'),
            path: '/order-details/:id',
            name: 'order-details',
        },
    ]
},
{
    component: loadView('Report/Index'),
    path: '/reports',
    name: 'index-report', 
    children:[
        {
            component: loadView('Report/AssignedOrderListing'),
            path: '/assigned-order-listing',
            name: 'assigned-order-listing',
        },
        {
            component: loadView('Report/UnassignedOrderListing'),
            path: '/unassigned-order-listing',
            name: 'unassigned-order-listing',
        },
        {
            component: loadView('Report/Invoice'),
            path: '/invoice/:id',
            name: 'invoice',
        },
    ]
}
]

export default routes;