define(function (require, exports, module) {
    "use strict";    
    var clojureHtml  = require("text!clojure.html");
    var KeyboardPrefs = JSON.parse(require("text!keyboard.json"));
    
    var Commands           = brackets.getModule("command/Commands"),
        CommandManager     = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),        
        Editor             = brackets.getModule("editor/Editor").Editor,
        FileUtils          = brackets.getModule("file/FileUtils"),
        KeyBindingManager  = brackets.getModule("command/KeyBindingManager"),
        Menus              = brackets.getModule("command/Menus"); 
    
    var EVAL_EXPR_NAME = "Evaluate Selected";
    var EVAL_EXPR_ID = "yehohanan7.clj-brackets.eval-expr"
    var EVALUATE_EXPR_CMD_NAME = "eval-clojure-expr";
    
    /** @const {string} Brackets Application Menu Constant */
    var CLOJURE_MENU_ID = "clojure-menu";    
    var CLOJURE_MENU_NAME = "Clojure";
    
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
        
    CommandManager.register(EVAL_EXPR_NAME, EVAL_EXPR_ID, evaluateSelected);
    
    
    var menu = Menus.addMenu(CLOJURE_MENU_NAME, CLOJURE_MENU_ID, Menus.BEFORE, Menus.AppMenuBar.HELP_MENU);        
    menu.addMenuItem(EVAL_EXPR_ID, KeyboardPrefs.evalExpression);
    menu.addMenuDivider();        
})