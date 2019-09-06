angular.module('todoService', [])

// super simple service
// each function returns a promise object 
.factory('Todos', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/todos');
            },
            create: function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            delete: function(id) {
                return $http.delete('/api/todos/' + id);
            }
        }
    }])
.factory('socket', function($rootScope) {
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

