/**
 * extension of Field class to support latitude longitude field
 */

appForm.models.Field = (function(module) {
    /**
     * Format: [{lat: number, long: number}]
     * @param  {[type]} inputValues [description]
     * @return {[type]}             [description]
     */
    module.prototype.process_locationLatLong = function(inputValue) {
        if (!inputValue["lat"] || !inputValue["long"]) {
            throw ("the input values for latlong field is {lat: number, long: number}");
        }
        var obj = {
            "lat": inputValue.lat,
            "long": inputValue.long
        }

        return obj;
    }
    return module;
})(appForm.models.Field || {});