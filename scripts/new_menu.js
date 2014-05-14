var API = require('wechat').API;
var api = new API('wx601b569d5c050bb3','7b91bbd950aa3910b96b4bddee3118c3');

var menu = { 

        "button":[
        {   
                "name":"报案服务",
                "sub_button":[
                {   
                        "type":"click",
                        "name":"微报案",
                        "key":"V1001_BaoAn"
                },    
                {   
                        "type":"click",
                        "name":"案件查询",
                        "key":"V1002_AnJian"
                },  
                {   
                        "type":"click",
                        "name":"理赔查询",
                        "key":"V1003_LiPei"
                },  
                {   
                        "type":"click",
                        "name":"VIP专享",
                        "key":"V1004_VIP"
                },  
                {   
                        "type":"click",
                        "name":"索赔须知",
                        "key":"V1005_SuoPei"
                }   
                ]   
        },  
        {   
                "name":"机构服务",
                "sub_button":[
                {   
                        "type":"click",
                        "name":"案件改派",
                        "key":"V2001_GaiPai"
                },  
                {   
                        "type":"click",
                        "name":"热件沟通",
                        "key":"V2002_ReJian"
                },  
                {   
                        "type":"click",
                        "name":"投保初审",
                        "key":"V2003_ChuShen"
                }
                ]
        },
        {
                "name":"增值服务",
                "sub_button":[
                {
                        "type":"click",
                        "name":"酒后代驾",
                        "key":"V3001_DaiJia"
                },
                {
                        "type":"click",
                        "name":"道路救援",
                        "key":"V3002_JiuYuan"
                },
                {
                        "type":"click",
                        "name":"预约收单",
                        "key":"V3003_ShouDan"
                }
                ]
        }
        ]
}


api.createMenu(menu,function(err,result){
                console.log(err);
                console.log(result);
                });

