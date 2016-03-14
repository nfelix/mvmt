var app = angular.module('mvmt', []);

// This will cause your app to compile when Turbolinks loads a new page
// and removes the need for ng-app in the DOM
$(document).on('ready page:load', function(arguments) {
  angular.bootstrap(document.body, ['mvmt']);
});

app.controller('CategoryController',['$window', '$scope', '$rootScope', '$sce', '$http',
    function ($window, $scope, $rootScope, $sce, $http) {
        var catMenu = this;

        $rootScope.mapUrl = '';

        $rootScope.filters = [];

        $scope.updateFilter = function(category){
            
            var index = $rootScope.filters.indexOf(category);

            if (index > -1){
                console.log(index);
                $rootScope.filters.splice(index, 1);
            }
            else {
                $rootScope.filters.splice(index, 0, category);
            }
        }

        $scope.addCurrentClass = function(category){
            if (($rootScope != undefined || $rootScope.filters != undefined) && ($rootScope.filters.indexOf(category) > -1))
                return 'menu__item--current';
        }

        $scope.inList = function(category){
            if ($rootScope != undefined || $rootScope.filters != undefined)
                return ($rootScope.filters.indexOf(category) > -1);
        }
        $scope.getMapUrl = function(url){
            return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=place_id:ChIJjx9f6OsEdkgRsWosuIP7Njs&key=AIzaSyA3aZfa51yc-MiMjZyToarr9BqUdx1A-S4');
        }

        $scope.reapplySpan = function(){
            //
            // foreach li in the list, remove span class.
            // if the calculation is right (with running count, not index), and cat is in filters, then apply span class.
            //
        }

        $scope.updateClickThrough = function(id){
            $http.get("http://localhost:3000/api/v1/resources/" + id)
                .then(function(response){
                    $http({
                        url: 'http://localhost:3000/api/v1/resources/' + id,
                        dataType: 'json',
                        method: 'PUT',
                        data: {
                            id: id,
                            clickthrough: response.data.resource.clickthrough + 1
                        },
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).success(function(response){
                        console.log(response);
                    }).error(function(error){
                        console.log(error);
                    });
            });
        }

    }
]);


