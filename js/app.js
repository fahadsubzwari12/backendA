//app.js

angular.module('Autotek', ['ui.router', 'Autotek.controller', 'CoreApi', 'LocalStorageModule', 'Autotek.directive'])
    .config(function($stateProvider, $urlRouterProvider,localStorageServiceProvider) {

        $urlRouterProvider.otherwise('login');

        $stateProvider

            .state('login', {
            url: "/login",
            templateUrl: "/EnglishTemplates/login.html",
            controller: "LoginCtrl",
        })
        .state('logout', {
            url: "/logout",
            templateUrl: "/EnglishTemplates/login.html",
            controller: "LogoutCtrl"
        })
        // .state('app', {
        //     url: "/",
        //     abstract: true,
        //     template: '<ui-view/>'
        //    // templateUrl: "/EnglishTemplates/dashboard.html"
        // })

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/EnglishTemplates/dashboard.html"
        })
        .state('salesagents', {
            url: "/salesagents",
            templateUrl: "/EnglishTemplates/agents/index.html",
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })

        .state('promotions', {
            url: "/promotion",
            templateUrl: "/EnglishTemplates/promotions/index.html",
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })

        .state('companies', {
            url: "/companies",
            templateUrl: "/EnglishTemplates/companies/index.html",
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })

        .state('mobileappusers', {
            url: "/mobileappusers",
            templateUrl: "/EnglishTemplates/appusers/index.html",
            controller: "mobile_app_users_page",
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })

        .state('appuserdetail', {
            url: "/appuser/:id",
            templateUrl: "/EnglishTemplates/appusers/detail.html"
        })

        .state('registration_page', {
            url: "/registration_page",
            templateUrl: "/pages/appusers/manage.html",
            controller: "SignupCtrl"
        })

        .state('profile_details_page', {
            url: "/profile_details_page",
            templateUrl: "/pages/appusers/detail.html",
            controller: "profile_details_page"
        })

        //----- Arabic Routes -----//
        .state('appusersa',{
            url:"/appusersa",
            templateUrl:"/ArabicPages/appusers/index.html"
        })
        .state('companiesa', {
            url: "/companiesa",
            templateUrl: "/ArabicPages/companies/index.html",
        })
         .state('agentsa', {
            url: "/agentsa",
            templateUrl: "/ArabicPages/agents/index.html",
        })
         .state('promotionsa', {
            url: "/promotionsa",
            templateUrl: "/ArabicPages/promotions/index.html",
        })
         .state('dashboarda', {
            url: "/dashboarda",
            templateUrl: "/ArabicPages/dashboard.html"
        })
        //      $rootScope.navigate=function(state,params){
        //     var lang=localStorageService.get('pageLanguage');
        //     console.log(lang);
        //     if(lang=='en'){
        //         if(params){
        //                 $state.go(state,params)
        //         }
        //         else{
        //             $state.go(state)
        //         }
        //     }
        //     else{
        //         if(params){
        //             $state.go(state + 'a',params)
        //         }
        //         else{
        //             $state.go(state +'a')
        //         }
        //     }
        // }
        localStorageServiceProvider
            .setPrefix('Autotek');
    })
// .run(function(){
       
// })

