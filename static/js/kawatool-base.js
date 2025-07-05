// I took most of this from rehike-core JS toolkit.

window.g_kawapure = window.g_kawapure || {};
window.g_kawapure.kawatool = window.g_kawapure.kawatool || {};
(function(g){
    
g.findParentOfClass = function(elm, className)
{
    var parent = elm;
    do
    {
        if (parent != null && g_kawapure.hasClass(parent, className))
        {
            return parent;
        }
    }
    while (parent = parent.parentElement);
    
    return null;
};

/**
 * Stores a map of event handlers.
 * 
 * @type {Object[]}
 * @private
 */
g._handlers = [];

/**
 * Stores the names of all active events.
 * 
 * @type {string[]}
 * @private
 */
g._activeEvents = [];

/**
 * Add a delegated event handler.
 * 
 * @param {string} eventName 
 * @param {string} className 
 * @param {function(Event)} cb 
 * 
 * @return {number}
 */
g.addDelegatedEvent = function(eventName, className, cb)
{
    if (!g._isActiveEventName(eventName))
    {
        g_kawapure.addEventListener(
            document, 
            eventName, 
            g._getDelegateHandler(eventName)
        );

        g._activeEvents.push(eventName);
    }

    return g._addHandler(eventName, className, cb);
};

g.removeDelegatedEvent = function(eventName, className, handle)
{
    if (!g._handlers[eventName])
        return;
    if (!g._handlers[eventName][className])
        return;

    g._handlers[eventName][className].splice(handle, 1);
};

/**
 * Determine if an event already has an active handler by
 * its name.
 * 
 * @param {string} name 
 * @return {boolean}
 * 
 * @private
 */
g._isActiveEventName = function(name)
{
    return g._activeEvents.includes(name);
};

/**
 * Generate a new event handler function.
 * 
 * @param {string} eventName 
 * @return {function(Event)}
 * 
 * @private
 */
g._getDelegateHandler = function(eventName)
{
    return function(e) {
        var activeElement = e.target;
        var handlerClassNameList = g._handlers[eventName];
        
        while (null != activeElement)
        {
            if (activeElement.className)
            {
                var classes;
                if (activeElement.classList)
                {
                    classes = activeElement.classList;
                }
                else
                {
                    classes = activeElement.className.split(" ");
                }

                for (var i = 0, j = classes.length; i < j; i++)
                {
                    if (classes[i] in handlerClassNameList)
                    {
                        for (var k = 0, l = handlerClassNameList[classes[i]].length; k < l; k++)
                        {
                            if (typeof handlerClassNameList[classes[i]][k] == "function")
                            {
                                handlerClassNameList[classes[i]][k](activeElement, e);
                            }
                        }
                    }
                    else if ("kawatool-no-propagate" == classes[i])
                    {
                        return;
                    }
                }
            }

            activeElement = activeElement.parentElement;
        }
    };
};

/**
 * Add a handler to the internal array.
 * 
 * @param {string} eventName 
 * @param {string} className 
 * @param {function(Event)} cb 
 * 
 * @return {number}
 * 
 * @private
 */
g._addHandler = function(eventName, className, cb)
{
    if (!(eventName in g._handlers))
    {
        g._handlers[eventName] = {};
    }

    if (!(className in g._handlers[eventName]))
    {
        g._handlers[eventName][className] = [];
    }

    g._handlers[eventName][className].push(cb);

    return g._handlers[eventName][className].length - 1;
};

})(g_kawapure.kawatool);