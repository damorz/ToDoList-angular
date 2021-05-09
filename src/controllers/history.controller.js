(function () {
    "use strict";
  
    angular.module("TaskApp").controller("HistoryController", HistoryController);
  
    HistoryController.$inject = ["TaskService", "$timeout"];
    function HistoryController(TaskService) {
      var historyCtrl = this;
  
     
      historyCtrl.allTask = [];
  
      historyCtrl.hasTask = function() {
        if(historyCtrl.allTask.length !== 0) {
          return true;
        }
        return false;
      }

      historyCtrl.$onInit = function () {
        TaskService.loadAllTask();
        historyCtrl.refreshTask();
      };
  
      historyCtrl.refreshTask = function() {
        historyCtrl.allTask = TaskService.allTask;
      }
  
      historyCtrl.deleteTask = function(id) {
        TaskService.deleteTask(id);
        TaskService.loadAllTask();
        historyCtrl.refreshTask();
      }

      historyCtrl.formatDate = function (date) {
        const rawDate = new Date(date);
        const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(rawDate);
        const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(rawDate);
        const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(rawDate);
        return `${da}-${mo}-${ye}`;
      };
  
    }
  })();
  