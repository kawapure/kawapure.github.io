// This script file contains common scripts to each page. It is loaded at the start of each page,
// before the HTML body. Therefore, the script content should be kept short and simple.
var g_kawapure = {};
(function(g){
    
// Event wrappers:
g.addEventListener = function(target, evt, cb)
{
    // General:
    if (target.addEventListener)
    {
        target.addEventListener(evt, cb);
    }
    // Internet Explorer:
    else if (target.attachEvent)
    {
        target.attachEvent("on" + evt, cb);
    }
};

g.removeEventListener = function(target, evt, cb)
{
    // General:
    if (target.removeEventListener)
    {
        target.removeEventListener(evt, cb);
    }
    // Internet Explorer:
    else if (target.detachEvent)
    {
        target.detachEvent("on" + evt, cb);
    }
};

g.addClass = function(target, cls)
{
    if (target.classList)
        target.classList.add(cls);
    else if (target.className.indexOf(cls) >= 0)
        return;
    else if (target.className == "")
        target.className = cls;
    else
        target.className += " " + cls;
};

g.removeClass = function(target, cls)
{
    if (target.classList)
        target.classList.remove(cls);
    else if (target.className.indexOf(cls) < 0)
        return;
    else if (target.className == cls)
        target.className = "";
    else
        target.className = target.className.replace(" " + cls, "").replace(cls + " ", "");
};

g.hasClass = function(target, cls)
{
    if ("" == cls) return;
    
    if (target.classList)
    {
        return target.classList.contains(cls);
    }
    else
    {
        return target.getAttribute("class").indexOf(cls) > -1;
    }
};

})(window.g_kawapure);