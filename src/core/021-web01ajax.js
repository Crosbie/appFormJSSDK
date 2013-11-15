
appForm.web.ajax = (function(module) {
    module.get = get;
    var MAXIMUM_WAITING_TIME=30000;
    function get(url, cb) {
        var xhReq = createXMLHttpRequest();
        xhReq.open("GET", url, true);

        //This might be to much?
        var requestTimer = setTimeout(function() {
            xhReq.abort();
        }, MAXIMUM_WAITING_TIME);

        xhReq.onreadystatechange = function() {
            if (xhReq.readyState !== 4) {
                return;
            }
            //Clear the timer. Request was succesful.
            clearTimeout(requestTimer);
            var serverResponse = xhReq.responseText;
            if (xhReq.status !== 200) {
                cb({error: 'Status not 200!', body:serverResponse}, null);
            }
            cb(null, {response: serverResponse});
        };
    }

    return module;
})(appForm.web.ajax || {});