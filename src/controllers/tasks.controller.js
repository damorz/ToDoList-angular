(function () {
  "use strict";

  angular.module("TaskApp").controller("TaskController", TaskController);

  TaskController.$inject = ["TaskService", "$timeout"];
  function TaskController(TaskService, $timeout) {
    var taskCtrl = this;

    taskCtrl.addTaskTitle = "";
    taskCtrl.addSubject = "";
    taskCtrl.addDescription = "";
    taskCtrl.addDueDate = "";
    taskCtrl.addSuccessEvent = false;
    taskCtrl.tasks = [];

    taskCtrl.$onInit = function () {
      TaskService.loadTask();
      taskCtrl.refreshTask();
    };

    taskCtrl.formatDate = function (date) {
      const rawDate = new Date(date);
      const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(rawDate);
      const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(rawDate);
      const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(rawDate);
      return `${da}-${mo}-${ye}`;
    };

    taskCtrl.hasTask = function () {
      if (taskCtrl.tasks.length !== 0) {
        return true;
      }
      return false;
    };

    taskCtrl.refreshTask = function () {
      taskCtrl.tasks = TaskService.tasks;
    };

    taskCtrl.deleteTask = function (id) {
      TaskService.deleteTask(id);
      TaskService.loadTask();
      taskCtrl.refreshTask();
    };

    taskCtrl.finishTask = function (data) {
      TaskService.finishTask(data);
      TaskService.loadTask();
      taskCtrl.refreshTask();
    };

    taskCtrl.addTask = function () {
      var uniqueID = function () {
        return "_" + Math.random().toString(36).substr(2, 9);
      };
      var data = {
        id: uniqueID(),
        title: taskCtrl.addTaskTitle,
        subject: taskCtrl.addSubject,
        description: taskCtrl.addDescription,
        dueDate: taskCtrl.addDueDate,
        status: "unfinish",
        type: 0,
      };
      TaskService.addTask(data);
      TaskService.loadTask();
      taskCtrl.refreshTask();
      taskCtrl.addSuccessEvent = true;
      $timeout(function () {
        taskCtrl.addSuccessEvent = false;
      }, 1000);
    };
  }
})();
