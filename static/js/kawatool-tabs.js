window.g_kawapure = window.g_kawapure || {};
window.g_kawapure.kawatool = window.g_kawapure.kawatool || {};
window.g_kawapure.kawatool.tabs = {};
(function(g){

g.BASE_CLASS = "kawatool-tabs";
g.SWITCHER_CLASS = g.BASE_CLASS + "-switcher";
g.TAB_CLASS = g.BASE_CLASS + "-tab";
g.ACTIVE_CLASS = g.BASE_CLASS + "-active";
g.CONTAINER_CLASS = g.BASE_CLASS + "-container";
g.TAB_CONTENT_CLASS = g.BASE_CLASS + "-tab-content";

g.switchTab = function(targetEl, evt)
{
    var tabsContainer = g_kawapure.kawatool.findParentOfClass(targetEl, g.BASE_CLASS);
    
    // We didn't hit a tab container, so give up now.
    if (!tabsContainer)
    {
        return;
    }
    
    // Find the current tab:
    var currentTab = tabsContainer.querySelector("." + g.SWITCHER_CLASS + " ." + g.ACTIVE_CLASS);
    
    // Find the requested tab:
    var requestedTab = g_kawapure.kawatool.findParentOfClass(targetEl, g.TAB_CLASS);
    
    // Invalid request.
    if (!requestedTab)
    {
        return;
    }
    
    // Find the current content displayed:
    var currentContent = tabsContainer.querySelector("." + g.CONTAINER_CLASS + " ." + g.ACTIVE_CLASS);
    
    // Find the requested content to be displayed:
    var targetTabId = requestedTab.getAttribute("data-tab-target-id") || "";
    var requestedContent = tabsContainer.querySelector("." + g.CONTAINER_CLASS + " #" + targetTabId);
    
    // Invalid request.
    if (!requestedContent)
    {
        return;
    }
    
    if (currentTab)
        g_kawapure.removeClass(currentTab, g.ACTIVE_CLASS);
    
    if (currentContent)
        g_kawapure.removeClass(currentContent, g.ACTIVE_CLASS);
    
    g_kawapure.addClass(requestedTab, g.ACTIVE_CLASS);
    g_kawapure.addClass(requestedContent, g.ACTIVE_CLASS);
};

g_kawapure.kawatool.addDelegatedEvent("click", g.TAB_CLASS, g.switchTab);

})(window.g_kawapure.kawatool.tabs);