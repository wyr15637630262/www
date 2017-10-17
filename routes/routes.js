
import Login from "./../com/userLogin/Login.vue";
import User from "./../com/User.vue";
import CommodityType from "./../com/commodity/CommodityType.vue";
import CommodityBank from "./../com/commodity/CommodityBank.vue";
import CommoditySpec from "./../com/commodity/CommoditySpec.vue";
import CommodityTag from "./../com/commodity/CommodityTag.vue";
import CommodityVariety from "./../com/commodity/CommodityVariety.vue";
import CommodityPicture from "./../com/commodity/CommodityPicture.vue";


import memberList from "./../com/member/memberList.vue";
import memberCard from "./../com/member/memberCard.vue";
import memberDetail from "./../com/member/memberDetail.vue";


import orderList from "./../com/order/orderList.vue";
import orderDetail from "./../com/order/orderDetail.vue";

import dealSet from "./../com/system/dealSet.vue";

import couponList from "./../com/marketing/couponList.vue";
import couponAdd from "./../com/marketing/couponAdd.vue";
import couponDetail from "./../com/marketing/couponDetail.vue";
import couponRevise from "./../com/marketing/couponRevise.vue";





const routes = [
    {path:"/",redirect:"/login"},
	{path:"/login",component:Login},
	{path:"/user",component:User,
	children:[
        {path: '/commodityType',component:CommodityType},
        {path: '/commodityBank',component:CommodityBank},
        {path: '/commoditySpec',component:CommoditySpec},
        {path: '/commodityTag',component:CommodityTag},
        {path: '/commodityVariety',component:CommodityVariety},
        {path: '/commodityPicture',component:CommodityPicture},

        {path: '/couponList',component:couponList},
        {path: '/couponAdd',component:couponAdd},
        {path: '/couponDetail',component:couponDetail},
        {path: '/couponRevise',component:couponRevise},

        {path: '/memberList',component:memberList},
        {path: '/memberCard',component:memberCard},
        {path: '/memberDetail',component:memberDetail},

        {path: '/orderList',component:orderList},
        {path: '/orderDetail',component:orderDetail},

        {path: '/dealSet',component:dealSet}
    ]
	}
];


export default routes;