define(function (require, exports, module) {
    "use strict";    
    var clojureHtml  = require("text!clojure.html");
    
    var Commands           = brackets.getModule("command/Commands"),
        CommandManager     = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),        
        Editor             = brackets.getModule("editor/Editor").Editor,
        FileUtils          = brackets.getModule("file/FileUtils"),
        KeyBindingManager  = brackets.getModule("command/KeyBindingManager"),
        Menus              = brackets.getModule("command/Menus"); 
    
    var LAUNCH_REPL_NAME = "Launch Clojure REPL";
    var LAUNCH_REPL_ID = "yehohanan7.brackets-clj.launch-repl"
    
    /** @const {string} Brackets Application Menu Constant */
    var CLOJURE_MENU_ID = "clojure-menu";    
    var CLOJURE_MENU_NAME = "Clojure";
    
    /** Command names */
    var EVALUATE_EXPR_CMD_NAME = "eval-clojure-expr";
    
    /** View Ids */
    var RESPONSE_VIEW_ID = 'clojure-response';
    

    (function init() {
        $(clojureHtml).insertAfter('#editor-holder');    
    })();
    
    function lanunchClojureRepl() {
   
    }
    
    function getSelectedExpression() {
        return EditorManager.getFocusedEditor().getSelectedText();        
    }
    
    function evaluateSelected() {
        var expr = getSelectedExpression();
        var responseId = '#' + RESPONSE_VIEW_ID;
        $(responseId).html('evaluating expression: ' + expr);
        $.ajax({
        type: "POST",
        url: "http://localhost:7777/wrepl/eval",
        processData: false,
        data: expr,
        success: function (response) {
            $(responseId).html(response);
        }});     
    }
        
    CommandManager.register(LAUNCH_REPL_NAME, LAUNCH_REPL_ID, evaluateSelected);
    
    
    var menu = Menus.addMenu(CLOJURE_MENU_NAME, CLOJURE_MENU_ID, Menus.BEFORE, Menus.AppMenuBar.HELP_MENU);        
    menu.addMenuItem(LAUNCH_REPL_ID);
    menu.addMenuDivider();        
})