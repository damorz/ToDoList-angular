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
    taskCtrl.fillDataStatus = "Add";
    taskCtrl.waitForEditData = [];

    taskCtrl.$onInit = function () {
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
      TaskService.loadTask();
      taskCtrl.tasks = TaskService.tasks;
    };

    taskCtrl.deleteTask = function (id) {
      TaskService.deleteTask(id);
      taskCtrl.refreshTask();
    };

    taskCtrl.finishTask = function (data) {
      TaskService.finishTask(data);
      taskCtrl.refreshTask();
    };

    taskCtrl.confirmTask = function () {
      if(taskCtrl.fillDataStatus === "Add") {
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
      } else if(taskCtrl.fillDataStatus === "Edit") {
        var WFEdit = taskCtrl.waitForEditData;
        var data = {
          id: WFEdit.id,
          title: taskCtrl.addTaskTitle,
          subject: taskCtrl.addSubject,
          description: taskCtrl.addDescription,
          dueDate: taskCtrl.addDueDate,
          status: WFEdit.status,
          type: WFEdit.type,
        };
      }
      
      TaskService.addTask(data);
      taskCtrl.addSuccessEvent = true;
      taskCtrl.addTaskTitle = "";
      taskCtrl.addSubject = "";
      taskCtrl.addDescription = "";
      taskCtrl.addDueDate = "";
      taskCtrl.refreshTask();
      $timeout(function () {
        taskCtrl.addSuccessEvent = false;
      }, 1000);
    };

    taskCtrl.preLoadToAdd = function() {
      taskCtrl.fillDataStatus = "Add";
    }

    taskCtrl.preLoadToEdit = function(data) {
      taskCtrl.fillDataStatus = "Edit";
      taskCtrl.addTaskTitle = data.title;
      taskCtrl.addSubject = data.subject;
      taskCtrl.addDescription = data.description;
      taskCtrl.addDueDate = new Date(data.dueDate);
      taskCtrl.waitForEditData = data;
    }
  }
})();
