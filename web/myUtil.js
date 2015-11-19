myUtil = {
    // url = http://127.0.0.1:8080/JnPlant/scene?scene_id=1&user_id=2
    // return Object {scene_id: "1", user_id: "2"}
    getQureyParams: function (url) {
        var searchParams = {};

        var qurey = url.split('?');
        // scene_id=1&user_id=2
        qurey = qurey[qurey.length -1];

        var params = qurey.split('&');
        for (var i = 0; i < params.length; i++) {
            // scene_id=1
            var keyValue = params[i].split('=');
            searchParams[keyValue[0]] = keyValue[1];
        }

        return searchParams;
    }
    
};
