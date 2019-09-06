angular.module('todoController', [])

.controller('mainController', ['$scope', '$http', 'Todos', 'socket', function($scope, $http, Todos, socket) {
    $scope.formData = {};
    $scope.loading = true;

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Todos.get().success(function(data) {
        $scope.todos = data;
        $scope.loading = false;
    });

    socket.on('update', function(data) {
            $scope.todos = data;
        })
        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.text != undefined) {
            $scope.loading = true;

            // call the create function from our service (returns a promise object)
            Todos.create($scope.formData).success(function(data) {
                $scope.loading = false;
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data; // assign our new list of todos
            });
        }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $scope.loading = true;

        Todos.delete(id).success(function(data) {
            $scope.loading = false;
            $scope.todos = data; // assign our new list of todos
        });
    };
}]);

