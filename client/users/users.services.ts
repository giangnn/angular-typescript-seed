/// <reference path="../../typings/tsd.d.ts" />

module app.users {
	'use strict';	
	
	export interface User {
		name: string;
		mobile: string;
	}
	
	export interface IUserService {
		getUsers(): ng.IPromise<Array<User>>;
	}
	
	class UserService implements IUserService {
		static $inject = ['$http', '$q'];
		
		constructor(private $http: ng.IHttpService, private $q: ng.IQService) {}
		
		getUsers() : ng.IPromise<Array<User>> {
			var deferred = this.$q.defer<Array<User>>();
			this.$http.get('api/employees').then((response: any) : void => {
				var users: Array<User> = _.map(response.data, (user: any) : User => <User> {
					name: user.name,
					mobile: user.mobile
				});
				deferred.resolve(users);
			});
			return deferred.promise;
		}
	}
	
	angular.module('app.users').service('UserService', UserService);
}