(function () {
  "use strict";

  angular.module("TaskApp").service("TaskService", TaskService);

  TaskService.$inject = ["$q", "$timeout", "$http"];
  function TaskService($q, $timeout, $http) {
    var service = this;

    function sortFunction(a, b) {
      var dateA = new Date(a.dueDate).getTime();
      var dateB = new Date(b.dueDate).getTime();
      return dateA > dateB ? 1 : -1;
    }

    service.taskCount = 0;
    service.allTaskCount = 0;
    service.tasks = [];
    service.allTask = [];
    service.test = [1, 2, 3, 5, 2];
    service.loadTask = function () {
      var i = 0;
      var key;
      service.tasks = [];
      for (; (key = window.localStorage.key(i)); i++) {
        const data = JSON.parse(localStorage.getItem(key));
        if (data.type === 0) {
          var dataDate = new Date(data.dueDate).getTime();
          var today = new Date().getTime();
          if (dataDate < today) {
            if (data.status !== "late") {
              data.status = "late";
              service.addTask(data);
            }
          } else {
            if (data.status !== "unfinish") {
              data.status = "unfinish";
              service.addTask(data);
            }
          }
          service.tasks.push(data);
          service.taskCount += 1;
        }
      }
      service.tasks.sort(sortFunction);
    };

    service.loadAllTask = function () {
      var i = 0;
      var key;
      service.allTask = [];
      for (; (key = window.localStorage.key(i)); i++) {
        const data = JSON.parse(localStorage.getItem(key));
        if (data.type === 1) {
          service.allTask.push(data);
          service.allTaskCount += 1;
        }
      }
      service.allTask.sort(sortFunction);
    };

    service.addTask = async function (data) {
      var stringData = JSON.stringify(data);
      await localStorage.setItem(data.id, stringData);
    };

    service.deleteTask = async function (id) {
      await localStorage.removeItem(id);
    };

    service.finishTask = async function (data) {
      var dataDate = new Date(data.dueDate).getTime();
      var today = new Date().getTime();
      if (dataDate < today) {
        data.status = "late";
      } else {
        data.status = "finish";
      }
      data.type = 1;
      var stringData = JSON.stringify(data);
      await localStorage.setItem(data.id, stringData);
    };
  }
})();
