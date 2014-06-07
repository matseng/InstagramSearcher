angular.module('InstagramSearcher', ['ngAnimate']);

angular.module('InstagramSearcher')
  .controller('searchController', ['$scope', '$http', function($scope, $http) {
    $scope.submitClicked = function() {
      $scope.searchInProgress = true;
      timer.setStartTime();
      $scope.searchText = $scope.searchText || 'cats';
      console.log($scope.searchText);
      $scope.queryInstagram($scope.searchText)
    };

    var timer = {
      startTime: 0,
      endTime: 0,
      elapsedTime: 0,
      setStartTime: function() {
        startTime = new Date().getTime();
      },
      setEndTime: function() {
        endTime = new Date().getTime();
        elapsedTime = endTime - startTime;
      },
      getElapsedTime: function() {
        return elapsedTime;
      }
    }

    $scope.wordRegEx = /^\s*\w*\s*$/;

    $scope.queryInstagram = function(searchText) {
        var url = "https://api.instagram.com/v1/tags/" + searchText + "/media/recent";
        var request = {
          callback: 'JSON_CALLBACK',
          client_id: 'bdcdb652f29346fab8a242c89c201439'
        };
    
        $http({
            method: 'JSONP',
            url: url,
            params: request
        })
        .success(function(result) {
          $scope.searchInProgress = false;
          $scope.searchCompleted = true;
          timer.setEndTime();
          $scope.elapsedTime = timer.getElapsedTime() / 1000;
          console.log($scope.elapsedTime);
          console.log(result);
          $scope.searchResults = result;
          $scope.numberOfResults = result.data.length;
        })
        .error(function(error) {
            alert("Instagrams's API wasn't happy! Result: " + error);
        })
    };

  }]);
