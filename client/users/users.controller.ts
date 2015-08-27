/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="users.services.ts" />

module app.users {
	'use strict';
	
	interface IUserScope extends ng.IScope {
		vm: UserController;
		users: Array<User>;
		reload(): void;		
	}
	
	class UserController {
		static $inject = ['$scope', 'UserService'];
		
		vm: IUserScope;
		users: Array<User>;
		
		constructor(private $scope : IUserScope, private UserService: IUserService) {
			$scope.vm = this;
			this.reload();			
		}
		
		reload(): void {
			 this.UserService.getUsers().then((users : Array<User>) : void => {
				this.users = users; 
			 });
		}
	}
	
	angular.module('app.users').controller('UserController', UserController);
}