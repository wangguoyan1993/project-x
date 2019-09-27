var navs = [
	{
		"title": "用户管理",
		"icon": "fa-user",
		"spread": false,
		"children": [{
			"title": "用户管理",
			"icon": "fa-user-o",
			"href": "WebUI/User/UserManager.html"
		}, {
			"title": "用户组管理",
			"icon": "fa-group",
			"href": "WebUI/UserGroup/UserGroup.html"
		}, {
			"title": "权限管理",
			"icon": "&#xe63c;",
			"href": "WebUI/Authority/Authority.html"
		}]
	},
	{
		"title": "工艺管理",
		"icon": "fa-cogs",
		"spread": false,
		"children": [
			{
				"title": "配方管理",
				"icon": "fa-navicon",
				"href": "WebUI/Recipe/Recipe.html"
			},
			{
				"title": "BOM清单",
				"icon": "fa-table",
				"href": "WebUI/BOM/BOM.html"
			},
			{
				"title": "工艺路径",
				"icon": "fa-navicon",
				"href": "WebUI/CraftWork/CraftWork.html"
			},
			{
				"title": "程序管理",
				"icon": "fa-navicon",
				"href": "WebUI/Program/Program.html"
			},
			{
				"title": "页面资源",
				"icon": "fa-navicon",
				"href": "WebUI/ProgramStep/ProgramStep.html"
			}]
	},
	{
		"title": "批次管理",
		"icon": "fa-stop-circle",
		"spread": false,
		"children":[{
            "title": "批指令",
            "icon": "fa-stop-circle",
            "href": "WebUI/Order/BatchOrder.html",
            "spread": false
		},{
            "title": "批次管理",
            "icon": "fa-stop-circle",
            "href": "WebUI/Order/BatchManager.html",
            "spread": false
        },{
            "title": "批次称量",
            "icon": "fa-stop-circle",
            "href": "WebUI/Order/BatchWeighingManager.html",
            "spread": false
        }]
	},
	{
		"title": "物料管理",
		"icon": "fa-table",
		"href": "",
		"spread": false,
		"children": [
            {
                "title": "物料代码",
                "icon": "fa-flask",
                "href": "WebUI/Material/MaterialCode.html"
            },
			{
				"title": "物料批次",
				"icon": "fa-indent",
				"href": "WebUI/Material/MT_BA_Check.html"
			},
			{
				"title": "物料件",
				"icon": "fa-inbox",
				"href": "WebUI/Material/MT_TU.html"
			},
            {
                "title": "物料件(一)",
                "icon": "fa-inbox",
                "href": "WebUI/Material/MT_TUOne.html"
            },
            {
                "title": "仓库系统",
                "icon": "fa-sitemap",
                "href": "WebUI/Material/WareHouseInfo.html"
            },
			{
				"title": "载具管理",
				"icon": "fa-shopping-cart",
				"href": "WebUI/Material/LoadCarrierInfo.html"
			},
            {
                "title": "商家管理",
                "icon": "fa-vimeo-square",
                "href": "WebUI/Material/Vender.html"
            },
            {
                "title" : "物料流转履历",
                "icon" : "fa-navicon",
                "href" : "WebUI/Record/MetTransRecord.html"
            },
            {
                "title" : "物料操作履历",
                "icon" : "fa-navicon",
                "href" : "WebUI/Record/MaterialOperateRecord.html"
            }]
	},
	{
		"title": "设备设施",
		"icon": "fa-address-book",
		"href": "",
		"spread": false,
		"children": [
			{
				"title": "设备实例",
				"icon": "fa-github",
				"href": "WebUI/Equipment/Equipment.html"
			},
			{
                "title": "工位设备",
                "icon": "fa-github",
                "href": "WebUI/OperateClient/CW_EM_Check.html"
            },
			{
				"title": "设备状态图",
				"icon": "fa-navicon",
				"href": "WebUI/Equipment/EM_SG.html"
			},
            {
                "title": "设备类",
                "icon": "fa-navicon",
                "href": "WebUI/Equipment/EM_Class.html"
            },
            {
                "title": "事件管理",
                "icon": "fa-navicon",
                "href": "WebUI/Event/Event.html"
            },
            {
                "title": "设备配置",
                "icon": "fa-navicon",
                "href": "WebUI/Equipment/EM_Config.html"
            }]
	},
	{
		"title": "工位管理",
		"icon": "fa-address-book",
		"href": "",
		"spread": false,
		"children": [
			{
				"title": "终端管理",
				"icon": "fa-github",
				"href": "WebUI/WorkCenter/Client.html"
			},
			{
				"title": "工位管理",
				"icon": "fa-navicon",
                "href": "WebUI/WorkCenter/WorkCenter.html"
			},
            {
                "title": "工位组",
                "icon": "fa-navicon",
                "href": "WebUI/WorkCenter/WorkCenterGroup.html"
            }]
	},
	// {
	// 	"title": "批次控制",
	// 	"icon": "fa-address-book",
	// 	"href": "",
	// 	"spread": false,
	// 	"children": [
	// 		{
	// 			"title": "偏差管理",
	// 			"icon": "fa-github",
	// 			"href": "WebUI/Deviation/Deviation.html"
	// 		}
	// 		// ,{
	// 		// 	"title": "偏差提出",
	// 		// 	"icon": "fa-navicon",
	// 		// 	"href": "http://www.qq.com/"
	// 		// },
	// 		// {
	// 		// 	"title": "偏差审批",
	// 		// 	"icon": "fa-github",
	// 		// 	"href": "https://www.github.com/"
	// 		// },
	// 		// {
	// 		// 	"title": "偏差记录",
	// 		// 	"icon": "fa-navicon",
	// 		// 	"href": "http://www.qq.com/"
	// 		// }
	// 		]
	// },
	{
		"title": "审计追踪",
		"icon": "fa-address-book",
		"href": "",
		"spread": false,
		"children": [
			// {
			// 	"title": "系统日志",
			// 	"icon": "fa-github",
			// 	"href": "https://www.github.com/"
			// },
			{
				"title": "审计追踪",
				"icon": "fa-navicon",
				"href": "WebUI/AuditTrace/AuditTrace.html"
			}]
	},
	{
		"title": "系统管理",
		"icon": "fa-stop-circle",
		"href": "",
		"spread": false,
		"children": [
			{
                "title": "版本流",
                "icon": "fa-stop-circle",
                "href": "WebUI/VersionFlow/VersionFlowCheck.html"
			}
		]
	},
	{
		"title": "测试",
		"icon": "fa-address-book",
		"href": "",
		"spread": false,
		"children": [
			{
				"title": "数据设定",
				"icon": "fa-github",
				"href": "WebUI/Test/Set.html"
			},
			{
				"title": "称量",
				"icon": "fa-github",
				"href": "WebUI/Weighing/Weighing.html"
			}
			]
	}
];