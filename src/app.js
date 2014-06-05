angular.module('InstagramSearcher', []);

angular.module('InstagramSearcher')
  .controller('searchController', ['$scope', '$http', function($scope, $http) {
    $scope.submitClicked = function() {
      $scope.searchText = $scope.searchText || 'cats';
      console.log($scope.searchText);
      $scope.queryInstagram($scope.searchText)
    };

//inject $http
//set config for jsonp
//define params obj

    $scope.queryInstagram = function(searchText) {
        var url = "https://api.instagram.com/v1/tags/" + searchText + "/media/recent";
        var request = {
            // apikey: "XXXXXXXXXXXXXXX--GET-YOUR-OWN-KEY!",
            // text: text,
            // outputMode: 'json',
            // showSourceText: '1',
            // jsonp: "JSON_CALLBACK"
            callback: 'JSON_CALLBACK',
            client_id: 'bdcdb652f29346fab8a242c89c201439'
        };
    
        $http({
            method: 'JSONP',
            url: url,
            params: request
        })
        .success(function(result) {
          console.log(result);
            // $scope.analysis = result;
        })
        .error(function() {
            alert('error');
        })
    };

  }]);
