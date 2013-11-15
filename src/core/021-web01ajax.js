
appForm.web.ajax = (function(module) {
    module.get = get;
    var MAXIMUM_WAITING_TIME=30000;

    function createXMLHttpRequest() {
         try { return new XMLHttpRequest(); } catch(e) {}
         try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
         return null;
     }

    function get(url, cb) {
        var xhReq = createXMLHttpRequest();
        if(!xhReq){
            cb({error: 'XMLHttpRequest is not supported'}, null);
        }

        xhReq.open("get", url, true);
        xhReq.send(null);

        // //This might be to much?
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
                return cb({error: 'Status not 200!', body:serverResponse}, null);
            }
            return cb(null, {response: serverResponse});
        };
    }

    return module;
})(appForm.web.ajax || {});