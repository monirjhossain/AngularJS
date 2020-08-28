<!doctype html>
<html>
    <head>
        <title>Add and remove record from MySQL Database with AngularJS</title>
        <script src="angular.min.js"></script>
        
    </head>
    <body >

        <div ng-app='myapp' ng-controller="userCtrl">
            <table>
                <tr>
                    <td>First Name</td>
                    <td><input type='text' id='txt_fname' ng-model='fname'></td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td><input type='text' id='txt_lname' ng-model='lname'></td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td><input type='text' id='txt_uname' ng-model='uname'></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td><input type='button' id='but_save' value='Save' ng-click="add()" ></td>
                </tr>
            </table>
            <table border="1">
                
                <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Username</th>
                    <th colspan="2">Action</th>
                </tr>
                
                <tr ng-repeat="user in users">
                <td>{{user.id}}</td>    
                <td>{{user.fname}}</td>
                <td>{{user.lname}}</td>
                <td>{{user.username}}</td>
                <td><input type='button' ng-click='remove($index,user.id);' value='Delete'></td>
                <td><input type='button' ng-click='update($index,user.id);' value='Update'></td>
                </tr>
                
            </table>
        </div>
        
        <!-- Script -->
        <script>
        var fetch = angular.module('myapp', []);

        fetch.controller('userCtrl', ['$scope', '$http', function ($scope, $http) {

            // Get all records
            $http({
                method: 'post',
                url: 'addremove.php',
                data: {request_type:1},

            }).then(function successCallback(response) {
                $scope.users = response.data;
            });

            // Add new record
            $scope.add = function(){

                var len = $scope.users.length;
                $http({
                method: 'post',
                url: 'addremove.php',
                data: {fname:$scope.fname,lname:$scope.lname,uname:$scope.uname,request_type:2,len:len},
                }).then(function successCallback(response) {
                    $scope.users.push(response.data[0]);
                });
            }

            // Delete record
            $scope.remove = function(index,userid){
               
                $http({
                method: 'post',
                url: 'addremove.php',
                data: {userid:userid,request_type:3},
                }).then(function successCallback(response) {
                    $scope.users.splice(index, 1);
                }); 
            }
            
        }]);

        </script>
    </body>

</html>
