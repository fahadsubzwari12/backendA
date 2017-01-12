angular.module('Autotek.controller', [])

.controller('LoginCtrl', function($scope,$rootScope, $state, User, localStorageService, $location, NavigateState ) {
    $scope.user = {};
    localStorageService.remove("access_token");
    var params = {
        'grant_type': 'password',
        'username': $scope.user.username,
        'password': $scope.user.password,
        'client_id': 'Android02',
        'client_secret': '21B5F798-BE55-42BC-8AA8-0025B903DC3B',
        'scope': 'app1'
    };
    $scope.Iserror=false;
    $scope.loginLoaderShow = false;
    $scope.login = function(data) {
        $scope.loginLoaderShow = true;
        var params = {
            'grant_type': 'password',
            'username': $scope.user.username,
            'password': $scope.user.password,
            'client_id': 'Android02',
            'client_secret': '21B5F798-BE55-42BC-8AA8-0025B903DC3B',
            'scope': 'app1'
        };
        
        User.login(params).success(function(res) {

                if (localStorageService.isSupported) {
                    localStorageService.set("access_token", res);

                    User.getUser().success(function(res) {
                            $scope.loginLoaderShow = false;
                            var loggedInUser = {
                                user: res
                            }
                            localStorageService.set("loggedInUser", loggedInUser);
                            NavigateState.navigate('dashboard');
                        })
                        .error(function(err) {
                            console.log(err);
                             $scope.Iserror=true;
                             $scope.loginLoaderShow = false;
                        });
                }
            })
            .error(function(err) {
                console.log('error', err);

                  $scope.Iserror=true;
                  $scope.loginLoaderShow = false;
            })
    }
               
           if (localStorageService.get('pageLanguage') == null) {
                $scope.lng='en';
               localStorageService.set('pageLanguage',$scope.lng);
           }     
           else {
               $scope.lng = localStorageService.get('pageLanguage') ;
           }
                
             $scope.get_language=function(value1){
            console.log($scope.lng)
            localStorageService.set('pageLanguage',$scope.lng);
          }
          
        
        $scope.go=function(language){
            console.log(language)
            localStorageService.set('pageLanguage',language);
        }
      
})

.controller('LogoutCtrl', function($scope, localStorageService, $location, $state) {
    $scope.user = localStorageService.get("loggedInUser").user;
    $scope.userName = $scope.user.FirstName;
    $scope.logout = function() {
        if (localStorageService.get('access_token')) {
            localStorageService.remove("access_token");
            localStorageService.remove("loggedInUser");
            NavigateState.navigate('login')
            return true;

        } else {
            return false;
        }
    }

})

.controller('DashboardApiCtrl', function($scope, User) {

    User.getDashboardStats().
    success(function(res) {

            $scope.NoOfCustomersToday = res.NoOfCustomersToday;

            $scope.NoOfCustomersThisWeek = res.NoOfCustomersThisWeek;

            $scope.NoOfCustomersThisMonth = res.NoOfCustomersThisMonth;

            $scope.NoOfCustomersThisYear = res.NoOfCustomersThisYear;


            $scope.ConversionRate = res.ConversionRate;

            $scope.BounceRate = res.BounceRate;

            $scope.NoOfSalesAgents = res.NoOfSalesAgents;

            $scope.NoOfSalesOrders = res.NoOfSalesOrders;

        })
        .error(function(err) {
            console.log('The error', err);
        })
})


.controller('mobile_app_users_page', function($state, $scope, User) {
    console.log("This is mobile_app_users_page controller");

    $scope.user_registration_page = function(_type) {
        console.log("This is user_registration_page controller");
        $state.go('registration_page');
    }

    User.getCustomers()
        .success(function(res) {
            console.log('All Customers', res);
            if (res != null || res != "") {
                $scope.customers = res;
            }
        })
        .error(function(err) {
            console.log('error', err);
        })
})


.controller('profile_details_page', function($state, $scope, User) {
    console.log("This is profile_details_page controller");

    // == Setting Customers Profile Information == //

    // $scop.customer_name = localStorageService.get('userName');
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();
    // $scop.customer_name = localStorageService.get();


    User.getOrderHistory()
        .success(function(res) {
            // console.log('Sales History', res);
            if (res != null || res != "") {
                $scope.salesHistory = res;
            }
        })
        .error(function(err) {
            console.log('error', err);
        })

    User.getCustomerPromotionOffers()
        .success(function(res) {
            console.log('All Customer Promotion Offers', res);
            if (res != null || res != "") {
                // $scope.consumedPromotions = res;
            }
        })
        .error(function(err) {
            console.log('error', err);
        })


    User.getConsumedPromotionOffers()
        .success(function(res) {
            console.log('All Consumed Promotion Offers', res);
            if (res != null || res != "") {
                $scope.consumedOffers = res;
            }
        })
        .error(function(err) {
            console.log('error', err);
        })

    User.getAvailablePromotionOffers()
        .success(function(res) {
            console.log('All Available Promotion Offers', res);
            if (res != null || res != "") {
                // $scope.consumedPromotions = res;
            }
        })
        .error(function(err) {
            console.log('error', err);
        })


})

.controller('SignupCtrl', ['$scope', '$rootScope', '$http', '$state', '$location', function($scope, $rootScope, $http, $state, $location) {

    $scope.user = {};
    $scope.user.MobileNumber = "";
    var User = {
        UserName: "",
        Password: ""
    };
    $scope.regex = '^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$';

    $scope.register = function(user) {
        var errors = [];
        if ($scope.user.FirstName == null || $scope.user.FirstName == "") {
            errors.push({ message: 'First Name is required' })
        }

        if ($scope.user.MobileNumber == null || $scope.user.MobileNumber == "") {
            errors.push({ message: 'Mobile Number is required' })
        }

        if ($scope.user.Password == null || $scope.user.Password == "") {
            errors.push({ message: 'Password is required' })
        }

        if ($scope.user.EmailAddress == null || $scope.user.EmailAddress == "") {
            errors.push({ message: 'Email is required' });
        } else {
            var email = $scope.user.EmailAddress.match($scope.regex);
            if (email == null) {
                console.log("Error-4a");
                errors.push({ message: 'Not a valid email' });
            }
        }

        // if ($scope.user.LastName == null || $scope.user.LastName == "") {
        //     errors.push({ message: 'Last Name is required' })
        // }


        //  if ($scope.user.ReferredById == null || $scope.user.ReferredById == "Select Reference") {
        //     errors.push({ message: 'Reference is required' })
        // }


        //  if ($scope.user.PromoKey == null || $scope.user.PromoKey == "") {
        //     errors.push({ message: 'Promo Key is required' })
        // }

        if (errors.length != 0) {
            $scope.register_error_message = "Failed to Add Customer";
            for (var i = 0; i < errors.length; i++) {
                if (errors[i].message == "First Name is required") {
                    $scope.register_error_message_firstname = errors[i].message;;
                }

                if (errors[i].message == "Mobile Number is required") {
                    $scope.register_error_message_mobileno = errors[i].message;;
                }

                if (errors[i].message == "Password is required") {
                    $scope.register_error_message_password = errors[i].message;;
                }

                if (errors[i].message == "Not a valid email" || errors[i].message == "Email is required") {
                    $scope.register_error_message_email = errors[i].message;
                }
            };

        } else {
            var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
            User['UserName'] = $scope.user.MobileNumber;
            User['Password'] = $scope.user.Password;
            $scope.user.User = User;
            $scope.user.Id = null;
            var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
            $http.post(url, params, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                })
                .success(function(result) {
                    $http.post('http://autotecapi.azurewebsites.net/api/CustomerRegistration', $scope.user, {
                            headers: {
                                'Authorization': "Bearer" + " " + result.access_token
                            }
                        }).success(function(res) {
                            if (res == "Customer has been registerd succesfully") {
                                console.log("Customer Registered Successfully");
                                $scope.register_error_message = "Customer Registered Successfully";
                                $location.path('/mobileappusers');
                            } else {
                                console.log("Failed to Register Customer");
                                $scope.register_error_message = "Failed to Register Customer";
                            }
                        })
                        .error(function(err) {
                            if (err.Message == "" || err.Message != null) {
                                if (err.Message == "User name not available") {
                                    console.log("Failed to Add Customer");
                                } else {

                                }
                            } else {

                            }
                        })
                })
                .error(function(error) {
                    console.log("API calling Error", error);
                    $scope.register_error_message = "Failed to Add Customer";
                })

        }
    }

}])
// .controller("MyCtrl", function($scope) {

//   $scope.open = function() {
//     $scope.showModal = true;
//   };

//   $scope.ok = function() {
//     $scope.showModal = false;
//   };

//   $scope.cancel = function() {
//     $scope.showModal = false;
//   };

// })
.service('NavigateState', function($state, localStorageService) {
    this.navigate = function(state, params) {
             //      $rootScope.navigate=function(state,params){
        var lang=localStorageService.get('pageLanguage');
        //     console.log(lang);
             if(lang=='en'){
                 if(params){
                         $state.go(state,params)
                 }
                 else{
                     $state.go(state)
                 }
             }
             else{
                 if(params){
                    $state.go(state + 'a',params)
                }
                else{
                    $state.go(state +'a')
                }
            }
        
    }
})
